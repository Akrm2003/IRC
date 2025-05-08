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

// Forward declarations
class Client;

class Server {
private:
    int _port;                            // Port to listen on
    std::string _password;               // Password for clients to connect (authentication)
    int _serverSocket;                   // Main server socket file descriptor

    std::vector<Client> _clients;        // List of all connected clients
    std::vector<pollfd> _pollfds;        // List of pollfd structs used to monitor file descriptors (server + clients)

    bool _running;                       // Indicates if server is running

    // Disable copy constructor and assignment (we don’t want accidental copying)
    Server(const Server&);
    Server& operator=(const Server&);

public:
    Server(const char* port, const char* password);
    ~Server();

    // Starts the server loop (sets up, listens, and handles connections)
    void start();

    // Socket setup helpers
    void setupSocket();                  // Create and configure the server socket
    void bindSocket();                   // Bind the server socket to the port
    void listenSocket();                 // Put server socket into listening mode

    // Event handling
    void handleEvents();                 // Main polling loop to check for activity
    void acceptClient();                 // Accept new client connection
    void handleClientMessage(int fd);    // Handle message received from client
    void handleClientDisconnect(int fd); // Handle client disconnecting

    // Utilities
    void setNonBlocking(int fd);         // Set a file descriptor to non-blocking mode
    void sendToClient(int fd, const std::string& message); // Send data to a client

    //event management hahaha
    void enableWriteEvent(int fd);
    void disableWriteEvent(int fd);

    void handleClientOutput(int fd);    // handle client output by checkign if this socket is writable and process any pending outut for that client
    // fin the client by their file desccriptor 
    Client* getClientByFd(int fd);
};

#endif // SERVER_HPP
