<script>
    import {slide} from "svelte/transition";

    export let mapResult;
    export let map;
    let search = "";

    function setMapCentre(lat, lng) {
        map.panTo({lat: lat, lng: lng});
        map.setZoom(10);
    }
</script>

{#if mapResult !== undefined}

    <div out:slide={{y: 200, duration: 500}}
             in:slide={{y: 200, duration: 700}} class="search">
        <input bind:value={search} type="text" placeholder="Search tournament"/>
    </div>

    {#each mapResult.filter(tournament =>
        tournament.name.toLowerCase().includes(search.trimStart().toLowerCase())
        || tournament.venueAddress.toLowerCase().includes(search.trimStart().toLowerCase()))
            as tournament}

        <!--Tournament card-->
        <div out:slide={{y: 200, duration: 500}}
             in:slide={{y: 200, duration: 700}}
             on:click={() => setMapCentre(tournament.lat, tournament.lng)}
             class="tournament">

            <a href={tournament.url} target="_blank">{tournament.name}</a>

            <p class="address">
                <img width="30px" height="30px" src="tournament-card-icons/map-marker.png" alt="map-marker">
                {tournament.venueAddress}
            </p>


            <div class="attendees-clock">
                <p class="attendees">
                    <img width="30px" height="30px" src="tournament-card-icons/people.png" alt="people">
                    {tournament.numAttendees}
                </p>

                <p class="clock">
                    <img width="30px" height="30px" src="tournament-card-icons/clock.png" alt="clock">
                    {tournament.startAt}
                </p>
            </div>

        </div>
    {/each}
{/if}


<style>

    a {
        background: none;
        color: white;
        text-align: left;
        background: black;
        padding: 4px;
    }

    a:hover {
        color: #ff0000;
    }

    p {
        margin-block-start: 0.5em;
        margin-block-end: 0.3em;
    }

    .search {
        margin: 5px;
        padding: 5px;
        display: grid;
    }

    .tournament {
        cursor: pointer;
        background: #1c1c1c;
        border: #2c343c solid 2px;
        margin: 5px;
        padding: 5px;
        display: grid;
    }

    .address, .attendees, .clock {
        display: flex;
        align-items: center;
        text-align: left;
        font-size: 1em;
        overflow-wrap: break-word;
    }

    .attendees {
        margin-right: 3em;
    }

    .attendees-clock {
        display: flex;
    }

    img {
        margin-right: 4px;
    }
</style>