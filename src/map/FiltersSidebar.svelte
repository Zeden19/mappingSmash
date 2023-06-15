<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8">
    import {slide} from 'svelte/transition';
    import TwitterShare from './TwitterShare.svelte';
    import {GraphQLClient} from 'graphql-request';
    import InfoCircle from "./InfoCircle.svelte";

    export let mapResult;

    let todayString = new Date();
    todayString.setDate(todayString.getDate() - 14);
    todayString = todayString.toISOString().split("T")[0];
    export let startDate = new Date();


    export let endDate;
    export let country;
    export let minAttendees = 0;
    export let state;
    export let game;
    export let open;

    export let showShareDialog = false;
    let showWarningDialog = false;
    let loading = false;
    let errorMessage = false;
    let noData = false;
    let cancelled = false;
    let hasSearched = false;

    let GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    let SMASH_GG_API_KEY = process.env.SMASH_GG_API_KEY;
    let geolocator = new google.maps.Geocoder();

    const EST_OFFSET = -5 * 60;

    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    let isMobileDevice = regexp.test(details);
    let req = new XMLHttpRequest();


    async function geocode_address(tournament) {
        req.onreadystatechange = () => {
            if (req.readyState === XMLHttpRequest.DONE) {
                console.log(req.responseText);
            }
        };

        req.open("PUT", "https://api.jsonbin.io/v3/b/648a8742b89b1e2299af4791", true);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("X-Master-Key", "$2b$10$uU73GSMbQOXVue88E/EptOjk72Ez1GNmeShvCcCvPvmpNWYwDUtZy");
        req.send(JSON.stringify(tournament));

        return geolocator.geocode({'address': tournament.venueAddress}, function (results, status) {
            if (status === 'OK') {
                console.log(tournament.venueAddress);
                return results[0].geometry.location;
            } else {
                console.log(status);
                return undefined;
            }
        });
    }

    let abortController;

    // I think im going to hell for this function
    async function updateMap() {
        abortController = new AbortController();
        let signal = abortController.signal;

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

        try {
            errorMessage = false;
            loading = true;
            noData = false;
            cancelled = false;
            showWarningDialog = false;

            if (minAttendees === undefined) {
                minAttendees = 0;
            }

            let tournaments = [];
            let unixStartTime = new Date(startDate.replace(/-/g, "/").replace("T", " "));
            let unixEndTime = new Date(endDate.replace(/-/g, "/").replace("T", " "));
            unixEndTime.setHours(23, 59, 59);
            unixStartTime = Math.floor(unixStartTime.getTime() / 1000);
            unixEndTime = Math.floor(unixEndTime.getTime() / 1000);

            let gameSelections = game.split(" ");

            const apiVersion = 'alpha';
            const endpoint = 'https://api.start.gg/gql/' + apiVersion;
            const client = new GraphQLClient(endpoint, {
                headers: {
                    Authorization: 'Bearer ' + SMASH_GG_API_KEY,
                },
            });

            let query = `
            query TournamentsByCountry($cCode: String!, $perPage: Int!, $after: Timestamp!, $before: Timestamp, $state: String
            $game: [ID]) {
              tournaments(query: {
                perPage: $perPage
                filter: {
                  countryCode: $cCode
                  afterDate: $after
                  beforeDate: $before
                  videogameIds: $game
                  addrState: $state
                }
              }) {
                nodes {
                  name
                  venueAddress
                  startAt
                  primaryContact
                  url
                  numAttendees
                  state
                }
              }
            }`;

            const variables = {
                cCode: country,
                perPage: 51,
                after: unixStartTime,
                before: unixEndTime,
                state: state,
                game: gameSelections
            };

            if (state === "all" || country !== "US") {
                delete variables.state;
                query = query.replace(/addrState: \$state,?/, "").replace(", $state: String", "");
            }

            // idk how this works, but adding await here fixed most of my problems
            if (signal.aborted) {
                return;
            }
            let resData = await client.request(query, variables);
            let locations = [];

            tournaments = resData.tournaments.nodes;

            for (let i of resData.tournaments.nodes) {
                const timestamp = i.startAt;
                const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
                i.startAt = date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                });
            }

            tournaments = tournaments.filter(function (tournament) {
                return minAttendees <= tournament['numAttendees'];
            });

            if (tournaments.length === 0) {
                noData = true;
                loading = false;
                return;
            }

            if (tournaments.length > 50) {
                showWarningDialog = true;
                loading = false;
                return;
            }

            if (minAttendees !== 0) {
                tournaments = tournaments.filter(item => item.numAttendees !== null && item.numAttendees !== undefined);
            } else {
                tournaments = tournaments.map(item => {
                    if (item.numAttendees === null || item.numAttendees === undefined) {
                        item.numAttendees = "unknown";
                    }
                    return item;
                });
            }

            for (let i of tournaments) {
                let latlng;

                if (cancelled) {
                    return;
                }

                try {
                    latlng = await geocode_address(i);

                } catch (e) {
                    console.log(e);
                    continue;
                }

                latlng = latlng.results[0].geometry.location;
                let url = "https://start.gg" + i.url;

                if (latlng !== undefined) {
                    locations.push(
                        [i.name,
                            latlng.lat(),
                            latlng.lng(),
                            i.primaryContact,
                            i.venueAddress,
                            url,
                            i.startAt,
                            i.numAttendees,
                            i.state]);
                }
            }
            mapResult = locations;
        } catch (error) {
            if (error.name === 'AbortError') {
                cancelled = true;
                loading = false;
            } else {
                errorMessage = true;
                loading = false;
                console.error('Error:', error);
            }
            return;
        }
        loading = false;
        hasSearched = true;
        if (!isMobileDevice) {
            open = !open;
        }
        document.getElementById("filter_dialog").close();
    }

    function cancelRequest() {
        abortController.abort();
        loading = false;
        cancelled = true;
    }
</script>

{#if showShareDialog}
    <script>
        document.getElementById('share_dialog').showModal();
    </script>
{/if}

{#if showWarningDialog}
    <script>
        document.getElementById('warning').showModal();
    </script>
{/if}

<dialog id="warning">
    <h3>Too many tournaments!</h3> <br>

    <p>It looks like your search had <b>More than 50 tournaments</b>, that's quite a lot!</p>

    <p>Unfortunately, large searches cost more money due to geocoding costs, try narrowing your search by selecting
        a narrower date or setting a minimum attendees.</p> <br>

    <button onclick="warning.close()">Close</button>
</dialog>

<dialog id="share_dialog">
    <div><p>
        Thanks for searching! <br><br>
        Please consider sharing this app, the more this app is used the more attendees local tournaments can get! <br>
    </p>

        <TwitterShare
                text="Check out Smash Mapping, a new way to find local tournaments."
                url="https://mapping-smash.vercel.app/"></TwitterShare>
        <br><br>

        <button onclick="share_dialog.close(); showShareDialog = false;">Close</button>
    </div>
</dialog>

<dialog class="filter-dialog" id="filter_dialog">
    <h2 style="font-style: italic">Filters</h2>

    <div class="filter-dialog-div">
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
                <option value="FR">France</option>
                <option value="GB">United Kingdom</option>
                <option value="DE">Germany</option>
                <option value="IT">Italy</option>
                <option value="ES">Spain</option>
                <option value="CH">Switzerland</option>
                <option value="NL">Netherlands</option>
                <option value="AU">Australia</option>
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


        <InfoCircle marginRight="4.1em" tooltip="Weekly Tournaments aren't always posted a week in advance.
    Searching a week or 2 weeks prior can show weekly schedules.
Tournaments that have already concluded have a grey marker"/>

        <label> From:
            <input min={todayString} bind:value={startDate} type="date">
        </label>

        <label> To:
            <input min="{startDate}" bind:value={endDate} type="date">
        </label>

        <label>Attendees:
            <input type="number" min="0" bind:value={minAttendees}>
        </label>

        <button disabled='{loading}' on:click={() => updateMap()}>Search</button>
        <button onclick="filter_dialog.close();">Close</button>

        {#if loading}
            <button on:click={() => cancelRequest()}>Cancel</button>
            <p>Loading...</p>
        {/if}

        {#if errorMessage}
            <p style="color: red; width: fit-content(100%);">There was an error loading the map</p>
        {/if}

        {#if noData}
            <p style="color: red">No tournaments found</p>
        {/if}

        {#if cancelled}
            <p style="color: red">Request cancelled</p>
        {/if}
    </div>

</dialog>


{#if !isMobileDevice && open}
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
                <option value="FR">France</option>
                <option value="GB">United Kingdom</option>
                <option value="DE">Germany</option>
                <option value="IT">Italy</option>
                <option value="ES">Spain</option>
                <option value="CH">Switzerland</option>
                <option value="NL">Netherlands</option>
                <option value="AU">Australia</option>
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


        <InfoCircle marginRight="15px" tooltip="Weekly Tournaments aren't always posted a week in advance.
    Searching a week or 2 weeks prior can show weekly schedules.
Tournaments that have already concluded have a grey marker"/>
        <label> From:
            <input min={todayString} bind:value={startDate} type="date">
        </label>

        <label> To:
            <input min="{startDate}" bind:value={endDate} type="date">
        </label>

        <label>Attendees:
            <input type="number" min="0" bind:value={minAttendees}>
        </label>


        <button disabled='{loading}' on:click={() => updateMap()}>Search</button>

        {#if loading}
            <button on:click={() => cancelRequest()}>Cancel</button>
            <p>Loading...</p>
        {/if}

        {#if errorMessage}
            <p style="color: red; width: fit-content(100%);">There was an error loading the map</p>
        {/if}

        {#if noData}
            <p style="color: red">No tournaments found</p>
        {/if}

        {#if cancelled}
            <p style="color: red">Request cancelled</p>
        {/if}

    </aside>
{:else if isMobileDevice && open}
    <script>
        document.getElementById('filter_dialog').showModal();
    </script>
{/if}


<style>
    aside {
        width: 12.9rem;
        height: 65vh;
        overflow: visible;
        display: block;
        background-color: #f2f2f2;
        font-family: 'Oswald', sans-serif;
        white-space: nowrap;
        border: black 4px solid;
        padding: 5px 40px 5px 5px;
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
        margin-top: 5px;
    }

    input {
        font-family: Oswald, sans-serif;
        margin-left: 2px;
        font-size: 1em;
    }

    select {
        font-family: Oswald, sans-serif;
        margin-left: 2px;
        font-size: 1em;
    }

    label {
        font-family: Oswald, sans-serif;
        margin-left: 2px;
        font-size: 1em;
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

    dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
    }

    dialog {
        height: fit-content(100%);
        width: 16em;
        text-align: center;
        border: 5px solid black;
        border-radius: 10px;
        transition: all 2.5s;
        overflow: hidden;
    }

    dialog[open] {
        animation: linearwipe 0.2s;
    }

    @keyframes linearwipe {
        from {
            width: 50%;
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

    p {
        margin-top: 2px;
        overflow: hidden;
    }

    .filter-dialog-div {
        display: block;
        justify-items: left;
        overflow: visible;
    }

    .filter-dialog > h2 {
        text-align: center;
        margin-bottom: 9px;
    }

    .filter-dialog {
        width: fit-content(100%);
        text-align: left;
        padding-left: 10px;
        overflow: visible;
        white-space: nowrap;
    }

</style>