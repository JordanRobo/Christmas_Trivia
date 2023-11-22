<script lang="ts">
    import { onMount } from 'svelte';
    import { playerName } from '$lib/playerStore'; // adjust the path as necessary
    import { getModalStore } from '@skeletonlabs/skeleton';

    let score = 0;
    let ws: WebSocket;

    const modalStore = getModalStore();


    onMount(() => {
        ws = new WebSocket('wss://your-websocket-server.com');
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'updateScore' && data.player === playerName) {
                score = data.newScore;
            }
            // ... other message handlers
        };

        // Trigger the modal when the page loads
        modalStore.trigger({
            type: 'component',
            component: 'playerNameModal', // the key used in the modal registry
        });
    });

    function buzzIn() {
        ws.send(JSON.stringify({ action: 'buzz', player: playerName }));
    }

</script>

<div class="flex justify-center my-8">
    <div>
        <h2 class="h2">{$playerName} - Score: {score}</h2>
    </div>
    <div>
        <button on:click={buzzIn} class="btn btn-xl variant-ghost-error hover:variant-filled-error">Buzz In</button>
    </div>
</div>