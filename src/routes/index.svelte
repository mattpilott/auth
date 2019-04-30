<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>Great success! Well done {firstname}</h1>

<figure>
	<img alt='Borat' src='great-success.png'>
	<figcaption>HIGH FIVE!</figcaption>
</figure>

<button on:click='{logout}'>Logout</button>

<style>
	h1, figure {
		text-align: center;
		margin: 0 auto;
	}
	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}
	figure {
		margin: 0 0 1em 0;
	}
	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}
	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<script context="module">

    export function preload(page, session) {

        const { user } = session;

        return { firstname: user.first_name }
    }
</script>

<script>

    import { goto, getSession } from '@sapper/app';
    import { onMount } from 'svelte';
    import * as api from '../library/api.js';
    import { auth } from '../library/stores.js';

    export let firstname;

    onMount(() => {

        const { user } = getSession();

        auth.get('wp-json/wp/v2/posts', {per_page: 1}).then(r => console.log(r));
    });

    async function logout() {

        await auth.logout();

        goto('/login');
    }
</script>