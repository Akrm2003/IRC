#include "includes/Server.hpp"
#include "includes/Client.hpp"
#include <stdexcept>
#include <cstring>
#include <cerrno>

Server::Server(const char* port, const char* password) : _running(false) {
    _port = std::atoi(port);
    if (_port <= 0 || _port > 65535) 
    {
        throw std::runtime_error("Invalid port number");
    }
    _password = password;
    _serverSocket = -1;
}

Server::~Server() {
    // Close server socket if open
    if (_serverSocket != -1) {
        close(_serverSocket);
    }

    // Close all client connections
    for (std::vector<pollfd>::iterator it = _pollfds.begin(); it != _pollfds.end(); ++it) {
        if (it->fd >= 0 && it->fd != _serverSocket) {
            close(it->fd);
        }
    }
}

void Server::start() {
    setupSocket();
    bindSocket();
    listenSocket();

    // Add the server socket to _pollfds so poll() can monitor it
    pollfd serverPollfd;
    serverPollfd.fd = _serverSocket;
    serverPollfd.events = POLLIN; // We want to know when someone tries to connect
    _pollfds.push_back(serverPollfd);

    _running = true;
    
    // Display a nice ASCII art banner
    std::cout << BOLD << CYAN << "\n";
    std::cout << "  ╔══════════════════════════════════════════╗\n";
    std::cout << "  ║         " << MAGENTA << "IRC SERVER v1.0" << CYAN << "                ║\n";
    std::cout << "  ╠══════════════════════════════════════════╣\n";
    std::cout << "  ║  " << GREEN << "Port:" << RESET << "        " << YELLOW << _port << CYAN << "                      ║\n";
    std::cout << "  ║  " << GREEN << "Status:" << RESET << "      " << YELLOW << "Running" << CYAN << "                   ║\n";
    std::cout << "  ╚══════════════════════════════════════════╝\n\n";
    std::cout << RESET;

    // Infinite loop that checks for events on sockets
    while (_running) {
        handleEvents(); // Use poll to monitor all fds (server + clients)
    }
}

void Server::setupSocket() {
    _serverSocket = socket(AF_INET, SOCK_STREAM, 0);
    if (_serverSocket == -1) {
        throw std::runtime_error("Failed to create socket: " + std::string(strerror(errno)));
    }

    // Allow address reuse to avoid "address already in use" error on restart
    int opt = 1;
    if (setsockopt(_serverSocket, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt)) == -1) {
        close(_serverSocket);
        throw std::runtime_error("Failed to set socket options: " + std::string(strerror(errno)));
    }

    setNonBlocking(_serverSocket); // Server socket must be non-blocking to avoid getting stuck
}

void Server::bindSocket() {
    struct sockaddr_in serverAddr;
    std::memset(&serverAddr, 0, sizeof(serverAddr));

    serverAddr.sin_family = AF_INET;
    serverAddr.sin_addr.s_addr = INADDR_ANY;      // Listen on all interfaces
    serverAddr.sin_port = htons(_port);           // Set port

    if (bind(_serverSocket, (struct sockaddr*)&serverAddr, sizeof(serverAddr)) == -1) {
        close(_serverSocket);
        throw std::runtime_error("Failed to bind socket: " + std::string(strerror(errno)));
    }
}

void Server::listenSocket() {
    if (listen(_serverSocket, 5) == -1) {
        close(_serverSocket);
        throw std::runtime_error("Failed to listen on socket: " + std::string(strerror(errno)));
    }
}

// 🔁 This is the heart of the event loop
void Server::handleEvents() {
    // poll blocks until there's activity on any fd in _pollfds
    int activity = poll(&_pollfds[0], _pollfds.size(), -1); // -1 = wait forever

    if (activity < 0) {
        if (errno == EINTR)
            return; // poll was interrupted by signal, just try again
        throw std::runtime_error("Poll failed: " + std::string(strerror(errno)));
    }

    // Check if the server socket has an event (i.e., new incoming connection)
    if (_pollfds[0].revents & POLLIN) 
    {
        acceptClient(); // Accept the new client connection
    }

    // Check all other file descriptors (clients)
    for (size_t i = 1; i < _pollfds.size(); i++) {
    if (_pollfds[i].revents & POLLIN) {
        // Client sent data to us
        handleClientMessage(_pollfds[i].fd);
    }
    if (_pollfds[i].revents & POLLOUT) {  // Changed from 'else if' to 'if'
        handleClientOutput(_pollfds[i].fd);
    }
    if (_pollfds[i].revents & (POLLHUP | POLLERR | POLLNVAL)) {
        // Client disconnected or error occurred
        handleClientDisconnect(_pollfds[i].fd);
    }
}
}

void Server::acceptClient() {
    struct sockaddr_in clientAddr;
    socklen_t clientAddrLen = sizeof(clientAddr);

    int clientFd = accept(_serverSocket, (struct sockaddr*)&clientAddr, &clientAddrLen);
    if (clientFd == -1) {
        if (errno != EWOULDBLOCK && errno != EAGAIN) {
            std::cerr << "Failed to accept connection: " << strerror(errno) << std::endl;
        }
        return;
    }

    // Set the client socket to non-blocking
    setNonBlocking(clientFd);

    // Add new client to poll list
    pollfd clientPollfd;
    clientPollfd.fd = clientFd;
    clientPollfd.events = POLLIN; // Monitor for readable data from this client
    _pollfds.push_back(clientPollfd);

    // Create and store a Client object
    char clientIP[INET_ADDRSTRLEN]; // is the e maximum size required to store an IPv4 address in the standard "dotted-decimal" notation (like "192.168.0.1")
    inet_ntop(AF_INET, &(clientAddr.sin_addr), clientIP, INET_ADDRSTRLEN);
    Client newClient(clientFd, clientIP);
    _clients.push_back(newClient);

    std::cout << BOLD << GREEN << "✓ New client connected from " << clientIP << " [fd: " << clientFd << "]" << RESET << std::endl;

    // Send welcome message
    std::string welcomeMsg = "Welcome to the IRC server! Please authenticate with PASS, NICK, and USER commands.\r\n";
    sendToClient(clientFd, welcomeMsg);
}

void Server::handleClientMessage(int fd) {
    char buffer[1024];
    int bytesRead = recv(fd, buffer, sizeof(buffer) - 1, 0);
    
    if (bytesRead <= 0) {
        if (bytesRead == 0 || (errno != EWOULDBLOCK && errno != EAGAIN)) {
            // Connection closed or error
            handleClientDisconnect(fd);
        }
        return;
    }
    
    buffer[bytesRead] = '\0';  // Null terminate the buffer
    
    // Find the client
    Client* client = getClientByFd(fd);
    if (!client) {
        std::cerr << BG_RED << WHITE << " ERROR " << RESET << " " << RED << "Client not found for fd " << fd << RESET << std::endl;
        return;
    }
    
    // Add the received data to the client's input buffer
    client->appendToInputBuffer(buffer);
    
    // Process any complete messages in the buffer
    while (client->hasCompleteMessage()) { // NICK user1\r\nUSER user1 0 * :Real Name\r\n it will always continue until no cammand remain 
        std::string message = client->getNextMessage();
        std::cout << CYAN << "← Received from client " << fd << ": " << RESET << message << std::endl;
        
         // Process command instead of just echoing back
        processCommand(client, message);
    }
}

void Server::handleClientDisconnect(int fd) {
    std::cout << BOLD << RED << "✗ Client " << fd << " disconnected" << RESET << std::endl;

    // Remove from pollfds vector
    for (std::vector<pollfd>::iterator it = _pollfds.begin(); it != _pollfds.end(); ++it) {
        if (it->fd == fd) {
            _pollfds.erase(it);
            break;
        }
    }

    // Remove from clients vector
    for (std::vector<Client>::iterator it = _clients.begin(); it != _clients.end(); ++it) {
        if (it->getFd() == fd) {
            _clients.erase(it);
            break;
        }
    }

    // Close the socket
    close(fd);
}

void Server::setNonBlocking(int fd) {
    int flags = fcntl(fd, F_GETFL, 0);
    if (flags == -1) {
        throw std::runtime_error("Failed to get socket flags: " + std::string(strerror(errno)));
    }

    if (fcntl(fd, F_SETFL, flags | O_NONBLOCK) == -1) {
        throw std::runtime_error("Failed to set socket non-blocking: " + std::string(strerror(errno)));
    }
}

void Server::sendToClient(int fd, const std::string& message) {
    Client* client = getClientByFd(fd);
    if (!client) {
        std::cerr << BG_RED << WHITE << " ERROR " << RESET << " " << RED << "Client not found for fd " << fd << RESET << std::endl;
        return;
    }
    
    // Add the message to the client's output buffer
    client->addToOutputBuffer(message);
    
    // Enable write events for this client
    enableWriteEvent(fd);
}

 void Server::enableWriteEvent(int fd) {
    for (std::vector<pollfd>::iterator it = _pollfds.begin(); it != _pollfds.end(); ++it) {
        if (it->fd == fd) {
            it->events |= POLLOUT;  // maeen just read it and shut up , i know u will ask what is this weird syntax 
            break;
        }
    }
}

void Server::disableWriteEvent(int fd) {
    for (std::vector<pollfd>::iterator it = _pollfds.begin(); it != _pollfds.end(); ++it) {
        if (it->fd == fd) {
            it->events &= ~POLLOUT;  // Maeen shut up again and dont ask about the ~ its just mean
            break;
        }
    }
}

//

void Server::handleClientOutput(int fd) {
    Client* client = getClientByFd(fd); //  // Find a client by their file descriptor
    
    if (!client || !client->hasDataToSend()) {
        // No client found or no data to send, disable write events
        disableWriteEvent(fd);
        return;
    }
    
    // Get the data from the client's output buffer
    std::string dataToSend = client->getOutputBuffer();
    
    // Try to send it
    int bytesSent = send(fd, dataToSend.c_str(), dataToSend.size(), 0);
    
    if (bytesSent > 0) {
        std::cout << CYAN << "→ Sent " << bytesSent << " bytes to client " << fd << RESET << std::endl;
        // Successfully sent some data
        client->clearOutputBuffer();
        
        // If we didn't send everything, put the remainder back in the buffer
        if (bytesSent < (int)dataToSend.size()) {
            client->addToOutputBuffer(dataToSend.substr(bytesSent));
        } else {
            // All data sent, disable write events
            disableWriteEvent(fd);
        }
    } else if (bytesSent < 0) {
        // Error occurred
        if (errno != EWOULDBLOCK && errno != EAGAIN) {
            // A real error, not just "would block"
            std::cerr << BG_RED << WHITE << " ERROR " << RESET << " " << RED << "Error sending data: " << strerror(errno) << RESET << std::endl;
            handleClientDisconnect(fd);
        }
        // If it would block, we'll try again later when poll says it's writable
    }
}

Client* Server::getClientByFd(int fd) {
    for (std::vector<Client>::iterator it = _clients.begin(); it != _clients.end(); ++it) {
        if (it->getFd() == fd) {
            return &(*it);
        }
    }
    return NULL;  // Client not found
}


void Server::processCommand(Client* client , const std::string& message)
{
    std::string command;
    std::string params;

    size_t pos = message.find(' ');
    if(pos != std::string::npos)
    {
        command = message.substr(0 , pos);
        params = message.substr(pos + 1);
    }else{
        command = message;
        params = "";
    }

    for(size_t i = 0; i < command.size(); i++)
    {
        command[i] = toupper(command[i]);
    }

    std::cout << YELLOW << "⮞ " << (client->getNickname().empty() ? "Anonymous" : client->getNickname()) 
              << " [" << client->getFd() << "]" << RESET << ": " 
              << BOLD << command << RESET << " " << params << std::endl;

    if(command == "PASS")
        handlePass(client , params);
    else if(command == "NICK")
        handleNick(client , params);
    else if(command == "USER"){
        handleUser(client , params);
    } else {
        std::string response = " :server 421 " + (client->getNickname().empty() ? "*" : client->getNickname());
        response += " " + command + " : Unknown command \r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
    }

}

void Server::handlePass(Client* client , const std::string& params)
{
    if(client->isAuthenticated())
    {
        std::string response = " :server 462 " + (client->getNickname().empty() ? "*" : client->getNickname());
        response += " : You may not register \n\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    if (params.empty()) {
        std::string response = ":server 461 " + (client->getNickname().empty() ? "*" : client->getNickname());
        response += " PASS :Not enough parameters\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }
    if(params == _password)
    {
        client->setAuthenticated(true);
        std::cout << BLUE << "✓ Client " << client->getFd() << " authenticated with password" << RESET << std::endl;
        isClientRegistered(client);
    }else {
        std::cout << RED << "✗ Client " << client->getFd() << " failed password authentication" << RESET << std::endl;
        std::string response = ":server 464 " + (client->getNickname().empty() ? "*" : client->getNickname());
        response += " :Password incorrect\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());

    }
    
}

void Server::handleNick(Client* client, const std::string& params) 
{
     if (params.empty()) {
        std::string response = ":server 431 " + (client->getNickname().empty() ? "*" : client->getNickname());
        response += " :No nickname given\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }
    //extract the name before the space and after the cmmand like "NICK AKRAM HELLO" We will take just akram bcz we found a space
    std::string nickname = params;
    size_t spacePos = nickname.find(' ');
    if (spacePos != std::string::npos) {
        nickname = nickname.substr(0, spacePos);
    }
      // Check if nickname is already in use
    for (std::vector<Client>::iterator it = _clients.begin(); it != _clients.end(); ++it) {
        if (it->getNickname() == nickname && &(*it) != client) {
            std::string response = ":server 433 " + (client->getNickname().empty() ? "*" : client->getNickname());
            response += " " + nickname + " :Nickname is already in use\r\n";
            client->addToOutputBuffer(response);
            enableWriteEvent(client->getFd());
            return;
        }
    }
    //setting the nickname

    std::string oldNick = client->getNickname();
    client->setNickname(nickname);
    std::cout << BLUE << "✓ Client " << client->getFd() << " set nickname: " 
              << (oldNick.empty() ? "None" : oldNick) << " → " << nickname << RESET << std::endl;

    //inform the client
    std::string response;
    if (oldNick.empty()) {
        response = ":server 001 " + nickname + " :Welcome to the IRC server, " + nickname + "!\r\n";
    } else {
        response = ":" + oldNick + " NICK " + nickname + "\r\n";
    }
    client->addToOutputBuffer(response);
    enableWriteEvent(client->getFd());
    
    // Check if client is now fully registered
    isClientRegistered(client);

}

void Server::handleUser(Client* client, const std::string& params) {
    if (params.empty()) {
        std::string response = ":server 461 " + (client->getNickname().empty() ? "*" : client->getNickname());
        response += " USER :Not enough parameters\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }
    std::string username;
    std::string realname;

    size_t firstSpace = params.find(' ');
    if (firstSpace != std::string::npos) {
        username = params.substr(0, firstSpace);

        size_t colonPos = params.find(':', firstSpace);
        if (colonPos != std::string::npos) {
            realname = params.substr(colonPos + 1);
        }
    } else {
        username = params;
    }

    client->setUsername(username);
    if (!realname.empty()) {
        client->setRealname(realname);  // Now using the setter
    }
    
    std::cout << BLUE << "✓ Client " << client->getFd() << " set username: " << username << RESET << std::endl;
    if (!realname.empty()) {
        std::cout << BLUE << "✓ Client " << client->getFd() << " set realname: " << realname << RESET << std::endl;
    }
    
    // Check if client is now fully registered
    isClientRegistered(client);

}

bool Server::isClientRegistered(Client* client) {
    // Debug output with color
    std::cout << MAGENTA << "ℹ Registration status [fd: " << client->getFd() << "]" << RESET << ": "
              << "Auth=" << (client->isAuthenticated() ? GREEN "yes" : RED "no") << RESET
              << ", Nick=" << (client->getNickname().empty() ? RED "empty" : GREEN + client->getNickname()) << RESET
              << ", User=" << (client->getUsername().empty() ? RED "empty" : GREEN + client->getUsername()) << RESET
              << ", Registered=" << (client->isRegistered() ? GREEN "yes" : RED "no") << RESET
              << std::endl;
    
    // A client is registered when they have:
    // 1. Authenticated with PASS
    // 2. Set a nickname with NICK
    // 3. Set a username with USER
    
    if (client->isAuthenticated() && !client->getNickname().empty() && !client->getUsername().empty()) {
        // Check if this is the first time they're being registered
        if (!client->isRegistered()) {
            client->setRegistered(true);
            
            std::cout << BOLD << GREEN << "★ Client " << client->getFd() 
                      << " (" << client->getNickname() << ") is now fully registered! ★" << RESET << std::endl;
            
            // Send welcome messages (IRC numeric replies 001-004)
            std::string nick = client->getNickname();
            std::string welcomeMsg = ":server 001 " + nick + " :Welcome to the IRC server " + nick + "!\r\n";
            welcomeMsg += ":server 002 " + nick + " :Your host is server, running version 1.0\r\n";
            welcomeMsg += ":server 003 " + nick + " :This server was created today\r\n";
            welcomeMsg += ":server 004 " + nick + " :server 1.0 o mtikl\r\n";
            
            client->addToOutputBuffer(welcomeMsg);
            enableWriteEvent(client->getFd());
            
            std::cout << "Client " << client->getFd() << " is now fully registered" << std::endl;
        }
        return true;
    }
    return false;
}