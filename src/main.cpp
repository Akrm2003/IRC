/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: asid-ahm <asid-ahm@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/28 16:00:44 by asid-ahm          #+#    #+#             */
/*   Updated: 2025/05/06 01:40:16 by asid-ahm         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <iostream>  
#include <cstring>  
#include <sys/socket.h>  
#include <netinet/in.h>  
#include <unistd.h>  
#include <fcntl.h>  


#define RESET   "\033[0m"
#define BOLD    "\033[1m"
#define UNDERLINE "\033[4m"

#define RED     "\033[31m"
#define GREEN   "\033[32m"
#define YELLOW  "\033[33m"
#define BLUE    "\033[34m"
#define MAGENTA "\033[35m"
#define CYAN    "\033[36m"
#define WHITE   "\033[37m"

// int main()
// {
//     int port = 4000;
//     tcp::server server(port);
//     server.OnMessage(PrintMessage);
//     server.Listen();
// }