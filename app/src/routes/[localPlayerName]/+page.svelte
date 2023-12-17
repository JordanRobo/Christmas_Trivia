<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import io from 'socket.io-client';
  import gameStore from '$lib/gameStore';

  let socket: any;
  let playerName: string;
  let score: number;

  // Decode the player name from the URL parameter
  $: playerName = decodeURIComponent($page.params.localPlayerName);

  const unsubscribe = gameStore.subscribe(state => {
    console.log('Game store updated:', state);
    if (state.players[playerName]) {
      score = state.players[playerName].score;
    } else {
      // Handle case where player's score isn't in the store yet
      score = 100; // or other fallback logic
    }
  });

  onMount(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    console.log('Socket.io connection established:', socket.connected);
    // Additional setup or server communication, if necessary
  });

  onDestroy(() => {
    unsubscribe();
  });

  function buzzIn() {
    console.log(`Attempting to buzz in:`, playerName);
    if (playerName) {
        console.log(`${playerName} buzzed in!`);
        socket.emit('buzzIn', { playerName });
    } else {
        console.error('Player name is undefined or empty');
    }

  }
</script>

<main class="container w-screen">
<div class="flex justify-center my-8">
  <div class="flex-col text-center">
    <div class="mx-4 p-4 card variant-filled-warning"><h1 class="h1">{playerName}</h1></div>
    <div class="p-4 w-screen">
      <button on:click={buzzIn} class="btn w-full h-40 variant-ghost-primary active:variant-filled-primary text-4xl">Buzz In</button>
    </div>
  </div>
</div>
</main>