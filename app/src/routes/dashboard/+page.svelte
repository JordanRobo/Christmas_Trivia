<script lang="ts">
  import { onMount } from 'svelte';
  import gameStore from '$lib/gameStore';
  import io from 'socket.io-client';

  let socket: any;

  let players = {};
  let lastBuzzedPlayer: string;
  let buzzInAccepted = true;
  let sortedPlayers = [];

  const unsubscribe = gameStore.subscribe(state => {
    ({ players, lastBuzzedPlayer, buzzInAccepted } = state);
  });

  $: sortedPlayers = Object.entries(players).sort((a, b) => {
    // Assuming each entry is of the form [playerName, { score }]
    return b[1].score - a[1].score; // Sort in descending order of score
  });

  onMount(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL); // Adjust the URL to match your server

    socket.on('playersListUpdate', (data) => {
      gameStore.updatePlayerList(data);
    });

    socket.on('playerBuzzed', (data) => {
      console.log ('Player Buzzed in', data.playerName);
      gameStore.setLastBuzzedPlayer(data.playerName);
      gameStore.setBuzzInAccepted(false); // Stop accepting further buzz-ins
    });

    socket.on('scoreUpdate', (data) => {
    // Verify if this part is being executed
    console.log('Score update received on dashboard:', data);
    gameStore.updatePlayerScore(data.playerName, data.newScore);
    });

    socket.on('resetBuzzIn', () => {
      gameStore.setBuzzInAccepted(true);
      gameStore.setLastBuzzedPlayer('');
    });

    return () => {
      unsubscribe(); // Clean up the subscription when the component is destroyed
    };
  });
</script>

<div class="text-center">
  <div class="py-4">
    <h1 class="h1">Player Dashboard</h1>
  </div>
  <div class="py-4">
    <ul class="p text-4xl">
      {#each sortedPlayers as [playerName, { score }] (playerName)}
      <li>{score} - {playerName}</li>
    {/each}
    </ul>
  </div>
  <div class="py-4">
    <div class="card variant-ghost-tertiary py-4">
      <p class="p text-2xl text-white">Last player buzzed in</p>
      <p class="p text-4xl text-white">
        {#if lastBuzzedPlayer && !buzzInAccepted}
          {lastBuzzedPlayer}
        {/if}
      </p>
    </div>
  </div>
</div>