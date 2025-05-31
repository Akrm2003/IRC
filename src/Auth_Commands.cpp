#include "Server.hpp"

void Server::handleJoin(Client *client, const std::string &channelNameRaw)
{
    std::string channelName = channelNameRaw;

    // Validate channel name
    if ((channelName[0] != '#' && channelName[0] != '&') || !channelName[1])
    {
        std::string response = ":server 403 " + (client->getNickname().empty() ? "*" : client->getNickname());
        response += " " + channelName + " :No such channel\r\n";
        client->addToOutputBuffer(response);
        enableWriteEvent(client->getFd());
        return;
    }

    // Check if the channel already exists
    for (std::vector<Channel>::iterator it = _channels.begin(); it != _channels.end(); ++it)
    {
        if (it->getName() == channelName)
        {
            // Channel already exists, try to add the client
            if (it->addClient(client))
            {
                std::string joinMsg = ":" + client->getNickname() + " JOIN " + channelName + "\r\n";

                // Notify the joining client
                client->addToOutputBuffer(joinMsg);

                // Send topic if exists
                if (!it->getTopic().empty())
                {
                    std::string topicReply = ":server 332 " + client->getNickname() + " " + channelName + " :" + it->getTopic() + "\r\n";
                    client->addToOutputBuffer(topicReply);
                }

                // Send NAMES list
                std::string namesReply = ":server 353 " + client->getNickname() + " = " + channelName + " :";
                const std::vector<Client *> &clients = it->getClients();
                for (size_t i = 0; i < clients.size(); ++i)
                {
                    namesReply += clients[i]->getNickname() + " ";
                }
                namesReply += "\r\n";
                std::string endOfNames = ":server 366 " + client->getNickname() + " " + channelName + " :End of /NAMES list\r\n";

                client->addToOutputBuffer(namesReply);
                client->addToOutputBuffer(endOfNames);

                // Broadcast JOIN to other clients
                for (size_t i = 0; i < clients.size(); ++i)
                {
                    if (clients[i] != client)
                    {
                        clients[i]->addToOutputBuffer(joinMsg);
                        enableWriteEvent(clients[i]->getFd());
                    }
                }

                enableWriteEvent(client->getFd());
            }
            else
            {
                // Client is already in the channel
                std::string response = ":server 442 " + (client->getNickname().empty() ? "*" : client->getNickname());
                response += " " + channelName + " :You're already on that channel\r\n";
                client->addToOutputBuffer(response);
                enableWriteEvent(client->getFd());
            }
            return;
        }
    }

    // Channel doesn't exist: create new and add the client
    Channel newChannel(channelName, client);
    _channels.push_back(newChannel);

    std::string joinMsg = ":" + client->getNickname() + " JOIN " + channelName + "\r\n";
    client->addToOutputBuffer(joinMsg);

    // No topic yet
    std::string namesReply = ":server 353 " + client->getNickname() + " = " + channelName + " :" + client->getNickname() + "\r\n";
    std::string endOfNames = ":server 366 " + client->getNickname() + " " + channelName + " :End of /NAMES list\r\n";

    client->addToOutputBuffer(namesReply);
    client->addToOutputBuffer(endOfNames);

    enableWriteEvent(client->getFd());
}
