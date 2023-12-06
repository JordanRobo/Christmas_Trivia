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
    socket = io('http://localhost:3001');
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
    }
  }
</script>

<div class="flex justify-center my-8">
  <div class="flex-col text-center">
    <div class="py-4"><h1 class="h1">{playerName}</h1></div>
    <div class="py-4">
      <button on:click={buzzIn} class="btn btn-xl variant-ghost-error hover:variant-filled-error">Buzz In</button>
    </div>
  </div>
</div>
