# Family Christmas Trivia App

## Overview
Welcome to my **Family Christmas Trivia App**, an app I developed to stop my family from debating who answered first to each question during our Christmas trivia! This app offers a unique experience that allows a "Presenter" to manage the game through a Dashboard, while players join in through a separate "Player" interface. Keep track of scores, buzz in to answer questions, and enjoy a seamless trivia experience powered by the latest web technologies.

This has been a fun project I taught myself how to create. It has a very minimal design with minimal functionality but I set out to create this app to just be used by my family and to teach myself how to implement websockets and create a custom server.

**Note:** 
This app has not been designed to scale and have various games running at once. As it was just created for a single purpose I didn't bother to over engineer scalibility or multiple use cases.

## Features
- **Presenter Dashboard**: A centralized control panel for the trivia host to manage questions, track scores, and oversee the game.
- **Player Interface**: An intuitive and responsive interface for players to join the game, buzz in, and view their scores.
- **Real-time Interaction**: Utilizing Socket.io for live updates and interactions between the presenter and players.
- **Score Tracking**: Automated scoring system to keep the competition fair and exciting.

## Technologies Used
- **SvelteKit**: For building a high-performance frontend.
- **Node.js**: Backing the server-side logic.
- **Skeleton.dev**: Ensuring a sleek, responsive design.
- **Socket.io**: Enabling real-time, bidirectional event-based communication.

## Installation
To set up the Family Christmas Trivia App:

1. Clone the repository:
   ```
   git clone https://github.com/JordanRobo/Christmas_Trivia.git
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. a. Start the server:
   ```
   cd server
   node index.js
   ```
   b. Run app:
   ```
   cd app
   npm run dev
   ```

## Usage
- **Starting the Game**: Launch the app and log in as a Presenter to start a new trivia game.
- **Joining as a Player**: Players can join the game and buzz in from a mobile device.
- **Playing the Game**: Answer trivia questions, buzz in through the Player interface, and track your scores in real time.

## Contributing
Contributions to the Family Christmas Trivia App are welcome! Please read our contributing guidelines before submitting your pull requests.

## Contact
For any queries or suggestions, feel free to contact jordan@stateot.art.