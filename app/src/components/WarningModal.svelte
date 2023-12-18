<script lang="ts">
    import { onMount } from 'svelte';
    import gameStore from '$lib/gameStore';
    import io from 'socket.io-client';
    import { getModalStore } from '@skeletonlabs/skeleton';

    let socket: any;

    const modalStore = getModalStore();

    onMount(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL); // Adjust the URL to match your server
    });

    function resetGame() {
        socket.emit('resetGame');
        modalStore.close();
    }
</script>


<main class="card p-8 alert variant-filled-warning">
    <!-- Icon -->
    <div>
        <span class="material-symbols-outlined">
        warning</span>
    </div>
    <!-- Message -->
    <div class="alert-message">
        <h3 class="h3">Reset the current game</h3>
        <p>Are you sure you want to reset the game?</p>
    </div>
    <!-- Actions -->
    <div class="alert-actions">
        <button class="btn btn-sm variant-outline-primary hover:variant-filled-primary" on:click={resetGame}>Yes, Reset Game</button>
        <button class="btn btn-sm variant-outline-primary hover:variant-filled-primary" on:click={() => modalStore.close()}>No, Cancel</button>
    </div>
</main>
        