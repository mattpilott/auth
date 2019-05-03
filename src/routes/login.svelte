<svelte:head>
	<title>Sign in</title>
</svelte:head>

<h1>Sign In</h1>
<p><a href="/register">Need an account?</a></p>

<ListErrors {errors}/>

<form on:submit|preventDefault='{submit}'>
    <input type="email" placeholder="Email" bind:value={username}>
    <input type="password" placeholder="Password" bind:value={password}>
    <button type="submit" disabled='{!username || !password}'>Sign in</button>
</form>

<script>

	import { goto, stores } from '@sapper/app';
    import { auth } from '../library/stores.js';
    import ListErrors from '../components/ListErrors.svelte';

    const { session } = stores();

    let username = 'hello@matt-pilott.com';
    let password = 'suchincredibletesting19';
    let errors = null;

    async function submit(event) {

        try {

            const response = await auth.login({ username, password });

            if (response.errors) {

                errors = response.errors;
            }

            else {

                $session.user = response;
                
                goto('/');
            }
        }

        catch(response) {

            if (response.error) errors = response.error;
        }
    }
</script>