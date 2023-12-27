<script lang="ts">
  import { onMount } from 'svelte';
  import io from 'socket.io-client';
  import gameStore from '$lib/gameStore';
  import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
  import { triviaQuestions } from './data.js';
  import Questions from '../../components/Questions.svelte';
    
  let count: number = 0;

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
    count++;
  }

  function lastQuestion() {
    count--;
  }

</script>

<div class="flex justify-center my-8">
  <div class="flex-col text-center">
    <div class="card variant-ringed-secondary p-4 m-4">
      <div class="py-2">
        <input class="input text-center" type="number" bind:value={points} />
      </div>
      <div class="py-2">
        <button on:click={() => handleScoreUpdate(true)} class="btn btn-lg variant-ghost-success hover:variant-filled-success">
          Plus</button>
        <button on:click={() => handleScoreUpdate(false)} class="btn btn-lg variant-ghost-error hover:variant-filled-error">
          Minus</button>
      </div>
    </div>
    <Questions>
      <span slot="round">{triviaQuestions.at(count)?.round}</span>
      <span slot="number">{triviaQuestions.at(count)?.number}</span>
      <span slot="question">{triviaQuestions.at(count)?.question}</span>
      <span slot="answer">{triviaQuestions.at(count)?.answer}</span>
    </Questions>
    <div class="py-2 w-full">
      <button on:click={lastQuestion} class="btn btn-lg variant-ghost-warning hover:variant-filled-warning">
        Previous Question</button>
      <button on:click={nextQuestion} class="btn btn-lg variant-ghost-warning hover:variant-filled-warning">
        Next Question</button>
    </div>
    <div class="py-2 w-full">
      <button on:click={() =>  modalStore.trigger(warning_modal)} class="btn btn-lg variant-ghost-error hover:variant-filled-error">
        Reset Game</button>
    </div> 
  </div>
</div>            