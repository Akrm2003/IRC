#ifndef CHANNEL_HPP
#define CHANNEL_HPP

#include <string>
#include <vector>

class Client;

class Channel
{
private:
    std::string _name;  // Channel name (starts with #)
    std::string _topic; // Channel topic
    // bool _inviteOnly;               // Invite-only flag
    // bool _passwordProtected;        // Password-protected flag
    std::string _password;            // Channel password
    std::vector<Client *> _clients;   // Clients in the channel
    std::vector<Client *> _operators; // Channel operators
    bool _topicRestricted;            // Topic restricted flag
    bool _inviteOnly;                 // Invite-only flag
    int _userLimit;                   // Maximum number of users allowed in the channel

public:
    Channel(const std::string &name, Client *creator);
    ~Channel();

    // basic getters :
    const std::string &getName() const;
    const std::string &getTopic() const;
    const std::string &getPassword() const;
    // Setters
    void setTopic(const std::string &topic);
    void setInviteOnly(bool inviteOnly);
    void setTopicRestricted(bool restricted);
    void setPassword(const std::string &password);
    void setUserLimit(int limit) { _userLimit = limit; }
    int getUserLimit() const { return _userLimit; }

    // Client management
    bool addClient(Client *client);
    bool removeClient(Client *client);
    bool hasClient(Client *client) const;
    const std::vector<Client *> &getClients() const { return _clients; };
    bool isOperator(Client *client) const;
    void addOperator(Client *client);
    void removeOperator(Client *client);
    bool isInviteOnly() const;
    bool isTopicRestricted() const;
    bool isPasswordProtected() const;
};

#endif