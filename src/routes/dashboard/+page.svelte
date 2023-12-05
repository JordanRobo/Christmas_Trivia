<script lang="ts">
  import { onMount } from 'svelte';
  import { playerList, updatePlayerList, lastBuzzedPlayer, setLastBuzzedPlayer, buzzInAccepted, setBuzzInAccepted } from '$lib/playerListStore'; 
  import io from 'socket.io-client';

  let socket: any;

  onMount(() => {
    socket = io('http://localhost:3001'); // Adjust the URL to match your server

    socket.on('playersListUpdate', (data) => {
      updatePlayerList(data);
    });

    socket.on('playerBuzzed', (data) => {
      if ($buzzInAccepted) {
        setLastBuzzedPlayer(data.playerName);
        setBuzzInAccepted(false); // Stop accepting further buzz-ins
      }
    });

    socket.on('resetBuzzIn', () => {
      setBuzzInAccepted(true);
      setLastBuzzedPlayer('');
    });  });

</script>

<div class="text-center">
  <div class="py-4">
    <h1 class="h1">Player Dashboard</h1>
  </div>
  <div class="py-4">
  <ul class="h2">
    {#each Object.entries($playerList) as [playerName, { score }] (playerName)}
      <li>{playerName}: {score}</li>
    {/each}
  </ul>
</div>
<div class="py-4">
<div class="card variant-filled-warning py-4">
  <p class="h4 text-white">Last player buzzed in</p>
  <p class="h4 text-white">
    {#if $lastBuzzedPlayer && !$buzzInAccepted}
      {$lastBuzzedPlayer}
    {/if}
  </p>
</div>
</div>
</div>

