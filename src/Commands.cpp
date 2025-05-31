#include "Server.hpp"

void Server::handlePart(Client *client, const std::string &channelNameRaw, const std::string &partMessage)
{
    std::string channelName = channelNameRaw;

    // Validate channel name: must start with '#' or '&' and have at least 2 chars
    if ((channelName[0] != '#' && channelName[0] != '&') || !channelName[1])
    {
        std::string response = ":server 403 " + (client->getNickname().empty() ? "*" : client->getNickname());
        response += " " + channelName + " :No such channel\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    // Look for the channel in the server's list
    for (std::vector<Channel>::iterator it = _channels.begin(); it != _channels.end(); ++it)
    {
        if (it->getName() == channelName)
        {
            // Channel found: try to remove the client from the channel
            if (it->removeClient(client))
            {
                // Prepare PART message to notify all clients
                std::string partMsg = ":" + client->getNickname() + " PART " + channelName;
                if (!partMessage.empty())
                    partMsg += " :" + partMessage;
                partMsg += "\r\n";

                // Notify the leaving client
                client->addToOutputBuffer(partMsg);

                // Notify all other clients in the channel
                const std::vector<Client *> &clients = it->getClients();
                for (size_t i = 0; i < clients.size(); ++i)
                {
                    if (clients[i] != client)
                    {
                        clients[i]->addToOutputBuffer(partMsg);
                        enableWriteEvent(clients[i]->getFd());
                    }
                }

                enableWriteEvent(client->getFd());

                // Remove the channel if it is now empty
                if (it->getClients().empty())
                {
                    _channels.erase(it);
                }
            }
            else
            {
                // Client wasn't in the channel, send error 442 (You're not on that channel)
                std::string response = ":server 442 " + (client->getNickname().empty() ? "*" : client->getNickname());
                response += " " + channelName + " :You're not on that channel\r\n";
                client->addToOutputBuffer(response);
                enableWriteEvent(client->getFd());
            }
            return;
        }
    }

    // Channel does not exist, send error 403
    std::string response = ":server 403 " + (client->getNickname().empty() ? "*" : client->getNickname());
    response += " " + channelName + " :No such channel\r\n";
    client->addToOutputBuffer(response);
    enableWriteEvent(client->getFd());
}

void Server::handlePrivmsg(Client *client, const std::string &channelNameRaw, const std::string &messageContent)
{
    std::string channelName = channelNameRaw;

    // Validate channel name as before
    if ((channelName[0] != '#' && channelName[0] != '&') || !channelName[1])
    {
        std::string response = ":server 403 " + (client->getNickname().empty() ? "*" : client->getNickname());
        response += " " + channelName + " :No such channel\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    // Find the channel in the server list
    for (std::vector<Channel>::iterator it = _channels.begin(); it != _channels.end(); ++it)
    {
        if (it->getName() == channelName)
        {

            if (!it->hasClient(client))
            {
                std::string response = ":server 404 " + client->getNickname() + " " + channelName + " :Cannot send to channel\r\n";
                client->addToOutputBuffer(response);
                enableWriteEvent(client->getFd());
                return;
            }
            // *** MODIFICATION: Use the actual message from the user ***
            std::string message = ":" + client->getNickname() + " PRIVMSG " + channelName + " :" + messageContent + "\r\n";

            // Send message to all clients in the channel
            const std::vector<Client *> &clients = it->getClients();
            for (size_t i = 0; i < clients.size(); ++i)
            {
                clients[i]->addToOutputBuffer(message);
                enableWriteEvent(clients[i]->getFd());
            }

            enableWriteEvent(client->getFd());
            return;
        }
    }

    // Channel does not exist, send error 403
    std::string response = ":server 403 " + (client->getNickname().empty() ? "*" : client->getNickname());
    response += " " + channelName + " :No such channel\r\n";
    client->addToOutputBuffer(response);
    enableWriteEvent(client->getFd());
}

void Server::handleKick(Client *client, const std::string &params)
{
    std::istringstream iss(params);
    std::string channelName, targetNick;
    iss >> channelName >> targetNick;

    // Check for required parameters
    if (channelName.empty() || targetNick.empty())
    {
        std::string response = ":server 461 " + client->getNickname() + " KICK :Not enough parameters\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    // Check valid channel name format
    if ((channelName[0] != '#' && channelName[0] != '&') || channelName.size() < 2)
    {
        std::string response = ":server 403 " + client->getNickname() + " " + channelName + " :No such channel\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    // Find the channel
    Channel *targetChannel = nullptr;
    for (std::vector<Channel>::iterator it = _channels.begin(); it != _channels.end(); ++it)
    {
        if (it->getName() == channelName)
        {
            targetChannel = &(*it);
            break;
        }
    }

    if (!targetChannel)
    {
        std::string response = ":server 403 " + client->getNickname() + " " + channelName + " :No such channel\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    // Check if the sender is a channel operator
    if (!targetChannel->isOperator(client))
    {
        std::string response = ":server 482 " + client->getNickname() + " " + channelName + " :You're not a channel operator\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    // Find the target client by nickname
    Client *targetClient = getClientByNickname(targetNick); // You need this helper
    if (!targetClient)
    {
        std::string response = ":server 401 " + client->getNickname() + " " + targetNick + " :No such nick\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    // Check if the target is in the channel
    if (!targetChannel->hasClient(targetClient))
    {
        std::string response = ":server 441 " + client->getNickname() + " " + targetNick + " " + channelName + " :They aren't on that channel\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    // Notify all users in the channel
    std::string kickMsg = ":" + client->getNickname() + " KICK " + channelName + " " + targetNick + "\r\n";
    const std::vector<Client *> &clients = targetChannel->getClients();
    for (size_t i = 0; i < clients.size(); ++i)
    {
        clients[i]->addToOutputBuffer(kickMsg);
        enableWriteEvent(clients[i]->getFd());
    }

    // Remove target client from the channel
    targetChannel->removeClient(targetClient);
}

void Server::handleMode(Client *client, const std::string &params)
{
    std::vector<std::string> args;
    std::istringstream iss(params);
    std::string token;
    while (iss >> token)
    {
        args.push_back(token);
    }

    if (args.empty())
    {
        return; // no parameters
    }
    const std::string &channelName = args[0];

    // Validate channel name and find channel (your existing code)...

    Channel *targetChannel = nullptr;
    for (std::vector<Channel>::iterator it = _channels.begin(); it != _channels.end(); ++it)
    {
        if (it->getName() == channelName)
        {
            targetChannel = &(*it);
            break;
        }
    }

    if (!targetChannel)
    {
        std::string response = ":server 403 " + client->getNickname() + " " + channelName + " :No such channel\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    // If only channel name given, show current modes (your existing code)...

    if (args.size() == 1)
    {
        // show current modes (as you already have)
        // ...
        return;
    }

    // Check if client is operator before allowing mode changes
    if (!targetChannel->isOperator(client))
    {
        std::string response = ":server 482 " + client->getNickname() + " " + channelName + " :You're not a channel operator\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    const std::string &modeStr = args[1];
    bool adding = true;
    size_t nickArgIndex = 2; // index for the nickname when mode requires one

    for (size_t i = 0; i < modeStr.size(); ++i)
    {
        char mode = modeStr[i];
        if (mode == '+')
        {
            adding = true;
        }
        else if (mode == '-')
        {
            adding = false;
        }
        else if (mode == 'i')
        {
            targetChannel->setInviteOnly(adding);
        }
        else if (mode == 't')
        {
            targetChannel->setTopicRestricted(adding);
        }
        else if (mode == 'o')
        {
            // 'o' mode requires a nickname parameter
            if (nickArgIndex >= args.size())
            {
                // No nickname provided for +o or -o, ignore or send error
                continue;
            }
            std::string targetNick = args[nickArgIndex++];

            // Find client in channel by nickname
            Client *targetClient = getClientByNickname(targetNick);
            if (!targetClient)
            {
                // Send error: No such nick in channel
                std::string response = ":server 401 " + client->getNickname() + " " + targetNick + " :No such nick/channel\r\n";
                client->addToOutputBuffer(response);
                enableWriteEvent(client->getFd());
                continue;
            }

            if (adding)
            {
                targetChannel->addOperator(targetClient);
            }
            else
            {
                targetChannel->removeOperator(targetClient);
            }
        }
        else if (mode == 'k')
        {
            if (adding)
            {
                if (nickArgIndex >= args.size())
                    continue;
                targetChannel->setPassword(args[nickArgIndex++]);
            }
            else
            {
                targetChannel->setPassword("");
            }
        }
        else if (mode == 'l')
        {
            if (adding)
            {
                if (nickArgIndex >= args.size())
                    continue;
                int limit = std::atoi(args[nickArgIndex++].c_str());
                targetChannel->setUserLimit(limit);
            }
            else
            {
                targetChannel->setUserLimit(0);
            }
        }
        else
        {
            // Unknown mode, ignore or send error
        }
    }

    // Broadcast mode change
    std::string modeChangeMsg = ":" + client->getNickname() + " MODE " + channelName + " " + modeStr;
    // Also add the nicknames for modes like +o in the message
    if (modeStr.find('o') != std::string::npos)
    {
        for (size_t i = 2; i < args.size(); ++i)
        {
            modeChangeMsg += " " + args[i];
        }
    }
    modeChangeMsg += "\r\n";

    const std::vector<Client *> &clients = targetChannel->getClients();
    for (size_t i = 0; i < clients.size(); ++i)
    {
        clients[i]->addToOutputBuffer(modeChangeMsg);
        enableWriteEvent(clients[i]->getFd());
    }
}


void Server::handlePass(Client *client, const std::string &params)
{
    if (client->isAuthenticated())
    {
        std::string response = " :server 462 " + (client->getNickname().empty() ? "*" : client->getNickname());
        response += " : You may not register \n\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    if (params.empty())
    {
        std::string response = ":server 461 " + (client->getNickname().empty() ? "*" : client->getNickname());
        response += " PASS :Not enough parameters\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }
    if (params == _password)
    {
        client->setAuthenticated(true);
        std::cout << BLUE << "✓ Client " << client->getFd() << " authenticated with password" << RESET << std::endl;
        isClientRegistered(client);
    }
    else
    {
        std::cout << RED << "✗ Client " << client->getFd() << " failed password authentication" << RESET << std::endl;
        std::string response = ":server 464 " + (client->getNickname().empty() ? "*" : client->getNickname());
        response += " :Password incorrect\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
    }
}

void Server::handleNick(Client *client, const std::string &params)
{
    if (params.empty())
    {
        std::string response = ":server 431 " + (client->getNickname().empty() ? "*" : client->getNickname());
        response += " :No nickname given\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }
    // extract the name before the space and after the cmmand like "NICK AKRAM HELLO" We will take just akram bcz we found a space
    std::string nickname = params;
    size_t spacePos = nickname.find(' ');
    if (spacePos != std::string::npos)
    {
        nickname = nickname.substr(0, spacePos);
    }
    // Check if nickname is already in use
    for (std::vector<Client *>::iterator it = _clients.begin(); it != _clients.end(); ++it)
    {
        if ((*it)->getNickname() == nickname && (*it) != client)
        {
            std::string response = ":server 433 " + (client->getNickname().empty() ? "*" : client->getNickname());
            response += " " + nickname + " :Nickname is already in use\r\n";
            client->addToOutputBuffer(response);
            enableWriteEvent(client->getFd());
            return;
        }
    }
    // setting the nickname

    std::string oldNick = client->getNickname();
    client->setNickname(nickname);
    std::cout << BLUE << "✓ Client " << client->getFd() << " set nickname: "
              << (oldNick.empty() ? "None" : oldNick) << " → " << nickname << RESET << std::endl;

    // inform the client
    std::string response;
    if (!oldNick.empty())
    {
        response = ":" + oldNick + " NICK " + nickname + "\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
    }
    // Check if client is now fully registered
    isClientRegistered(client);
}

void Server::handleUser(Client *client, const std::string &params)
{
    if (countArguments(params) != 4)
    {
        std::string response = ":server 461 " + (client->getNickname().empty() ? "*" : client->getNickname());
        response += " USER :Invalid number of parameters\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    // Extract the parts using a stream
    std::istringstream iss(params);
    std::string username, hostname, servername, realname;
    iss >> username >> hostname >> servername;
    std::getline(iss, realname);
    if (realname.empty() || realname[1] != ':')
    {
        std::string response = ":server 461 " + (client->getNickname().empty() ? "*" : client->getNickname());
        response += " USER :Real name must start with ':'\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }
    realname = realname.erase(0, 1); // Remove the leading ':'

    // Set values
    client->setUsername(username);
    client->setRealname(realname);

    std::cout << BLUE << "✓ Client " << client->getFd() << " set username: "
              << (client->getUsername().empty() ? "None" : client->getUsername()) << RESET << std::endl;
    std::cout << BLUE << "✓ Client " << client->getFd() << " set realname: "
              << (client->getRealname().empty() ? "None" : client->getRealname()) << RESET << std::endl;

    // Final registration check
    isClientRegistered(client);
}

void Server::handleTopic(Client *client, const std::string &params)
{
    std::string channelName;
    std::string topic;

    size_t spacePos = params.find(' ');
    if (spacePos != std::string::npos)
    {
        channelName = params.substr(0, spacePos);
        topic = params.substr(spacePos + 1);
    }
    else
    {
        channelName = params;
    }

    // Validate channel name
    if ((channelName[0] != '#' && channelName[0] != '&') || channelName.length() < 2)
    {
        std::string response = ":server 403 " + (client->getNickname().empty() ? "*" : client->getNickname());
        response += " " + channelName + " :No such channel\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    // Find the channel
    for (std::vector<Channel>::iterator it = _channels.begin(); it != _channels.end(); ++it)
    {
        if (it->getName() == channelName)
        {

            // If no topic is provided, it's a topic query
            if (topic.empty())
            {
                std::string response;
                if (it->getTopic().empty())
                    response = ":server 331 " + client->getNickname() + " " + channelName + " :No topic is set\r\n";
                else
                    response = ":server 332 " + client->getNickname() + " " + channelName + " :topic is now: " + it->getTopic() + "\r\n";

                client->addToOutputBuffer(response);
                enableWriteEvent(client->getFd());
                return;
            }

            // Topic is being changed - check if user is in the channel
            if (!it->hasClient(client))
            {
                std::string response = ":server 442 " + client->getNickname() + " " + channelName + " :You're not on that channel\r\n";
                client->addToOutputBuffer(response);
                enableWriteEvent(client->getFd());
                return;
            }

            // Check if +t is set and client is not an operator
            if (it->isTopicRestricted() && !it->isOperator(client))
            {
                std::string response = ":server 482 " + client->getNickname() + " " + channelName + " :You're not channel operator\r\n";
                client->addToOutputBuffer(response);
                enableWriteEvent(client->getFd());
                return;
            }

            // Set the topic
            it->setTopic(topic);

            // Notify all clients in the channel with clearer message
            std::string topicMsg = ":" + client->getNickname() + " TOPIC " + channelName + " :topic is now: " + topic + "\r\n";
            const std::vector<Client *> &clients = it->getClients();
            for (size_t i = 0; i < clients.size(); ++i)
            {
                clients[i]->addToOutputBuffer(topicMsg);
                enableWriteEvent(clients[i]->getFd());
            }
            return;
        }
    }

    // Channel not found
    std::string response = ":server 403 " + (client->getNickname().empty() ? "*" : client->getNickname());
    response += " " + channelName + " :No such channel\r\n";
    client->addToOutputBuffer(response);
    enableWriteEvent(client->getFd());
}

void Server::handleInvite(Client *client, const std::string &params)
{
    std::istringstream iss(params);
    std::string targetNick, channelName;
    iss >> targetNick >> channelName;

    if (targetNick.empty() || channelName.empty())
    {
        std::string response = ":server 461 " + client->getNickname() + " INVITE :Not enough parameters\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    // Find the channel
    Channel *targetChannel = nullptr;
    for (std::vector<Channel>::iterator it = _channels.begin(); it != _channels.end(); ++it)
    {
        if (it->getName() == channelName)
        {
            targetChannel = &(*it);
            break;
        }
    }

    if (!targetChannel)
    {
        std::string response = ":server 403 " + client->getNickname() + " " + channelName + " :No such channel\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    // Check if the client is an operator
    if (!targetChannel->isOperator(client))
    {
        std::string response = ":server 482 " + client->getNickname() + " " + channelName + " :You're not a channel operator\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    // Find the target client
    Client *targetClient = getClientByNickname(targetNick);
    if (!targetClient)
    {
        std::string response = ":server 401 " + client->getNickname() + " " + targetNick + " :No such nick\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    // Send invite message
    std::string inviteMsg = ":" + client->getNickname() + " INVITE " + targetNick + " :" + channelName + "\r\n";
    targetClient->addToOutputBuffer(inviteMsg);
    enableWriteEvent(targetClient->getFd());

    std::string response = ":server 341 " + client->getNickname() + " " + targetNick + " " + channelName + "\r\n";
    client->addToOutputBuffer(response);
    enableWriteEvent(client->getFd());
}