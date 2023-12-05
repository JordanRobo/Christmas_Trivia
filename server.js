import { Server } from "socket.io";

const io = new Server(3001, {
  cors: {
    origin: '*',
  },
});

// Structure to keep track of players and scores
let players = {};

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('nextQuestion', () => {
    // Logic to reset the buzz-in state
    io.emit('resetBuzzIn');
    // You can add additional logic here if needed, e.g., update a question counter
  });

  // Handle a player joining
  socket.on('playerJoined', (data) => {
    const playerName = data.playerName;

    // Add the player to the server's state with an initial score, if not already present
    if (!players[playerName]) {
      players[playerName] = { score: 100 }; // Starting score of 100
    }

    // Broadcast updated players list to all clients
    io.emit('playersListUpdate', players);
  });

  // Handle a player buzzing in
  socket.on('buzzIn', (data) => {
    const playerName = data.playerName;
    console.log(`${playerName} buzzed in`);

    // Logic to handle buzzing in (e.g., determining if it's the correct timing, updating state, etc.)

    // Broadcast to all clients which player buzzed in
    io.emit('playerBuzzed', { playerName });
  });

  // Handle score updates
  // This could be triggered by various game events
  socket.on('updateScore', (data) => {
    const { playerName, scoreChange } = data;

    // Update the score in the server's state
    if (players[playerName]) {
      players[playerName].score += scoreChange;
    }

    // Broadcast updated score to all clients
    io.emit('playersListUpdate', players);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
    // Implement any cleanup or state update logic necessary on disconnection
  });
});

console.log('WebSocket server is running on port 3001');
