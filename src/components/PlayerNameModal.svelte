<script lang="ts">
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { playerName } from '$lib/playerStore'; // Correct the import path

    let localPlayerName = ''; // Use a local variable to handle input
    export let icons: string[] = ['🚀', '🎩', '🐱', '🌟', '🎄', '🎶'];

    const modalStore = getModalStore();

    function selectIcon(icon: string) {
        localPlayerName += icon;
    }

    function submitPlayerInfo() {
        if (localPlayerName.trim() !== '') {
            playerName.set(localPlayerName); // Update the store
            modalStore.close();
        } else {
            // Optionally, show an error message
        }
    }
</script>

<div class="card p-6 variant-soft-surface">
    <div class="my-4 text-center">
        <h2 class="h2 my-6">Enter Your Details</h2>
        <input class="input" type="text" bind:value={playerName} placeholder="Your Name"/>
    </div>
    <div class="icon-selection btn-group variant-filled-primary my-2">
        {#each icons as icon}
            <button on:click={() => playerName += icon}>{icon}</button>
        {/each}
    </div>
    <div class="my-4 text-center">
        <button on:click={submitPlayerInfo} class="btn btn-xl variant-ghost-success hover:variant-filled-success">Submit</button>
    </div>
</div>
