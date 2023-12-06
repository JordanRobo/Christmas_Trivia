<script lang="ts">
  import { onMount } from 'svelte';
  import gameStore from '$lib/gameStore';
  import io from 'socket.io-client';

  let socket: any;

  let players = {};
  let lastBuzzedPlayer: string;
  let buzzInAccepted = true;

  const unsubscribe = gameStore.subscribe(state => {
    ({ players, lastBuzzedPlayer, buzzInAccepted } = state);
  });

  onMount(() => {
    socket = io('http://localhost:3001'); // Adjust the URL to match your server

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
    <ul class="h2">
      {#each Object.entries(players) as [playerName, { score }] (playerName)}
        <li>{playerName}: {score}</li>
      {/each}
    </ul>
  </div>
  <div class="py-4">
    <div class="card variant-filled-warning py-4">
      <p class="h4 text-white">Last player buzzed in</p>
      <h2 class="h2 text-white">
        {#if lastBuzzedPlayer && !buzzInAccepted}
          {lastBuzzedPlayer}
        {/if}
      </h2>
    </div>
  </div>
</div>