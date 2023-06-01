<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
<script>
    import {slide} from 'svelte/transition';

    const todayString = new Date().toISOString().split('T')[0];
    export let mapResult;
    export let startDate = todayString;
    export let endDate;
    export let country;
    export let minAttendees = 0;
    let controller;

    let loading = false;
    let errorMessage = false;
    let noData = false;
    let cancelled = false;

    async function updateMap() {
        controller = new AbortController();
        const signal = controller.signal;
        if (startDate === undefined || endDate === undefined) {
            alert("Please select a start and end date");
            return;
        }

        if (startDate > endDate) {
            alert("Start date must be before end date");
            return;
        }

        const requestData = {
            startDate,
            endDate,
            country,
            minAttendees
        };

        try {
            errorMessage = false;
            loading = true;
            noData = false;
            cancelled = false;
            const response = await fetch('/update-map', {
                signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            mapResult = await response.json();
            noData = mapResult.length === 0;

        } catch (error) {
            if (error.name === 'AbortError') {
                cancelled = true;
            } else {
                errorMessage = true;
                console.error('Error:', error);
            }
        }
          loading = false;
    }

    function cancelRequest() {
        if (controller) {
            controller.abort();
        }
    }
</script>
<aside transition:slide={{delay: 30, duration: 350, axis: 'x'}}>
    <label> Start Date:
        <input min={todayString} bind:value={startDate} type="date">
    </label>

    <label> End Date:
        <input min="{startDate}" bind:value={endDate} type="date">
    </label>

    <label>Min Attendees:
        <input type="number" min="0" bind:value={minAttendees}>
    </label>

    <label>Country:
        <select bind:value={country}>
            <option value="CA">Canada</option>
            <option value="US">USA</option>
            <option value="MX">Mexico</option>
            <option value="JP">Japan</option>
        </select>
    </label>


    <button disabled='{loading}' on:click={() => updateMap()}>Apply Filters</button>

    {#if loading}
        <button on:click={() => cancelRequest()}>Cancel</button>
        <p>Loading...</p>
    {/if}

    {#if errorMessage}
        <p style="color: red">There was an error loading the map</p>
    {/if}

    {#if noData}
        <p style="color: red">No tournaments found</p>
    {/if}

    {#if cancelled}
        <p style="color: red">Request cancelled</p>
    {/if}


</aside>


<style>
    aside {
        width: 13em;
        height: 78%;
        overflow: hidden;
        display: block;
        background-color: #f2f2f2;
        font-family: 'Oswald', sans-serif;
        white-space: nowrap;
        border: black 4px solid;
        padding: 5px 50px 5px 5px;
    }

    label {
        display: block;
        margin-bottom: 10px;
    }

    button {
        background-color: black;
        border: none;
        color: white;
        padding: 10px 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 15px;
        margin-top: 5px;
    }

    input {
        font-family: Oswald, sans-serif;
        margin-left: 2px;
        font-size: 14px;

    }

    button:hover {
        background-color: #555;
    }

    button:disabled {
        background-color: grey;
    }
</style>