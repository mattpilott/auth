<svelte:head><title>Sign up</title></svelte:head>

<h1>Sign up</h1>

<p><a href="/login">Have an account?</a></p>

<Error {error} />

<form on:submit|preventDefault="{submit}" enctype="multipart/form-data" bind:this="{formEl}">
    <input type="email" name="email" placeholder="Email" bind:value="{email}">
    <input type="password" name="password" placeholder="Password" bind:value="{password}">
    <button type="submit" disabled='{!email || !password}'>Sign up</button>
</form>

<script>
    import { goto } from '@sapper/app';
    import { auth } from '../library/stores.js';
    import Error from '../components/Error.svelte';

    let formEl;
    let email;
    let password;
    let error = null;

    async function submit(event) {

        const response = await auth.register({ username: email, email, password });

        if (response.code) {

            error = response.message;
        }

        else {

            goto('/login');
        }
    };
</script>