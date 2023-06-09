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
    export let state;
    export let game;

    let controller;
    let hasSearched = false;
    export let showShareDialog = false;

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

        if (!hasSearched) {
            showShareDialog = true;
        }

        const requestData = {
            startDate,
            endDate,
            country,
            minAttendees,
            game
        };

        if (country === 'US' && state !== "all") {
            requestData.state = state;
        }

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
        hasSearched = true;
    }

    function cancelRequest() {
        if (controller) {
            controller.abort();
        }
    }
</script>

{#if showShareDialog}
    <script>
        const share_dialog = document.getElementById('share_dialog');
        share_dialog.showModal();
    </script>
{/if}

<dialog id="share_dialog">
    <p>apiodjoa</p>
    <button onclick="share_dialog.close()">Close</button>
</dialog>

<aside transition:slide={{delay: 30, duration: 350, axis: 'x'}}>
    <h2 style="font-style: italic">Filters</h2>
    <label> Game:
        <select bind:value={game}>
            <option value="1386">Ultimate</option>
            <option value="1">Melee</option>
            <option value="1 1386">Both</option>
        </select>
    </label>

    <label>Country:
        <select bind:value={country}>
            <option value="CA">Canada</option>
            <option value="US">USA</option>
            <option value="MX">Mexico</option>
            <option value="JP">Japan</option>
        </select>
    </label>

    {#if country === 'US'}
        <label>State:
            <select bind:value={state}>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
                <option value="all">All</option>
            </select>
        </label>
    {/if}

    <label> From:
        <input min={todayString} bind:value={startDate} type="date">
    </label>

    <label> To:
        <input min="{startDate}" bind:value={endDate} type="date">
    </label>

    <label>Min Attendees:
        <input type="number" min="0" bind:value={minAttendees}>
    </label>


    <button disabled='{loading}' on:click={() => updateMap()}>Search</button>

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

    h2 {
        margin: 10px 0 10px 0;
        text-decoration: underline;
    }

</style>