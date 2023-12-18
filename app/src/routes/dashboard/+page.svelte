<script lang="ts">
  import { onMount } from 'svelte';
  import gameStore from '$lib/gameStore';
  import io from 'socket.io-client';
  import buzzsound from '$lib/bell.mp3'

  let socket: any;

  let players = {};
  let lastBuzzedPlayer: string;
  let buzzInAccepted= true;
  let sortedPlayers: any[];

  const buzzAudio = new Audio(buzzsound);

  const unsubscribe = gameStore.subscribe(state => {
    ({ players, lastBuzzedPlayer, buzzInAccepted } = state as { players: any, lastBuzzedPlayer: string, buzzInAccepted: boolean });
  });

  $: sortedPlayers = Object.entries(players).sort((a, b) => {
    return b[1].score - a[1].score; // Sort in descending order of score
  });

  $: if (lastBuzzedPlayer && !buzzInAccepted) {
    buzzAudio.play();
  }

  onMount(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL); // Adjust the URL to match your server

    socket.on('playersListUpdate', (data: any) => {
      gameStore.updatePlayerList(data);
    });

    socket.on('playerBuzzed', (data: any) => {
      console.log ('Player Buzzed in', data.playerName);
      gameStore.setLastBuzzedPlayer(data.playerName);
      gameStore.setBuzzInAccepted(false); // Stop accepting further buzz-ins
    });

    socket.on('scoreUpdate', (data: any) => {
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

<main class="container text-center p-4">
<div class="">
  <div class="card p-4 variant-soft my-8">
    <h1 class="h1">Player Dashboard</h1>
  </div>
    <table class="table-fixed w-full card variant-soft my-8">
      <thead>
        <tr>
          <th class="card variant-filled-primary w-3/4 text-2xl">Player Name</th>
          <th class="card variant-filled-primary w-1/4 text-2xl">Score</th>
        </tr>
      </thead>
      <tbody>
        {#each sortedPlayers as [playerName, { score }] (playerName)}
        <tr>
          <td class="h1 text-4xl">{playerName}</td>
          <td class="h1 text-4xl">{score}</td>
        </tr>
        {/each}
      </tbody>
    </table>
  <div class="my-8">
    <div class="card variant-ghost-tertiary py-4">
      <p class="p text-2xl">Last player buzzed in</p>
      <p class="p text-4xl">
        {#if lastBuzzedPlayer && !buzzInAccepted}
          {lastBuzzedPlayer}
        {/if}
      </p>
    </div>
  </div>
</div>
</main>