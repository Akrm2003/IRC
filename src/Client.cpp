#include "includes/Client.hpp"

Client::Client(int fd, const std::string& ip) 
    : _fd(fd), _ip(ip), _authenticated(false) , _registered(false) {
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

void Client::setRealname(const std::string& realname) {
    _realname = realname;
}

void Client::setAuthenticated(bool auth) {
    _authenticated = auth;
}

void Client::appendToInputBuffer(const std::string& data)
{
    _inputBuffer += data;
}

bool Client::hasCompleteMessage() const {
    // Check for standard IRC ending \r\n
    if (_inputBuffer.find("\r\n") != std::string::npos)
        return true;
        
    // Also accept just \n for easier testing with regular netcat
    if (_inputBuffer.find("\n") != std::string::npos)
        return true;
        
    return false;
}

std::string Client::getNextMessage() {
    std::string message;
    size_t pos = _inputBuffer.find("\r\n");
    
    if (pos != std::string::npos) {
        message = _inputBuffer.substr(0, pos);
        _inputBuffer.erase(0, pos + 2);
        return message;
    }
    
    // Try with just \n
    pos = _inputBuffer.find("\n");
    if (pos != std::string::npos) {
        message = _inputBuffer.substr(0, pos);
        _inputBuffer.erase(0, pos + 1);
        return message;
    }
    
    return message;
}


void Client::addToOutputBuffer(const std::string& message) {
    _outputBuffer += message;
}

std::string Client::getOutputBuffer() {
    return _outputBuffer;
}

void Client::clearOutputBuffer() {
    _outputBuffer.clear();
}

bool Client::hasDataToSend() const {
    return !_outputBuffer.empty();
}

const std::string& Client::getRealname() const {
    return _realname;
}

bool Client::isRegistered() const {
    return _registered;
}

void Client::setRegistered(bool reg) {
    _registered = reg;
}