<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { Modal, getModalStore, initializeStores } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import PlayerNameModal from '../components/PlayerNameModal.svelte';
	import logo from '../lib/site_logo.png';

	initializeStores();

	const modalRegistry = {
        playerNameModal: { ref: PlayerNameModal },
        // other modals...
    };
</script>

<Modal components={modalRegistry} />
<AppShell>
	<svelte:fragment slot="header">
		<div class="w-screen flex flex-row justify-center">
			<img src={logo} alt="Robinson Christmas Trivia" width="" class="w-1/6">
		</div>
	</svelte:fragment>
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
