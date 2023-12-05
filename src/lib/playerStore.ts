// playerStore.ts
import { writable } from 'svelte/store';

export const playerName = writable('');
export const playerScore = writable(100); // Starting score of 100
