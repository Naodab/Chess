# Chess Game

## Overview
This project is a chess game that supports both AI-based single-player mode and online multiplayer mode. The AI uses the **Minimax algorithm** with **Alpha-Beta Pruning** for efficient decision-making. The game includes **move validation and hack detection** to ensure fair play. It features a **Spring Boot backend** with **JWT authentication** and a **JSP frontend**. Multiplayer functionality is implemented using **WebSockets**, and game data is stored in **MySQL**.

## Features
- **AI Opponent**: Implements Minimax with Alpha-Beta Pruning for an optimized chess AI.
- **Multiplayer Mode**: Supports real-time online matches using WebSockets.
- **Move Validation & Anti-Cheating**: Detects illegal or manipulated moves to prevent hacking.
- **Authentication**: Uses JWT for secure user authentication.
- **Database Storage**: MySQL stores game history, user data, and game states.
- **Frontend**: JSP-based user interface for a smooth playing experience.
- **Backend**: Spring Boot-powered RESTful API for game logic and user management.
- **Admin Default Account**: The application includes a default admin account with:
  - **Username**: `admin`
  - **Password**: `adminadmin`

## Tech Stack
### Backend:
- **Spring Boot**: Manages REST APIs and game logic.
- **Spring Security & JWT**: Handles authentication and authorization.
- **WebSockets**: Enables real-time communication for multiplayer.
- **MySQL**: Stores game states, users, and move history.
- **Minimax with Alpha-Beta Pruning**: AI for chess decision-making.

### Frontend:
- **JSP (JavaServer Pages)**: Renders the UI.
- **JavaScript & AJAX**: Handles interactions and updates.
- **WebSockets**: Syncs game state in real time.

## Installation
### Prerequisites
- **Java 17+**
- **MySQL 8.0+**
- **Maven**

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Naodab/Chess.git
   cd Chess
   ```

2. **Configure MySQL Database:**
   - Create a database:
     ```sql
     CREATE DATABASE chess_db;
     ```
   - Update `application.properties`:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/chess_db
     spring.datasource.username=root
     spring.datasource.password=yourpassword
     ```

3. **Build and Run the Application:**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   The application will start on `http://localhost:8080/chess/public`.

## API Endpoints
### Authentication
- **POST** `/chess/public/login` - Authenticate user with JWT.
- **POST** `/chess/public/signup` - Register a new user.

## Security & Anti-Cheating Measures
- **JWT Authentication**: Prevents unauthorized access.
- **Move Validation**: Ensures only legal moves are allowed.
- **Cheat Detection**: Detects hacked moves and rejects them.

## Future Improvements
- Implement UI enhancements with React or Vue.js.
- Add ELO-based matchmaking for ranked games.
- Store replay data for move analysis.

## License
This project is open-source under the MIT License.

