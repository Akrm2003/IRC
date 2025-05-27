#!/bin/bash


SERVER_PORT=6667
SERVER_PASSWORD="testpassword"
SERVER_EXEC="./ircserv"
NC_CMD="nc -C" # Use -C for compatibility with IRC commands

# Start the server in the background
start_server() {
    echo "Starting IRC server..."
    $SERVER_EXEC $SERVER_PORT $SERVER_PASSWORD &
    SERVER_PID=$!
    sleep 2 # Give the server time to start
}

# Stop the server
stop_server() {
    echo "Stopping IRC server..."
    kill $SERVER_PID
    wait $SERVER_PID 2>/dev/null
}

# Test a single client connection
test_single_client() {
    echo "Testing single client connection..."
    echo -e "PASS $SERVER_PASSWORD\r\nNICK testuser\r\nUSER testuser 0 * :Test User\r\nQUIT\r\n" | $NC_CMD localhost $SERVER_PORT
}

# Test multiple clients
test_multiple_clients() {
    echo "Testing multiple clients..."
    {
        echo -e "PASS $SERVER_PASSWORD\r\nNICK user1\r\nUSER user1 0 * :User One\r\nJOIN #test\r\nPRIVMSG #test :Hello from user1\r\nQUIT\r\n"
    } | $NC_CMD localhost $SERVER_PORT &

    {
        echo -e "PASS $SERVER_PASSWORD\r\nNICK user2\r\nUSER user2 0 * :User Two\r\nJOIN #test\r\nPRIVMSG #test :Hello from user2\r\nQUIT\r\n"
    } | $NC_CMD localhost $SERVER_PORT &
    wait
}

# Test channel operations
test_channel_operations() {
    echo "Testing channel operations..."
    {
        echo -e "PASS $SERVER_PASSWORD\r\nNICK operator\r\nUSER operator 0 * :Operator\r\nJOIN #test\r\nMODE #test +o operator\r\nKICK #test user1\r\nQUIT\r\n"
    } | $NC_CMD localhost $SERVER_PORT &
    wait
}

# Test invalid commands
test_invalid_commands() {
    echo "Testing invalid commands..."
    echo -e "INVALIDCOMMAND\r\nQUIT\r\n" | $NC_CMD localhost $SERVER_PORT
}

# Run all tests
run_tests() {
    test_single_client
    test_multiple_clients
    test_channel_operations
    test_invalid_commands
}

# Main script
start_server
run_tests
stop_server
