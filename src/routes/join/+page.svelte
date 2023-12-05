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
  
<main>
    <div class="flex justify-center my-4 gap-4">
        <button on:click={host} class="btn btn-xl variant-ghost-secondary hover:variant-filled-secondary">Join as Host</button>
        <button on:click={() => modalStore.trigger(modal)} class="btn btn-xl variant-ghost-secondary hover:variant-filled-secondary">Join as Player</button>
    </div> 
</main>