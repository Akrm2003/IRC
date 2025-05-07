#include "includes/Client.hpp"

Client::Client(int fd, const std::string& ip) 
    : _fd(fd), _ip(ip), _authenticated(false) {
}

Client::~Client() {
}

int Client::getFd() const {
    return _fd;
}

const std::string& Client::getIp() const {
    return _ip;
}

const std::string& Client::getNickname() const {
    return _nickname;
}

const std::string& Client::getUsername() const {
    return _username;
}

bool Client::isAuthenticated() const {
    return _authenticated;
}

void Client::setNickname(const std::string& nickname) {
    _nickname = nickname;
}

void Client::setUsername(const std::string& username) {
    _username = username;
}

void Client::setAuthenticated(bool auth) {
    _authenticated = auth;
}