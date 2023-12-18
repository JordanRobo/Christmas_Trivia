<script lang="ts">
  import { onMount } from 'svelte';
  import io from 'socket.io-client';
  import { getModalStore } from '@skeletonlabs/skeleton';
  import gameStore from '$lib/gameStore'; // Updated import path
  import { goto } from '$app/navigation';

  let localPlayerName = '';
  let socket: any;

  const modalStore = getModalStore();

  onMount(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL); // Adjust the URL to match your server
  });

  function submitPlayerInfo() {
    if (localPlayerName.trim() !== '') {
      gameStore.setCurrentPlayer(localPlayerName);
      socket.emit('playerJoined', { playerName: localPlayerName });
      modalStore.close();
      goto(`/${encodeURIComponent(localPlayerName)}`); // Navigate with URL encoding
    } else {
      // Show an error message
    }
  }

</script>

<main class="">
<div class="card p-6 variant-ghost-secondary">
  <div class="my-4 text-center">
    <h2 class="h2 my-6">Who Are you?</h2>
    <input class="input" type="text" bind:value={localPlayerName} placeholder="Your Name"/>
  </div>
  <div class="my-4 text-center">
    <button on:click={submitPlayerInfo} class="btn btn-xl variant-filled-primary">Submit</button>
  </div>
</div>
</main>