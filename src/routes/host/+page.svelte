<script lang="ts">
    import { onMount } from 'svelte';
    let playersBuzzedIn: any[] = [];
    let ws: WebSocket;

    onMount(() => {
        ws = new WebSocket('wss://your-websocket-server.com');
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'playerBuzzed') {
                playersBuzzedIn.push(data.player);
                // Handle player buzz-in logic
            }
            // ... other message handlers
        };
    });

    function handlePlayerBet(player: any) {
        // Logic for handling player bets
    }

    function nextQuestion() {
        // Implement logic to go to the next question
    }

    function nextRound() {
        // Implement logic to go to the next round
    }
</script>

<button on:click={nextQuestion}>Next Question</button>
<button on:click={nextRound}>Next Round</button>

{#each playersBuzzedIn as player}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => handlePlayerBet(player)}>{player}</div>
{/each}
