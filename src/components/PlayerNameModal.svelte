<script lang="ts">
    import { onMount } from 'svelte';
    import io from 'socket.io-client';
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { playerName } from '$lib/playerStore'; // Correct the import path
    import { goto } from '$app/navigation';
  
    let localPlayerName = '';
    let socket: any;
  
    const modalStore = getModalStore();
  
    onMount(() => {
      socket = io('http://localhost:3001'); // Adjust the URL to match your server
    });
  
    function submitPlayerInfo() {
      if (localPlayerName.trim() !== '') {
        playerName.set(localPlayerName); // Update the store
        socket.emit('playerJoined', { playerName: localPlayerName }); // Emit event
        modalStore.close();
        goto('/player');
      } else {
        // Optionally, show an error message
      }
    }
  </script>
  

<div class="card p-6 variant-soft-surface">
    <div class="my-4 text-center">
        <h2 class="h2 my-6">Enter Your Details</h2>
        <input class="input" type="text" bind:value={localPlayerName} placeholder="Your Name"/>
    </div>
    <div class="my-4 text-center">
        <button on:click={submitPlayerInfo} class="btn btn-xl variant-ghost-success hover:variant-filled-success">Submit</button>
    </div>
</div>
