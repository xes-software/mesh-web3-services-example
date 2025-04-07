<script lang="ts">
	import { Web3Wallet } from '@meshsdk/web3-sdk';

	let isConnected = $state(false);
	let walletAddress = $state('');
	let isConnecting = $state(false);

	async function connectWallet() {
		try {
			isConnecting = true;

			Web3Wallet.enable({
				appUrl: 'http://localhost:3000',
				projectId: '794b0e0d-4903-4ad8-9be6-0ab139fc2652',
				networkId: 0
			}).then((w) => {
				walletAddress = w.addresses.baseAddress?.toBech32()!;
				isConnected = true;
			});
		} catch (error) {
			console.error('Failed to connect wallet:', error);
		} finally {
			isConnecting = false;
		}
	}

	async function disconnectWallet() {
		try {
			walletAddress = '';
			isConnected = false;
		} catch (error) {
			console.error('Failed to disconnect wallet:', error);
		}
	}
</script>

<div class="container mx-auto p-4">
	<header class="mb-8 flex items-center justify-between">
		<h1 class="text-2xl font-bold">Web3 Demo</h1>

		<button
			onclick={isConnected ? disconnectWallet : connectWallet}
			class="rounded-lg px-4 py-2 font-medium transition-colors duration-200 ease-in-out
				{isConnected
				? 'bg-red-500 text-white hover:bg-red-600'
				: 'bg-blue-500 text-white hover:bg-blue-600'}"
			disabled={isConnecting}
		>
			{#if isConnecting}
				<span>Connecting...</span>
			{:else if isConnected}
				<span
					>Disconnect Wallet ({walletAddress.substring(0, 6)}...{walletAddress.substring(
						walletAddress.length - 4
					)})</span
				>
			{:else}
				<span>Connect Wallet</span>
			{/if}
		</button>
	</header>

	<main>
		<div class="rounded-lg bg-gray-100 p-6 shadow-sm">
			<h2 class="mb-4 text-xl font-semibold">Wallet Status</h2>
			{#if isConnected}
				<p class="font-medium text-green-600">Connected</p>
				<p class="mt-2 break-all">Address: {walletAddress}</p>
			{:else}
				<p class="text-gray-600">Not connected. Click the button above to connect your wallet.</p>
			{/if}
		</div>
	</main>
</div>
