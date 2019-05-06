<svelte:head>
	<title>Sign in</title>
</svelte:head>

<h1>Sign In</h1>
<p><a href="/login">Remembered your password?</a></p>
<p><a href="/register">Need an account?</a></p>

<Error {error} />

{ #if !reset.key && !reset.login }

    <form on:submit|preventDefault='{requestReset}'>
        <input type="email" placeholder="Email" bind:value={user_login}>
        <button type="submit" disabled='{!user_login}'>Request Reset</button>
    </form>

{ :else }

    <form on:submit|preventDefault='{submitReset}'>
        <input type="password" placeholder="New Password" bind:value={pass1}>
        <input type="password" placeholder="Confirm Password" bind:value={pass2}>
        <button type="submit" disabled='{!pass1 || !pass2}'>Submit Reset</button>
    </form>

{ /if }

<script context="module">

    export async function preload(page) {

        return { reset: page.query }
    }

</script>

<script>

    import * as api from '../library/api.js';
	import { goto } from '@sapper/app';
    import Error from '../components/Error.svelte';

    export let reset = false;

    let user_login = reset.login || 'hello@matt-pilott.com';
    let pass1 = '';
    let pass2 = '';
    let rp_key = reset.key;
    let error = false;

    async function requestReset(event) {

        const response = await api.post('wp-login.php?action=lostpassword', {user_login});

        console.log('requestReset', response);
    }

    async function submitReset(event) {

        const response = await api.post('wp-login.php?action=rp', {user_login, pass1, pass2, rp_key});

        console.log('submitReset', response);
    }
</script>