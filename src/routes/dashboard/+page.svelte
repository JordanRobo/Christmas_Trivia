<script lang="ts">
  import { onMount } from 'svelte';
  let currentRound = 1;
  let currentQuestion = 1;
  let scores = {}; // Player scores

  let ws: WebSocket;

  onMount(() => {
        ws = new WebSocket('wss://your-websocket-server.com');
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'updateScores') {
                scores = data.scores; // Update scores
            }
            // ... other message handlers
        };
    });
</script>

<h1>Round {currentRound}, Question {currentQuestion}</h1>
<table>
  {#each Object.entries(scores) as [player, score]}
      <tr>
          <td>{player}</td>
          <td>{score}</td>
      </tr>
  {/each}
</table>
