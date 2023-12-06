<script lang="ts">
  import { onMount } from 'svelte';
  import io from 'socket.io-client';
  import gameStore from '$lib/gameStore';

  let socket: any;
  let points = 5; // Initialize as a number

  $: console.log('Current lastBuzzedPlayer:', $gameStore.lastBuzzedPlayer);

  onMount(() => {
    socket = io('http://localhost:3001'); // Adjust the URL to match your server

    socket.on('playerBuzzed', (data) => {
      console.log ('Player Buzzed in', data.playerName);
      gameStore.setLastBuzzedPlayer(data.playerName);
    });
  });

  function handleScoreUpdate(isCorrect) {
  if (!$gameStore.lastBuzzedPlayer.trim()) {
    console.error('No player has buzzed in to update score for');
    return;
  }
  const scoreChange = isCorrect ? +points : -points;
  console.log('Sending score update:', { playerName: $gameStore.lastBuzzedPlayer, scoreChange });
  socket.emit('updatePlayerScore', { playerName: $gameStore.lastBuzzedPlayer, scoreChange });
}

  function nextQuestion() {
    socket.emit('nextQuestion');
  }
</script>

<div class="flex justify-center my-8">
  <div class="flex-col text-center">
    <div class="py-2">
      <input class="input text-center" type="number" bind:value={points} />
    </div>
    <div class="py-2">
      <button on:click={() => handleScoreUpdate(true)} class="btn btn-xl variant-ghost-success hover:variant-filled-success">
        Correct Answer</button>
    </div>
    <div class="py-2">
      <button on:click={() => handleScoreUpdate(false)} class="btn btn-xl variant-ghost-error hover:variant-filled-error">
        Incorrect Answer</button>
    </div>
    <div class="py-2">
      <button on:click={nextQuestion} class="btn btn-xl variant-ghost-warning hover:variant-filled-warning">
        Next Question</button>
    </div>    
  </div>
</div>
