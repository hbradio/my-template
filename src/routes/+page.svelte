<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	async function createStripeCheckout() {
		const res = await fetch('/api/v1/stripe/checkout-session', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
		});
	}

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>

	<div>
		<h1>My Notes</h1>
		<a href="/p">New note</a>
		<main>
			<div>
				{#each data.feed as post (post.id)}
					<Post {post} />
				{/each}
			</div>
		</main>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
