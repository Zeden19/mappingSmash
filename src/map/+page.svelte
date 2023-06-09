<script xmlns="http://www.w3.org/1999/html">
    import Map from "./Map.svelte";
    import Filter from "./Filter.svelte";
    import Legend from "./Legend.svelte";
    import Help from "./Help.svelte";

    let mapResult;
    export let ready;
    export let startDate;
    export let endDate;
    export let country;
    export let minAttendees = 0;
    export let showShareDialog;
</script>



<body>
<div>
    {#if ready}
        <Map bind:mapResult/>
        <Filter bind:mapResult bind:startDate bind:endDate bind:country bind:minAttendees bind:showShareDialog/>
        <Help/>
        <Legend/>
    {/if}
</div>

<footer style="height: 30px; display:block;">
    <p style="text-align: center">Created by: Sleepy </p>
</footer>
</body>

<style>

    * {
        margin: 0;
        padding: 0;
    }

    div {
        display: flex;
        text-align: center;
        border: gray solid 5px;
        height: 90vh;
    }

    footer {
        background: #444444;
    }

    body {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
    }
</style>
