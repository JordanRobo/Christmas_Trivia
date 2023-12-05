<script lang="ts">
    import { goto } from '$app/navigation';

    function startGame() {
        // Logic to start a new game
        goto('/dashboard');
    }

    function joinGame() {
        // Logic to join an existing game
        goto('/join')
    }

</script>
  
<main>
    <div class="flex justify-center my-4 gap-4">
        <button on:click={startGame} class="btn btn-xl variant-ghost-secondary hover:variant-filled-secondary">Start a New Game</button>
        <button on:click={joinGame} class="btn btn-xl variant-ghost-secondary hover:variant-filled-secondary">Join a Game</button>
    </div> 
</main>
  
  