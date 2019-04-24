<svelte:head><title>Sign up</title></svelte:head>

<h1>Sign up</h1>

<p><a href="/login">Have an account?</a></p>

<ListErrors {errors} />

<form on:submit|preventDefault="{submit}" enctype="multipart/form-data" bind:this="{formEl}">

    <input type="email" name="email" placeholder="Email" bind:value="{email}">
    <input type="password" name="password" placeholder="Password" bind:value="{password}">
    <input type="file" name="avatar" bind:this="{avatarEl}">
    <button type="submit" disabled='{!email || !password}'>Sign up</button>
</form>

<script>
    import { goto } from '@sapper/app';
    import { auth } from './_stores.js';
    import ListErrors from '../components/ListErrors.svelte';

    export let formEl;
    export let avatarEl;
    export let email = 'hello@matt-pilott.com';
    export let password = 'password';
    export let errors = null;

    function submit(event) {
        
        const form = new FormData(formEl);
        auth.register({ form })
            .then(response => {

                console.log(response);
                // if (response.errors) {
                //     errors = response.errors;
                // }
                // else {
                //     goto('/login');
                // }
            })
            .catch(response => {
                if (response.errors) errors = response.errors;
            });
    };
</script>