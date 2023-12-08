<script lang="ts">
    import { goto } from '$app/navigation';
    import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
    

    const modalStore = getModalStore();

    const modal: ModalSettings = {
            type: 'component',
            component: 'playerNameModal',
    }

    function host() {
        // Logic to start a new game
        goto('/host');
    }

</script>
  
<main class="container">
    <div class="flex flex-col justify-center my-4 gap-4 md:flex-row">
        <div class="self-center">
            <button on:click={host} class="btn btn-xl variant-ghost-primary hover:variant-filled-primary">Join as Host</button>
        </div>
        <div class="self-center">
            <button on:click={() => modalStore.trigger(modal)} class="btn btn-xl variant-ghost-primary hover:variant-filled-primary">Join as Player</button>
    </div> 
</main>