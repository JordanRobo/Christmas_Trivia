import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

// Structure to keep track of players and scores
let players = {};
let buzzInAccepted = true; // Track whether a buzz-in is accepted

io.on('connection', (socket) => {
  // Handle the 'nextQuestion' event
  socket.on('nextQuestion', () => {
    buzzInAccepted = true;
    io.emit('resetBuzzIn');
    // Additional logic here if needed, e.g., update a question counter
  });

  // Handle a player joining
  socket.on('playerJoined', (data) => {
    const playerName = data.playerName;

    if (typeof playerName === 'string' && playerName.trim() !== '') {
      if (!players[playerName]) {
        players[playerName] = { score: 100 }; // Starting score of 100
      }
      io.emit('playersListUpdate', players);
    } else {
      console.error('Invalid player name received');
    }
  });

  // Handle a player buzzing in
  socket.on('buzzIn', (data) => {
    const playerName = data.playerName;
    console.log(`${playerName} buzzed in`);
    if (buzzInAccepted && typeof playerName === 'string') {
      buzzInAccepted = false; 
      io.emit('playerBuzzed', { playerName });
    }
  });

  // Handle updating a player's score
  socket.on('updatePlayerScore', (data) => {
    console.log('Received score update data:', data);
    const { playerName, scoreChange } = data;
    if (typeof playerName === 'string' && typeof scoreChange === 'number' && players[playerName]) {
      players[playerName].score += scoreChange;
      io.emit('scoreUpdate', { playerName, newScore: players[playerName].score });
      io.emit('playersListUpdate', players);
    } else {
      console.error('Invalid data received for score update');
    }
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    // Find and remove the disconnected player
    for (const playerName in players) {
      if (players[playerName].socketId === socket.id) {
        delete players[playerName];
        io.emit('playersListUpdate', players);
        break;
      }
    }
  });

  // Handle a game reset
  socket.on('resetGame', () => {
    console.log('Resetting game');
    players = {};
    io.emit('playersListUpdate', players);
  });

  socket.on('connect_error', (err) => {
    console.error('Socket connection error:', err);
  });

  socket.on('connect_timeout', (timeout) => {
    console.error('Socket connection timeout:', timeout);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});