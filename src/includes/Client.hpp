#ifndef CLIENT_HPP
#define CLIENT_HPP

#include <string>
#include <vector>

class Client {
private:
    int _fd;
    std::string _ip;
    std::string _nickname;
    std::string _username;
    bool _authenticated;
    std::string _inputBuffer;
    std::string _outputBuffer;

public:
    Client(int fd, const std::string& ip);
    ~Client();
    
    // Getters
    int getFd() const;
    const std::string& getIp() const;
    const std::string& getNickname() const;
    const std::string& getUsername() const;
    bool isAuthenticated() const;
    
    // Setters
    void setNickname(const std::string& nickname);
    void setUsername(const std::string& username);
    void setAuthenticated(bool auth);

    //buffer management 
    void appendToInputBuffer(const std::string& data);
    bool hasCompleteMessage()const;
    std::string getNextMessage();
    
    void addToOutputBuffer(const std::string& message);
    std::string getOutputBuffer();
    void clearOutputBuffer();
    bool hasDataToSend() const;
};

#endif // CLIENT_HPP