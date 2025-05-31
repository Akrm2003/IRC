#ifndef SERVER_HPP
#define SERVER_HPP

#include <string>
#include <vector>
#include <iostream>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <fcntl.h>
#include <unistd.h>
#include <poll.h>
#include "Client.hpp"
#include "Channel.hpp"
#include <stdexcept>
#include <cstring>
#include <cerrno>
#include <sstream>

#define RESET "\033[0m"
#define BOLD "\033[1m"
#define BLACK "\033[30m"
#define RED "\033[31m"
#define GREEN "\033[32m"
#define YELLOW "\033[33m"
#define BLUE "\033[34m"
#define MAGENTA "\033[35m"
#define CYAN "\033[36m"
#define WHITE "\033[37m"
#define BG_BLACK "\033[40m"
#define BG_RED "\033[41m"
#define BG_GREEN "\033[42m"
#define BG_YELLOW "\033[43m"
#define BG_BLUE "\033[44m"
#define BG_MAGENTA "\033[45m"
#define BG_CYAN "\033[46m"

// Forward declarations


class Server
{
private:
    int _port;             // Port to listen on
    std::string _password; // Password for clients to connect (authentication)
    int _serverSocket;     // Main server socket file descriptor

    std::vector<Client *> _clients; // List of all connected clients
    std::vector<pollfd> _pollfds;   // List of pollfd structs used to monitor file descriptors (server + clients)
    std::vector<Channel> _channels; // List of channels (not used yet, but can be added later)
    bool _running;                  // Indicates if server is running

    // Disable copy constructor and assignment (we don’t want accidental copying)
    Server(const Server &);
    Server &operator=(const Server &);

public:
    Server(const char *port, const char *password);
    ~Server();

    // Starts the server loop (sets up, listens, and handles connections)
    void start();

    // Socket setup helpers
    void setupSocket();  // Create and configure the server socket
    void bindSocket();   // Bind the server socket to the port
    void listenSocket(); // Put server socket into listening mode

    // Event handling
    void handleEvents();                 // Main polling loop to check for activity
    void acceptClient();                 // Accept new client connection
    void handleClientMessage(int fd);    // Handle message received from client
    void handleClientDisconnect(int fd); // Handle client disconnecting

    // Utilities
    void setNonBlocking(int fd);                           // Set a file descriptor to non-blocking mode
    void sendToClient(int fd, const std::string &message); // Send data to a client

    // event management hahaha
    void enableWriteEvent(int fd);
    void disableWriteEvent(int fd);

    void handleClientOutput(int fd); // handle client output by checkign if this socket is writable and process any pending outut for that client
    // fin the client by their file desccriptor
    Client *getClientByFd(int fd);
    Client *getClientByNickname(const std::string &nickname);

    // auth commands
    void processCommand(Client *client, const std::string &message);
    void handlePass(Client *client, const std::string &params);
    void handleNick(Client *client, const std::string &params);
    void handleUser(Client *client, const std::string &params);
    bool isClientRegistered(Client *client); // Helper to check if a client has completed registration
    void handleJoin(Client *client, const std::string &channelNameRaw);
    void handlePart(Client *client, const std::string &channelNameRaw, const std::string &partMessage);
    void handleTopic(Client *client, const std::string &channelNameRaw);
    void handleMode(Client *client, const std::string &channelNameRaw);
    void handleKick(Client *client, const std::string &channelNameRaw);
    void handlePrivmsg(Client *client, const std::string &channelNameRaw, const std::string &message);
    void handleInvite(Client *client, const std::string &params);
};

int countArguments(const std::string &params);

#endif // SERVER_HPP
