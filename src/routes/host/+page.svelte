<script lang="ts">
    import { onMount } from 'svelte';
    import io from 'socket.io-client';
  
    let socket: any;
  
    onMount(() => {
      socket = io('http://localhost:3001'); // Adjust the URL to match your server
    });
  
    function nextQuestion() {
      socket.emit('nextQuestion');
    }
  </script>
  
  <div class="flex justify-center my-8">
    <div class="flex-col text-center">
    <button on:click={nextQuestion} class="btn btn-xl variant-ghost-error hover:variant-filled-error">
      Next Question
    </button>
  </div>
</div>