#include "includes/Server.hpp"
#include <iostream>
#include <cstdlib>

#define RED "\033[31m"
#define RESET "\033[0m"

int main(int argc, char **argv) {
    try {
        if (argc != 3) {
            std::cerr << RED << "Error: Invalid number of arguments." << RESET << std::endl;
            std::cerr << "Usage: ./ircserv <port> <password>" << std::endl;
            return EXIT_FAILURE;
        }
        
        Server server(argv[1], argv[2]);
        server.start();
    } catch (const std::exception& e) {
        std::cerr << RED << "Error: " << e.what() << RESET << std::endl;
        return EXIT_FAILURE;
    }
    
    return EXIT_SUCCESS;
}