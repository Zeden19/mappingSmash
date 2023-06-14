<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">

<script xmlns="http://www.w3.org/1999/html">
    import AboutPage from "./about/+page.svelte";
    import MapPage from "./map/+page.svelte";
    import ContactPage from "./contact/+page.svelte";
    import Mobile from "./mobile/Mobile.svelte";

    export let activePage = 'map';
    export let ready;
    export let startDate = new Date().toISOString().split('T')[0];
    export let endDate;
    export let country;
    export let minAttendees = 0;

    let map_key = process.env.GOOGLE_MAPS_API_KEY;

    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    let isMobileDevice = regexp.test(details);
</script>

<svelte:head>
    <script defer async
            src={`https://maps.googleapis.com/maps/api/js?key=${map_key}&callback=initMap`}>
    </script>
    <script defer src="/_vercel/insights/script.js"></script>
    <title>Smash Mapping: Map</title>
</svelte:head>

<main>
    <nav id="nav">

        {#if !isMobileDevice}
            <h2>Smash Mapping</h2>
        {/if}

        <ul id="navigation">
            <li><a on:click={() => activePage = 'map'} href="#">Home</a></li>
            <li><a on:click={() => activePage = 'about'} href="#">About</a></li>
            <li><a on:click={() => activePage = 'contact'} href="#">Contact</a></li>
        </ul>
    </nav>

    {#if activePage === 'map'}
        <MapPage bind:activePage bind:ready bind:startDate bind:endDate bind:country bind:minAttendees/>
    {:else if activePage === 'about'}
        <AboutPage bind:activePage/>
    {:else if activePage === 'contact'}
        <ContactPage/>
    {/if}
</main>

<style>
    nav a {
        padding: 0 1em;
        text-decoration: none;
        color: black;
        font-family: 'Bebas Neue', sans-serif;
    }

    nav {
        background-color: #444444;
        padding: 10px;
        height: 4%;
        display: flex;
        align-items: center;
    }

    ul {
        list-style-type: none;
        display: flex;
        flex-wrap: nowrap;
        overflow: hidden;
        padding-inline-start: 0;
        justify-content: right;
    }

    li {
        font-size: 1.5em;
        display: inline;
        background: #888888;
        margin-inline: 10px;
        padding: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius: 10px;
    }

    li:hover {
        background-color: #ddd;
    }

    h2 {
        font-family: Impact, serif;
        font-size: 2.3em;
        padding-right: 15%;
        padding-left: 2%;
        margin: 0;
        font-style: italic;
        color: black;
    }

    main {
        margin: 0;
        padding: 0;
        height: 95%;
    }

</style>
