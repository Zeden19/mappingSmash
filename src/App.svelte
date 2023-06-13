<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">

<script xmlns="http://www.w3.org/1999/html">
    import AboutPage from "./about/+page.svelte";
    import MapPage from "./map/+page.svelte";
    import ContactPage from "./contact/+page.svelte";

    export let activePage = 'map';
    export let ready;
    export let startDate = new Date().toISOString().split('T')[0];
    export let endDate;
    export let country;
    export let minAttendees = 0;

    let map_key = process.env.GOOGLE_MAPS_API_KEY;
</script>

<svelte:head>
    <script defer async
            src={`https://maps.googleapis.com/maps/api/js?key=${map_key}&callback=initMap`}>
    </script>
    <title>Smash Mapping: Map</title>
    <meta property="og:locale" content="en_US">
    <meta property="og:type" content="website">

    <meta property="og:site_name" content="Smash Mapping">
    <meta property="og:title" content="Smash Mapping">
    <meta property="twitter:title" content="Smash Mapping">

    <meta name="description" content="A map that shows where Super Smash Bros. E-sports tournaments are being held.">
    <meta property="og:description" content="A map that shows where Super Smash Bros. E-sports tournaments are being held.">
    <meta property="twitter:description" content="A map that shows where Super Smash Bros. E-sports tournaments are being held.">

    <meta property="og:url" content="https://www.smash-mapping.com/">
    <meta property="og:image" content="example-image.png">
    <meta property="twitter:image" content="example-image.png">
</svelte:head>

<main>
    <nav>
        <ul>
            <li><a on:click={() => activePage = 'map'} href="#">Home</a></li>
            <li><a on:click={() => activePage = 'about'} href="#">About</a></li>
            <li><a on:click={() => activePage = 'contact'} href="#">Contact</a></li>
        </ul>
        <h2>Smash Mapping</h2>
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
        display: inline-block;
        padding: 0 1em;
        text-decoration: none;
        color: black;
        font-family: 'Bebas Neue', sans-serif;
    }

    nav {
        background-color: #444444;
        padding: 10px;
        height: 4%;
    }

    ul {
        list-style-type: none;
        display: inline;
    }

    li {
        font-size: 1.5em;
        display: inline;
        background: #888888;
        margin-inline: 10px;
        padding: 2px;
    }

    li:last-child {
        margin-right: 200px;
    }

    li:hover {
        background-color: #ddd;
    }

    h2 {
        position: absolute;
        display: inline-block;
        font-family: Impact, serif;
        font-size: 2.3em;
        margin: 0;
        padding: 0;
        font-style: italic;
        text-align: center;
        top: 2px;
        color: black;
    }

    main {
        margin: 0;
        padding: 0;
        height: 95%;
    }

</style>
