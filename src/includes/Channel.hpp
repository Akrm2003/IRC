#ifndef CHANNEL_HPP
#define CHANNEL_HPP

#include <string>
#include <vector>

class Client;

class Channel {
private:
    std::string _name;                  // Channel name (starts with #)
    std::string _topic;                 // Channel topic
    std::vector<Client*> _clients;      // Clients in the channel
    std::vector<Client*> _operators;    // Channel operators

public:
    Channel(const std::string& name, Client* creator);
    ~Channel();

    //basic getters :
    const std::string& getName() const;
    const std::string& getTopic() const;

     // Client management
    bool addClient(Client* client);
    bool removeClient(Client* client);
    bool hasClient(Client* client) const;

}