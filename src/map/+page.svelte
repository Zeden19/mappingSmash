<script xmlns="http://www.w3.org/1999/html">
    import Map from "./Map.svelte";
    import Search from "./Search.svelte";
    import Legend from "./Legend.svelte";
    import Help from "./Help.svelte";

    let mapResult;
    export let ready;
    export let startDate;
    export let endDate;
    export let country;
    export let minAttendees = 0;
    export let showShareDialog;
    export let geolocated;

    export let activePage;


</script>

<svelte:head>
    <title>Smash Mapping: Map</title>
</svelte:head>

<body>
<div>
    {#if ready}
        <Map bind:mapResult/>
        <Search bind:geolocated bind:mapResult bind:startDate bind:endDate bind:country bind:minAttendees
                bind:showShareDialog/>
        <Help bind:activePage/>
        <Legend/>
    {/if}

</div>

<footer style="height: 30px; display:block;">
    <p style="text-align: center; color: white">Created by: <a href="https://twitter.com/ZedenZeder">Sleepy</a></p>
</footer>
</body>

<style>

    a {
        color: #999999;
    }

    a:hover {
        color: #cccccc;
    }

    * {
        margin: 0;
        padding: 0;
    }

    div {
        display: flex;
        text-align: center;
        border: gray solid 5px;
        height: 90vh;
        position: relative;
    }

    footer {
        background: #333333;
        height: 5%;
    }

    body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        height: 100%;
    }

    dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
    }
</style>
