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
    std::cout << "IRC server started on port " << _port << std::endl;

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
        if(_pollfds[i].revents & POLLOUT)
        {
            handleClientOutput(pollfd[i].fd);
        }
        else if (_pollfds[i].revents & (POLLHUP | POLLERR | POLLNVAL)) {
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

    std::cout << "New client connected from " << clientIP << std::endl;

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
        std::cerr << "Error: Client not found for fd " << fd << std::endl;
        return;
    }
    
    // Add the received data to the client's input buffer
    client->appendToInputBuffer(buffer);
    
    // Process any complete messages in the buffer
    while (client->hasCompleteMessage()) {
        std::string message = client->getNextMessage();
        std::cout << "Received from client " << fd << ": " << message << std::endl;
        
        // For now, just echo back the message with a prefix
        std::string response = "Received: " + message + "\n";
        client->addToOutputBuffer(response);
        
        // Enable write events to send the response
        enableWriteEvent(fd);
    }
}

void Server::handleClientDisconnect(int fd) {
    std::cout << "Client " << fd << " disconnected" << std::endl;

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
        std::cerr << "Error: Client not found for fd " << fd << std::endl;
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
            std::cerr << "Error sending data: " << strerror(errno) << std::endl;
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