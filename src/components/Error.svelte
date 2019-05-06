{#if error}

	<div class="error">

        <div class="title">The API returned the following error:</div>

        <div class="message">{error}</div>

    </div>

{/if}

<script>

    export let error;

</script>

<style>

    .error {
        background-color: mediumslateblue;
        border-radius: 6px;
        bottom: 1rem; left: 50%;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        color: white;
        padding: 0.5rem 1rem;
        position: fixed;
        transform: translateX(-50%);
    }

    .title {
        font-size: 0.875rem;
        font-style: italic;
        font-weight: 500;
        opacity: 0.75;
    }

    .message {

    }
</style>