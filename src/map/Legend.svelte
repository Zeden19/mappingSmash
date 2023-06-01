<script>
    import {slide} from 'svelte/transition';

    export let open = false;
    let animating = false;



</script>

<div class="entire">
    <button on:click={() => open = !open}>Legend</button>
    {#if open}
        <aside class:animating={animating} transition:slide={{delay: 30, duration: 350, axis: 'x'}}>
            <p>In Smash Mapping, markers have different<br> colours based on how many attendees are<br> attending.</p>
            <p>The markers are:</p>

            <div class="marker">
                <img src="https://maps.google.com/mapfiles/ms/icons/red-dot.png" alt="red-pointer"> Below 50 attendees
            </div>

            <div class="marker">
                <img src="https://maps.google.com/mapfiles/ms/icons/green-dot.png" alt="green-pointer"> Between 51 and 100 attendees
            </div>

            <div class="marker">
                <img src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" alt="blue-pointer"> Between 101 and 500 attendees
            </div>

            <div class="marker">
                <img src="https://maps.google.com/mapfiles/ms/icons/purple-dot.png" alt="purple-pointer"> Over 500 attendees
            </div>

            <p>Additionally, the
                <img alt="yellow-pointer" src="https://maps.google.com/mapfiles/ms/icons/yellow-dot.png">
                marker indicates that<br> this marker was moved slightly because it was<br> on-top of another marker.</p>
        </aside>
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

    }

    .entire {
        text-align: left;
        display: flex;
        position: absolute;
        right: 0.3%;
        top: 8%;
    }

    .marker {
        display: flex;
        align-items: center;
        white-space: nowrap;
        font-size: 1.05em;
        margin-bottom: 5px;
    }

    button:hover {
        background-color: #555;
    }


    aside {
        width: 17em;
        display: block;
        background-color: #f2f2f2;
        font-family: 'Oswald', sans-serif;
        border: black 4px solid;
        padding: 5px 5px 5px 5px;
        white-space: nowrap;

    }

    p {
        font-size: 1em;
        margin-top: 5px;
        overflow-x: hidden;
    }

</style>
