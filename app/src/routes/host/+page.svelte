<script lang="ts">
  import { onMount } from 'svelte';
  import io from 'socket.io-client';
  import gameStore from '$lib/gameStore';
  import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
    

  const modalStore = getModalStore();

  const warning_modal: ModalSettings = {
            type: 'component',
            component: 'warningModal',
  }

  let socket: any;
  let points = 5; // Default points to add/subtract

  $: console.log('Current lastBuzzedPlayer:', $gameStore.lastBuzzedPlayer);

  onMount(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL); // Adjust the URL to match your server

    socket.on('playerBuzzed', (data: any) => {
      console.log ('Player Buzzed in', data.playerName);
      gameStore.setLastBuzzedPlayer(data.playerName);
    });
  });

  function handleScoreUpdate(isCorrect: boolean) {
  if (!$gameStore.lastBuzzedPlayer || !$gameStore.lastBuzzedPlayer.trim()) {
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
      <button on:click={() => handleScoreUpdate(true)} class="btn btn-lg variant-ghost-success hover:variant-filled-success">
        Plus</button>
      <button on:click={() => handleScoreUpdate(false)} class="btn btn-lg variant-ghost-error hover:variant-filled-error">
        Minus</button>
    </div>
    <div class="py-2 w-full">
      <button on:click={nextQuestion} class="btn btn-lg variant-ghost-warning hover:variant-filled-warning">
        Buzzer Reset</button>
    </div>   
    <div class="py-2 w-full">
      <button on:click={() => modalStore.trigger(warning_modal)} class="btn btn-lg variant-ghost-warning hover:variant-filled-warning">
        Reset Game</button>
    </div> 
  </div>
</div>            