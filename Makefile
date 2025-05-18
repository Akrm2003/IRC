# Colors and formatting
RED    := \033[1;31m
GREEN  := \033[1;32m
YELLOW := \033[1;33m
BLUE   := \033[1;34m
PURPLE := \033[1;35m
CYAN   := \033[1;36m
WHITE  := \033[1;37m
RESET  := \033[0m
BOLD   := \033[1m

# Progress bar symbols
BAR_DONE   := █
BAR_TODO   := ░
BAR_WIDTH  := 30

NAME = ircserv

CXX = c++
CXXFLAGS = -Wall -Wextra -Werror -std=c++98

SRC_DIR = src
OBJ_DIR = obj
INC_DIR = src/includes

SRCS = $(SRC_DIR)/main.cpp \
       $(SRC_DIR)/Server.cpp \
       $(SRC_DIR)/Client.cpp

OBJS = $(SRCS:$(SRC_DIR)/%.cpp=$(OBJ_DIR)/%.o)

# Count total objects and initialize counter
TOTAL_OBJS := $(words $(OBJS))
COMPILED_OBJS := 0

all: pre_build $(NAME) post_build

pre_build:
	@echo "${CYAN}${BOLD}"
	@echo "╔══════════════════════════════════════════╗"
	@echo "║          IRC SERVER COMPILATION          ║"
	@echo "╚══════════════════════════════════════════╝${RESET}"
	@echo "${YELLOW}Compiling ${TOTAL_OBJS} files...${RESET}\n"

post_build:
	@echo "\n${GREEN}${BOLD}✓ Build complete: ${NAME} is ready!${RESET}"
	@echo "${CYAN}Run with: ${YELLOW}./$(NAME) <port> <password>${RESET}"

$(NAME): $(OBJS)
	@echo "\n${BLUE}Linking objects into executable...${RESET}"
	@$(CXX) $(CXXFLAGS) $(OBJS) -o $(NAME)
	@echo "${GREEN}${BOLD}✓ ${NAME} created successfully!${RESET}"

$(OBJ_DIR)/%.o: $(SRC_DIR)/%.cpp
	@mkdir -p $(OBJ_DIR)
	@# Update counter and calculate progress
	$(eval COMPILED_OBJS := $(shell echo $$(($(COMPILED_OBJS) + 1))))
	$(eval PROGRESS := $(shell echo $$(($(COMPILED_OBJS) * $(BAR_WIDTH) / $(TOTAL_OBJS)))))
	$(eval PERCENT := $(shell echo $$(($(COMPILED_OBJS) * 100 / $(TOTAL_OBJS)))))
	$(eval BAR := $(shell printf '$(BAR_DONE)%.0s' {1..$(PROGRESS)}))
	$(eval SPACES := $(shell echo $$(($(BAR_WIDTH) - $(PROGRESS)))))
	$(eval EMPTY := $(shell printf '$(BAR_TODO)%.0s' {1..$(SPACES)}))
	@# Display progress bar
	@printf "\r${YELLOW}[${PURPLE}%s${BAR}${EMPTY}${YELLOW}] ${CYAN}%3d%% ${WHITE}Compiling: ${GREEN}$<${RESET}" "" $(PERCENT)
	@$(CXX) $(CXXFLAGS) -I$(INC_DIR) -c $< -o $@


clean:
	@echo "${YELLOW}Cleaning object files...${RESET}"
	@rm -rf $(OBJ_DIR)
	@echo "${GREEN}✓ Object files cleaned${RESET}"

fclean: clean
	@echo "${YELLOW}Removing executable...${RESET}"
	@rm -f $(NAME)
	@echo "${GREEN}✓ Executable removed${RESET}"

irssi1:
	@echo "${CYAN}${BOLD}Starting IRSSI client 1...${RESET}"
	@-docker run -it --name irssi-sender -e TERM -u $(shell id -u):$(shell id -g) \
	--log-driver=none \
	-v ${HOME}/.irssi-sender:/home/user/.irssi \
	irssi

irssi1:
	@echo "$(GREEN)Starting IRSSI client 1...$(RESET)"
	@-docker run -it --name irssi-sender -e TERM -u $(shell id -u):$(shell id -g) \
	--log-driver=none \
	-v ${HOME}/.irssi-sender:/home/user/.irssi \
	irssi

re: fclean all

.PHONY: all clean fclean re pre_build post_build