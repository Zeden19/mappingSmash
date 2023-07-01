<script xmlns="http://www.w3.org/1999/html">
    import Map from "./map/Map.svelte";
    import Search from "./map/Search.svelte";
    import Help from "./map/Help.svelte"
    import TournamentsCard from "./map/TournamentsCard.svelte";
    import {slide} from "svelte/transition";
    import {backInOut} from "svelte/easing";

    export let data;
    let mapResult;
    let startDate;
    let endDate;
    let country;
    let minAttendees = 0;
    let state;
    let showShareDialog;
    let geolocated = data.geolocated;

    let sidebarClosed = false;
    let showFilters = true;
    let showTournaments = false;
    let showHelp = false;

    let sidebarTitle = "Filters:";
    let delay;
    let map;

    // database stuff
    let {tournaments} = data;

    function showSidebar(title) {
        sidebarClosed = false;
        showFilters = title === "Filters:";
        showTournaments = title === "Tournaments:";
        showHelp = title === "Help:";
        sidebarTitle = title;

        if (showFilters) {
            delay = 0;
        } else if (showTournaments) {
            delay = 0;
        } else if (showHelp) {
            delay = 0;
        }
    }
</script>
<svelte:head>
    <title>Smash Mapping: Map</title>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width,initial-scale=1'>

    <meta property="og:locale" content="en_US">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@ZedenZeder">

    <meta property="og:site_name" content="Smash Mapping - A New Way to Find Tournaments">
    <meta property="og:title" content="Smash Mapping - A New Way to Find Tournaments">
    <meta name="twitter:title" content="Smash Mapping - A New Way to Find Tournaments">

    <meta name="description" content="Showing where in-person e-sports are held.">
    <meta property="og:description" content="Showing where in-person e-sports are held.">
    <meta name="twitter:description" content="Showing where in-person e-sports are held.">

    <meta property="og:url" content="https://www.smash-mapping.com/">
    <meta property="og:image" content="example.png">
    <meta name="twitter:image" content="example.png">
</svelte:head>

<body>
<div class="map">

    <div class="sidebar-buttons">
        <button class:sidebarSelected="{showFilters}" on:click={() => showSidebar("Filters:")}>
            <img src="filter.png" style="width: 40px; height: 45px" alt="filter-image"></button>

        <button class:sidebarSelected="{showTournaments}" on:click={() =>  showSidebar("Tournaments:")}>
            <img src="tournaments.png" style="width: 40px; height: 45px" alt="tournaments-image"></button>

        <button class:sidebarSelected="{showHelp}" on:click={() =>  showSidebar("Help:")}>
            <img src="questionmark.png" style="width: 40px; height: 40px" alt="tournaments-image"></button>
    </div>

    <div class="sidebar" class:sidebarClosed id="tournaments-sidebar">

        <div class="tournaments-title">
            <p style="margin-left: auto">{sidebarTitle}</p>

            <button class:sidebarClosed class="tournaments-sidebar-close-button"
                    on:click={() => sidebarClosed = !sidebarClosed }
                    style="cursor: pointer">>
            </button>
        </div>


        {#if showTournaments}
            <TournamentsCard mapResult={mapResult} map={map}/>
        {/if}

        {#if showFilters}
            <Search delay={delay} bind:state bind:tournaments bind:data bind:geolocated bind:mapResult bind:startDate bind:endDate
                    bind:country bind:minAttendees bind:showShareDialog/>
        {/if}

        {#if showHelp}
            <Help delay={delay}/>
        {/if}


    </div>

    <Map bind:map bind:data bind:mapResult/>
</div>

<footer style="height: 30px; display:block;">
    <p style="text-align: center; color: white">Created by: <a
            href="https://twitter.com/ZedenZeder">Sleepy</a></p>
</footer>
</body>

<style>
    * {
        margin: 0;
        padding: 0;
        background-color: #26282B;
    }

    footer {
        background: #1c1c1c;
        height: 5vh;
    }

    body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        height: 95vh;
        overflow-y: auto;
    }

    a {
        color: white;
        background: none;
    }

    a:hover {
        color: red;
    }

    .map {
        display: flex;
        flex-flow: row nowrap;
        text-align: center;
        height: 90vh;
        position: relative;
        z-index: 0;
    }

    .sidebar {
        color: white;
        height: 100%;
        overflow-y: auto;
        background-color: #2c343c;
        margin: 0 0 3px;
        transition: margin-left 0.5s ease-in-out;
        z-index: 1;
        border-bottom: #222223 solid 3px;
        border-top: #222223 solid 3px;
    }

    .sidebar-buttons {
        z-index: 2;
        background: #181818;
        width: 3em;
        height: 100%;
        border: #222223 solid 3px;
        border-left: none;
    }

    .sidebar-buttons > button {
        display: block;
        margin-top: 0.5em;
        background: #181818;
        border-bottom: #2b2b31 solid 2px;
        border-top: #2b2b31 solid 2px;
        cursor: pointer;
    }

    .sidebar-buttons button > img {
        display: block;
        background: #181818;
        margin: 4px 0 4px 0;
    }

    .sidebar-buttons img:hover,
    .sidebar-buttons button:hover {
        background: #444446;
    }

    .sidebar-buttons .sidebarSelected img,
    .sidebar-buttons .sidebarSelected {
        background: #c91616;
    }

    .sidebar-buttons .sidebarSelected img:hover,
    .sidebar-buttons .sidebarSelected:hover {
        background: #c91616;
    }

    .tournaments-sidebar-close-button {
        background: none;
        border: none;
        color: white;
        font-size: 1.5em;
        transition: transform 0.5s ease-in-out;
        z-index: 1;
        margin: 2px 2px 2px auto;
        background: #2a2d42;
        border-radius: 80%;
        padding: 0 4px 0 4px;
    }

    .tournaments-sidebar-close-button:hover {
        background: #444446;
    }

    .sidebar.sidebarClosed {
        transition: margin 0.5s ease-in-out;
    }

    .tournaments-title {
        font-size: 1.4em;
        background-color: #130c0c;
        display: flex;
        justify-content: center;
    }

    .tournaments-title > p {
        background-color: #130c0c;
    }

    dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
    }


    /* small screens */
    @media (max-width: 500px) {
        .sidebar {
            width: 80%;
        }

        .sidebar.sidebarClosed {
            margin-left: -66.6%;
        }
    }

    /* large screens */
    @media (min-width: 500px) {
        .sidebar {
            width: 25%;
        }

        .sidebar.sidebarClosed {
            margin-left: -24.5%;
        }
    }
</style>
