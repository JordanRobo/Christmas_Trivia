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
  
<main class="container">
    <div class="flex flex-col justify-center my-4 gap-4 md:flex-row">
        <div class="self-center">
            <button on:click={startGame} class="btn btn-xl variant-ghost-primary hover:variant-filled-primary">Start a New Game</button>
        </div>
        <div class="self-center">
            <button on:click={joinGame} class="btn btn-xl variant-ghost-primary hover:variant-filled-primary">Join a Game</button>
        </div>
    </div> 
</main>
  
  