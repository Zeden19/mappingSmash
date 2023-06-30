<script>
    import {fly} from 'svelte/transition';
    import {slide} from "svelte/transition";
    import {onMount} from "svelte";

    let guideOpen = false;
    let legendOpen = false;
    export let delay;

</script>

<div in:fly={{y: 150, duration: 400, delay: 400}} out:fly={{y: 100, duration: 400}}>
    <div on:click={() => guideOpen = !guideOpen} class="title">
        <div class:guideOpen class="arrow-right"></div>
        Guide
    </div>

    {#if guideOpen}
        <p transition:slide={{y: 200, duration: 500}} class="content">

            To use, click the filter icon on the sidebar to the left. <br><br>

            Select a start and end date, and any other filters
            and click "search". All the tournaments will be shown on the map. <br><br>

            Clicking on a marker will show all the tournament information. Additonally, clicking on the tournmanet
            icon on the sidebar will show you a list view of the tournaments. You can click on the tournament to pan
            the camera to that tournament.<br><br>


            Found a bug? <a style="cursor: pointer" href="/contact">Contact</a> me
        </p>
    {/if}

    <div on:click={() => legendOpen = !legendOpen} class="title">
        <div class:legendOpen class="arrow-right"></div>
        Legend
    </div>

    {#if legendOpen}
        <aside transition:slide={{y: 200, duration: 500}} class="content">
            <p>In Smash Mapping, marker colours mean different things.</p>

            <p>The markers and their meanings are:</p>

            <div class="marker">
                <img src="markers/red-marker.png" alt="red-pointer"> Below 50
                attendees
            </div>

            <div class="marker">
                <img src="markers/green-marker.png" alt="green-pointer"> Between 51
                and
                100 attendees
            </div>

            <div class="marker">
                <img src="markers/blue-marker.png" alt="blue-pointer"> Between 101
                and
                500 attendees
            </div>

            <div class="marker">
                <img src="markers/purple-marker.png" alt="purple-pointer"> Over 500
                attendees
            </div>

             <div class="marker">
                <img src="markers/yellow-marker.png" alt="yellow-pointer">
                 Another marker is on top of this one
            </div>

             <div class="marker">
                <img src="markers/grey-marker.png" alt="grey-pointer"> Tournament has ended
            </div>
        </aside>
    {/if}
</div>


<style>
    div {
        text-align: left;
        display: block;
    }

    img {
        margin-right: 1em;
    }

    .content {
        margin: 0 5px 5px 5px;
        background: #420000;
        padding: 5px;
        box-shadow: 0 0 1px black;
        border: black solid 1px;
    }

    .marker {
        display: flex;
        align-items: center;
        font-size: 1.05em;
        margin-bottom: 5px;
        font-family: "Kanit", serif;
    }

    p {
        margin-block-start: 0;
    }

    .title {
        font-family: "Bebas Neue", serif;
        text-align: center;
        font-size: 2.5em;
        color: white;
        margin: 5px 5px 0 5px;
        background: maroon;
        box-shadow: 0 0 6px black;
        align-items: center;

    }

    .title > * {
        margin: auto;
        display: inline-block;
    }

    .arrow-right {
        width: 0;
        height: 0;
        border-top: 12px solid transparent;
        border-bottom: 12px solid transparent;
        border-left: 12px solid black;
        transition: rotate 0.15s ease;
        transform: rotate(0);
    }

    .arrow-right.guideOpen,
    .arrow-right.legendOpen {
        transform: rotate(90deg);
    }


</style>