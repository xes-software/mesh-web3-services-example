<script lang="ts">
	import { Web3Wallet } from '@meshsdk/web3-sdk';

	let isConnected = $state(false);
	let walletAddress = $state('');
	let isConnecting = $state(false);
	let wallet = $state<Web3Wallet | undefined>();

	async function connectWallet() {
		try {
			isConnecting = true;

			Web3Wallet.enable({
				appUrl: 'http://localhost:3000',
				projectId: 'c5da4bcd-f393-44cb-a2b3-776af14a3052',
				networkId: 0
			}).then((w) => {
				wallet = w;
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

	async function signData() {
		try {
			if (wallet) {
				const sig = await wallet.signData('stuff');
				console.log('Signature:', sig);
			}
		} catch (e) {
			console.error('Failed to sign data:', e);
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
				<button onclick={() => signData()}>Sign Data: "Stuff"</button>
			{:else}
				<p class="text-gray-600">Not connected. Click the button above to connect your wallet.</p>
			{/if}
		</div>
	</main>
</div>
