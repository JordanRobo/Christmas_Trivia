// src/lib/playerListStore.ts
import { writable } from 'svelte/store';

export const playerList = writable({});
export const lastBuzzedPlayer = writable('');
export const buzzInAccepted = writable(true); // True if buzz-ins are accepted

export function updatePlayerList(newData) {
  playerList.set(newData);
}

export function setLastBuzzedPlayer(playerName) {
  lastBuzzedPlayer.set(playerName);
}

export function setBuzzInAccepted(state) {
  buzzInAccepted.set(state);
}
