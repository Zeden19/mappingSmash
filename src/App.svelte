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

    function getCookie(name) {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ');

        for (let i = 0; i < cookies.length; i++) {
            const [cookieName, cookieValue] = cookies[i].split('=');

            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    }

    let geolocated;
    if (document.cookie.indexOf("geolocated") === -1) {
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        document.cookie = "geolocated=0; expires=" + midnight.toString() + "; path=/";
    }

    geolocated = getCookie("geolocated");
    if (document.cookie.indexOf("hasShownLimitInfo") === -1) {
        document.cookie = "hasShownLimitInfo=false; path=/";
    }
    console.log(document.cookie);
</script>

<dialog id="important_notice">
    <h3>Important Notice:</h3>

    <p>Smash Mapping has unfortunately started to procure expensive costs due to inefficient geolocating code.
        Therefore, <b>there is a temporary limit of 300 tournament requests per day per user</b>.

        To reduce tournament requests set the attendees filter to above 0, this will reduce the number of
        tournaments.
        The number of tournaments you have searched will be displayed at the top right of the screen.
    </p>

    <button onclick="important_notice.close()">Close</button>
</dialog>


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
            <li><a on:click={() => activePage = 'map'} href="#map">Home</a></li>
            <li><a on:click={() => activePage = 'about'} href="#about">About</a></li>
            <li><a on:click={() => activePage = 'contact'} href="#contact">Contact</a></li>
        </ul>

        <p style="color: white">{geolocated}</p>
    </nav>

    {#if activePage === 'map'}
        <MapPage bind:geolocated bind:isMobileDevice bind:activePage bind:ready bind:startDate bind:endDate bind:country
                 bind:minAttendees/>
    {:else if activePage === 'about'}
        <AboutPage bind:activePage/>
    {:else if activePage === 'contact'}
        <ContactPage/>
    {/if}

    {#if (getCookie('hasShownLimitInfo') === 'false')}
        <script>
            document.getElementById("important_notice").showModal();
            document.cookie = "hasShownLimitInfo=true; path=/";
        </script>
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

    dialog {
        border-radius: 10px;
        border: 5px solid black;
        width: 60%;
        height: fit-content(100%);
    }

    dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
    }

    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes zoom {
        from {
            transform: scale(0.5);
        }
        to {
            transform: scale(1);
        }
    }

    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }

    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

</style>
