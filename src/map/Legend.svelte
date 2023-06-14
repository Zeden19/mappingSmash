<script>
    import {slide} from 'svelte/transition';

    export let open = false;
    let animating = false;

    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    let isMobileDevice = regexp.test(details);

    function handleClick() {
        if (!isMobileDevice) {
            open = !open;
        } else {
            document.getElementById("legend").showModal();
        }
    }
</script>

<dialog id="legend">
    <p>In Smash Mapping, markers have different<br> colours based on how many attendees are<br> attending.
    </p>
    <p>The markers are:</p>

    <div class="marker">
        <img src="https://maps.google.com/mapfiles/ms/icons/red-dot.png" alt="red-pointer"> Below 50
        attendees
    </div>

    <div class="marker">
        <img src="https://maps.google.com/mapfiles/ms/icons/green-dot.png" alt="green-pointer"> Between 51
        and
        100 attendees
    </div>

    <div class="marker">
        <img src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" alt="blue-pointer"> Between 101
        and
        500 attendees
    </div>

    <div class="marker">
        <img src="https://maps.google.com/mapfiles/ms/icons/purple-dot.png" alt="purple-pointer"> Over 500
        attendees
    </div>

    <p>Additionally, the
        <img alt="yellow-pointer" src="https://maps.google.com/mapfiles/ms/icons/yellow-dot.png">
        marker indicates that<br> this marker was moved slightly because it was<br> on-top of another
        marker.
    </p>

    <button onclick="legend.close()">Close</button>
</dialog>

<div class="entire">
    <button class:selected={open} on:click={() => handleClick()}>Legend</button>
    {#if open}
        <aside class:animating={animating} transition:slide={{delay: 30, duration: 350, axis: 'x'}}>
            <p>In Smash Mapping, markers have different<br> colours based on how many attendees are<br> attending.
            </p>
            <p>The markers are:</p>

            <div class="marker">
                <img src="https://maps.google.com/mapfiles/ms/icons/red-dot.png" alt="red-pointer"> Below 50
                attendees
            </div>

            <div class="marker">
                <img src="https://maps.google.com/mapfiles/ms/icons/green-dot.png" alt="green-pointer"> Between 51
                and
                100 attendees
            </div>

            <div class="marker">
                <img src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" alt="blue-pointer"> Between 101
                and
                500 attendees
            </div>

            <div class="marker">
                <img src="https://maps.google.com/mapfiles/ms/icons/purple-dot.png" alt="purple-pointer"> Over 500
                attendees
            </div>

            <p>Additionally, the
                <img alt="yellow-pointer" src="https://maps.google.com/mapfiles/ms/icons/yellow-dot.png">
                marker indicates that<br> this marker was moved slightly because it was<br> on-top of another
                marker.
            </p>
        </aside>
    {/if}
</div>


<style>

    button {
        background-color: black;
        border: none;
        color: white;
        padding: 10px 20px;
        border-radius: 20%;
        height: 40px;
        margin-top: 2.9em;
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

    .entire {
        text-align: left;
        display: flex;
        position: absolute;
        right: 0.3%;
        top: 14%;
    }

    aside {
        display: block;
        background-color: #f2f2f2;
        font-family: 'Oswald', sans-serif;
        border: black 4px solid;
        padding: 5px 5px 5px 5px;
        white-space: nowrap;
        width: 16em;
    }

    p {
        font-size: 1em;
        margin-top: 5px;
        overflow-x: hidden;
    }

    .selected {
        background-color: #555;
    }

    .selected:hover {
        background-color: black;
    }

    dialog {
        border-radius: 10px;
        border: 5px solid black;
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
