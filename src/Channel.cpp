#include "includes/Channel.hpp"

Channel::Channel(const std::string &name, Client *creator) : _name(name)
{
    // Add the creator as the first client and operator
    _clients.push_back(creator);
    _operators.push_back(creator);
}

Channel::~Channel()
{
    // Nothing to deallocate manually
}

const std::string &Channel::getName() const
{
    return _name;
}

bool Channel::isOperator(Client *client) const
{
    for (size_t i = 0; i < _operators.size(); ++i)
    {
        if (_operators[i] == client)
            return true;
    }
    return false;
}

bool Channel::isTopicRestricted() const
{
    return _topicRestricted;
}

void Channel::addOperator(Client *client)
{
    for (size_t i = 0; i < _operators.size(); ++i)
    {
        if (_operators[i] == client)
            return; // already an operator
    }
    _operators.push_back(client);
}

void Channel::removeOperator(Client *client)
{
    std::vector<Client *>::iterator it = std::find(_operators.begin(), _operators.end(), client);
    if (it != _operators.end())
    {
        _operators.erase(it);
    }
}

const std::string &Channel::getTopic() const
{
    return _topic;
}

void Channel::setTopic(const std::string &topic)
{
    _topic = topic;
}

bool Channel::hasClient(Client *client) const
{
    return std::find(_clients.begin(), _clients.end(), client) != _clients.end();
}

bool Channel::addClient(Client *client)
{
    if (_userLimit > 0 && _clients.size() >= (size_t)_userLimit)
    {
        return false; // Channel is full
    }
    // Avoid duplicates
    for (std::vector<Client *>::const_iterator it = _clients.begin(); it != _clients.end(); ++it)
    {
        if (*it == client)
            return false;
    }
    _clients.push_back(client);
    return true;
}

void Channel::setTopicRestricted(bool restricted)
{
    _topicRestricted = restricted;
}

bool Channel::isInviteOnly() const
{
    return _inviteOnly;
}
void Channel::setInviteOnly(bool inviteOnly)
{
    _inviteOnly = inviteOnly;
}
bool Channel::isPasswordProtected() const
{
    return !_password.empty();
}
void Channel::setPassword(const std::string &password)
{
    _password = password;
}

bool Channel::removeClient(Client *client)
{
    // Find the client in the vector
    std::vector<Client *>::iterator it = std::find(_clients.begin(), _clients.end(), client);

    if (it == _clients.end())
    {
        return false; // Client not found
    }

    // Remove from clients
    _clients.erase(it);

    // Also remove from operators if they are one
    it = std::find(_operators.begin(), _operators.end(), client);
    if (it != _operators.end())
    {
        _operators.erase(it);
    }

    return true;
}

void Channel::addInvitedClient(Client *client)
{
    // Check if already invited
    for (std::vector<Client*>::iterator it = _invitedClients.begin(); it != _invitedClients.end(); ++it)
    {
        if (*it == client)
            return; // Already in the list
    }
    _invitedClients.push_back(client);
}

bool Channel::isInvited(Client *client) const
{
    for (std::vector<Client*>::const_iterator it = _invitedClients.begin(); it != _invitedClients.end(); ++it)
    {
        if (*it == client)
            return true;
    }
    return false;
}

void Channel::removeInvitation(Client *client)
{
    for (std::vector<Client*>::iterator it = _invitedClients.begin(); it != _invitedClients.end(); ++it)
    {
        if (*it == client)
        {
            _invitedClients.erase(it);
            return;
        }
    }
}