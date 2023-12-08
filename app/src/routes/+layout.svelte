<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { Modal, getModalStore, initializeStores } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import PlayerNameModal from '../components/PlayerNameModal.svelte';

	initializeStores();

	const modalRegistry = {
        playerNameModal: { ref: PlayerNameModal },
        // other modals...
    };
</script>

<Modal components={modalRegistry} />
<AppShell>
	<svelte:fragment slot="header"><h1 class="h1 text-center my-8">🎄 Christmas Trivia App 🎄</h1></svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<svelte:fragment slot="pageHeader"></svelte:fragment>
	<!-- Router Slot -->
	<div class="container mx-auto"> 
		<slot />
	</div>
	
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter"></svelte:fragment>
	<!-- (footer) -->
</AppShell>
