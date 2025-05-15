#include "includes/Channel.hpp"
#include "includes/Client.hpp"
#include <algorithm>

Channel::Channel(const std::string& name, Client* creator) : _name(name) {
    // Add the creator as the first client and operator
    _clients.push_back(creator);
    _operators.push_back(creator);
}


Channel::~Channel() {
    // Nothing to deallocate manually
}

const std::string& Channel::getName() const {
    return _name;
}

const std::string& Channel::getTopic() const {
    return _topic;
}

bool Channel::hasClient(Client* client) const {
    return std::find(_clients.begin(), _clients.end(), client) != _clients.end();
}

bool Channel::addClient(Client* client) {
    // Check if client is already in the channel
    if (hasClient(client)) {
        return false;
    }
    _clients.push_back(client);
    return true;
}

bool Channel::removeClient(Client* client) {
    // Find the client in the vector
    std::vector<Client*>::iterator it = std::find(_clients.begin(), _clients.end(), client);
    
    if (it == _clients.end()) {
        return false; // Client not found
    }
    
    // Remove from clients
    _clients.erase(it);
    
    // Also remove from operators if they are one
    it = std::find(_operators.begin(), _operators.end(), client);
    if (it != _operators.end()) {
        _operators.erase(it);
    }
    
    return true;
}