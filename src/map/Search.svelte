<script>
    import FilterSidebar from "./FiltersSidebar.svelte";
    import {construct_svelte_component} from "svelte/internal";

    export let open = false;
    export let mapResult;
    export let startDate;
    export let endDate;
    export let country;
    export let minAttendees = 0;
    export let state;
    export let game;
    export let showShareDialog;
    export let geolocated;

    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    let isMobileDevice = regexp.test(details);

    function handleClick() {
        if (!isMobileDevice) {
            open = !open;
        } else {
            open = !open;
            setTimeout(() => {
                open = !open;
            }, 500);
        }
    }

</script>

<div id="filter-button" style="position: absolute; top: 7em">
    <FilterSidebar bind:geolocated bind:open bind:mapResult bind:startDate bind:endDate bind:country bind:minAttendees bind:state
                   bind:game bind:showShareDialog/>

    <button on:click={() => handleClick()}>Search</button>

    {#if isMobileDevice}
        <script>
            document.getElementById("filter-button").style.top = "9%";
        </script>
    {/if}
</div>


<style>

    button {
        background-color: black;
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin-bottom: 3px;
        border-radius: 20%;
        height: 40px;
        transition: right 0.5s ease-in-out;
    }

    div {
        text-align: left;
        display: flex;
        height: 100%;
    }

    button:hover {
        background-color: #555;
    }

</style>
