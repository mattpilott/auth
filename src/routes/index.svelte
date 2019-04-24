<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>Great success! Well done {firstname}</h1>

<figure>
	<img alt='Borat' src='great-success.png'>
	<figcaption>HIGH FIVE!</figcaption>
</figure>

<button on:click='{logout()}'>Logout</button>

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

    import { auth } from './_stores.js';
    import { goto } from '@sapper/app';

    export function preload({ session }) {

        const { user } = auth.get();

        return { firstname: user.first_name }
    }

    function logout() {

        auth.logout().then(() => goto('/login'));
    }
</script>

<script>

    import { onMount } from 'svelte';
    import * as api from './_api.js';

    onMount(() => {

        const { user } = auth.get();

        api.get('wp-json/wp/v2/design/788', user.token).then(r => console.log(r));
    });

    export let firstname;
</script>