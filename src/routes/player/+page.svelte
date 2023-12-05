<script lang="ts">
    import { playerName, playerScore } from '$lib/playerStore'; // Adjust the import path as necessary
    import { onMount } from 'svelte';
    import io from 'socket.io-client';
  
    let name = '';
    let score = 100;
    let socket: any;
  
    onMount(() => {
      playerName.subscribe(value => {
        name = value;
      });
  
      playerScore.subscribe(value => {
        score = value;
      });
  
      // Initialize WebSocket connection
      socket = io('http://localhost:3001'); // Adjust the URL to match your server
  
      // Optional: Handle any socket events, if necessary
    });
  
    function buzzIn() {
      if (name) {
        console.log(`${name} buzzed in!`);
        // Emit the buzz-in event to the server
        socket.emit('buzzIn', { playerName: name });
      }
    }
  </script>
  
  

<div class="flex justify-center my-8">
    <div class="flex-col text-center">
        <div class="py-4"><h2 class="h2">{name}</h2></div>
        <div class="py-4"><h1 class="h1">Score: {score}</h1></div>
        <div class="py-4">
            <button on:click={buzzIn} class="btn btn-xl variant-ghost-error hover:variant-filled-error">Buzz In</button>
        </div>
    </div>
</div>