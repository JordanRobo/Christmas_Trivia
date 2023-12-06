import { writable, type Writable } from 'svelte/store';

interface Player {
  score: number;
}

interface GameState {
    players: Record<string, Player>;
    currentPlayer: string;
    lastBuzzedPlayer: string;
    buzzInAccepted: boolean;
    currentPlayerScore?: number;
  }

  const initialState: GameState = {
    players: {},
    currentPlayer: '',
    lastBuzzedPlayer: '',
    buzzInAccepted: true,
    currentPlayerScore: 100
  };

const gameStore: Writable<GameState> = writable(initialState);

// Function to update the list of players and their scores
function updatePlayerList(newPlayers: Record<string, Player>): void {
  gameStore.update(state => {
    return { ...state, players: newPlayers };
  });
}

// Function to set the last player who buzzed in
function setLastBuzzedPlayer(playerName: string): void {
  console.log(`Updating last buzzed player: ${playerName}`);
  gameStore.update(state => {
    return { ...state, lastBuzzedPlayer: playerName };
  });
}

// Function to set the buzz-in acceptance state
function setBuzzInAccepted(newState: boolean): void {
  gameStore.update(state => {
    return { ...state, buzzInAccepted: newState };
  });
}

// Function to update a player's score
function updatePlayerScore(playerName: string, newScore: number): void {
  gameStore.update(state => {
    const updatedPlayers = { ...state.players };
    if (updatedPlayers[playerName]) {
      updatedPlayers[playerName].score = newScore;
    }
    return { ...state, players: updatedPlayers };
  });
}

// Function to set the current player
function setCurrentPlayer(playerName: string): void {
  gameStore.update(state => {
    const newScore = state.players[playerName]?.score ?? 100;
    return { ...state, currentPlayer: playerName, currentPlayerScore: newScore };
  });
}

export default {
    subscribe: gameStore.subscribe,
    set: gameStore.set,
    updatePlayerList,
    setLastBuzzedPlayer,
    setBuzzInAccepted,
    updatePlayerScore,
    setCurrentPlayer
  };
