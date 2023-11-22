<script lang="ts">
    import { goto } from '$app/navigation';

    function host() {
        // Logic to start a new game
        goto('/host');
    }

    function player() {
        // Logic to join an existing game
        goto('/player');
    }
</script>
  
<main>
    <div class="flex justify-center my-4 gap-4">
        <button on:click={host} class="btn btn-xl variant-ghost-secondary hover:variant-filled-secondary">Join as Host</button>
        <button on:click={player} class="btn btn-xl variant-ghost-secondary hover:variant-filled-secondary">Join as Player</button>
    </div> 
</main>