/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: asid-ahm <asid-ahm@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/28 16:00:44 by asid-ahm          #+#    #+#             */
/*   Updated: 2025/04/28 16:32:37 by asid-ahm         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <iostream>

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

int main(int ac, char **av)
{
    if (ac != 3)
    {
        std::cerr << RED << "Error:\n      Invalid number of arguments\n" << RESET << std::endl;
        std::cerr << BLUE << "Usage:\n      ./irc <Port> <Password>\n" << RESET << std::endl;
        return 1;  // Return an error code
    }
    return 0;  // Success
}
