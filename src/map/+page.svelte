<script xmlns="http://www.w3.org/1999/html">
    import Map from "./Map.svelte";
    import Filter from "./Filter.svelte";
    import Legend from "./Legend.svelte";

    let mapResult;
    export let ready;
    export let startDate;
    export let endDate;
    export let country;
    export let minAttendees = 0;

</script>


<body>
<section>
    <div style="display: flex; text-align: center; border: gray solid 5px; height: 90vh">
        {#if ready}
            <Map bind:mapResult/>
            <Filter bind:mapResult bind:startDate bind:endDate bind:country bind:minAttendees/>
            <Legend/>
        {/if}
    </div>
</section>

<footer style="height: 30px; display:block;">
    <p style="text-align: center">Created by: </p>
</footer>
</body>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    footer {
        background: #444444;
    }

    body {
        overflow: hidden;
    }
</style>
