import { c as create_ssr_component, d as add_attribute, e as escape, v as validate_component } from "../../chunks/index.js";
import "@googlemaps/markerclusterer";
import { GraphQLClient } from "graphql-request";
import { s as supabase } from "../../chunks/supabaseClient.js";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
var fastDeepEqual = function equal(a, b) {
  if (a === b)
    return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor)
      return false;
    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i = length; i-- !== 0; )
        if (!equal(a[i], b[i]))
          return false;
      return true;
    }
    if (a.constructor === RegExp)
      return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length)
      return false;
    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
        return false;
    for (i = length; i-- !== 0; ) {
      var key = keys[i];
      if (!equal(a[key], b[key]))
        return false;
    }
    return true;
  }
  return a !== a && b !== b;
};
const DEFAULT_ID = "__googleMapsScriptId";
var LoaderStatus;
(function(LoaderStatus2) {
  LoaderStatus2[LoaderStatus2["INITIALIZED"] = 0] = "INITIALIZED";
  LoaderStatus2[LoaderStatus2["LOADING"] = 1] = "LOADING";
  LoaderStatus2[LoaderStatus2["SUCCESS"] = 2] = "SUCCESS";
  LoaderStatus2[LoaderStatus2["FAILURE"] = 3] = "FAILURE";
})(LoaderStatus || (LoaderStatus = {}));
class Loader {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor({ apiKey, authReferrerPolicy, channel, client, id = DEFAULT_ID, language, libraries = [], mapIds, nonce, region, retries = 3, url = "https://maps.googleapis.com/maps/api/js", version }) {
    this.callbacks = [];
    this.done = false;
    this.loading = false;
    this.errors = [];
    this.apiKey = apiKey;
    this.authReferrerPolicy = authReferrerPolicy;
    this.channel = channel;
    this.client = client;
    this.id = id || DEFAULT_ID;
    this.language = language;
    this.libraries = libraries;
    this.mapIds = mapIds;
    this.nonce = nonce;
    this.region = region;
    this.retries = retries;
    this.url = url;
    this.version = version;
    if (Loader.instance) {
      if (!fastDeepEqual(this.options, Loader.instance.options)) {
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);
      }
      return Loader.instance;
    }
    Loader.instance = this;
  }
  get options() {
    return {
      version: this.version,
      apiKey: this.apiKey,
      channel: this.channel,
      client: this.client,
      id: this.id,
      libraries: this.libraries,
      language: this.language,
      region: this.region,
      mapIds: this.mapIds,
      nonce: this.nonce,
      url: this.url,
      authReferrerPolicy: this.authReferrerPolicy
    };
  }
  get status() {
    if (this.errors.length) {
      return LoaderStatus.FAILURE;
    }
    if (this.done) {
      return LoaderStatus.SUCCESS;
    }
    if (this.loading) {
      return LoaderStatus.LOADING;
    }
    return LoaderStatus.INITIALIZED;
  }
  get failed() {
    return this.done && !this.loading && this.errors.length >= this.retries + 1;
  }
  /**
   * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
   *
   * @ignore
   * @deprecated
   */
  createUrl() {
    let url = this.url;
    url += `?callback=__googleMapsCallback`;
    if (this.apiKey) {
      url += `&key=${this.apiKey}`;
    }
    if (this.channel) {
      url += `&channel=${this.channel}`;
    }
    if (this.client) {
      url += `&client=${this.client}`;
    }
    if (this.libraries.length > 0) {
      url += `&libraries=${this.libraries.join(",")}`;
    }
    if (this.language) {
      url += `&language=${this.language}`;
    }
    if (this.region) {
      url += `&region=${this.region}`;
    }
    if (this.version) {
      url += `&v=${this.version}`;
    }
    if (this.mapIds) {
      url += `&map_ids=${this.mapIds.join(",")}`;
    }
    if (this.authReferrerPolicy) {
      url += `&auth_referrer_policy=${this.authReferrerPolicy}`;
    }
    return url;
  }
  deleteScript() {
    const script = document.getElementById(this.id);
    if (script) {
      script.remove();
    }
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   * @deprecated, use importLibrary() instead.
   */
  load() {
    return this.loadPromise();
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   *
   * @ignore
   * @deprecated, use importLibrary() instead.
   */
  loadPromise() {
    return new Promise((resolve, reject) => {
      this.loadCallback((err) => {
        if (!err) {
          resolve(window.google);
        } else {
          reject(err.error);
        }
      });
    });
  }
  importLibrary(name) {
    this.execute();
    return google.maps.importLibrary(name);
  }
  /**
   * Load the Google Maps JavaScript API script with a callback.
   * @deprecated, use importLibrary() instead.
   */
  loadCallback(fn) {
    this.callbacks.push(fn);
    this.execute();
  }
  /**
   * Set the script on document.
   */
  setScript() {
    var _a, _b;
    if (document.getElementById(this.id)) {
      this.callback();
      return;
    }
    const params = {
      key: this.apiKey,
      channel: this.channel,
      client: this.client,
      libraries: this.libraries.length && this.libraries,
      v: this.version,
      mapIds: this.mapIds,
      language: this.language,
      region: this.region,
      authReferrerPolicy: this.authReferrerPolicy
    };
    Object.keys(params).forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (key) => !params[key] && delete params[key]
    );
    if (!((_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.maps) === null || _b === void 0 ? void 0 : _b.importLibrary)) {
      ((g) => {
        let h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
        b = b[c] || (b[c] = {});
        const d = b.maps || (b.maps = {}), r = /* @__PURE__ */ new Set(), e = new URLSearchParams(), u = () => (
          // @ts-ignore
          h || (h = new Promise((f, n) => __awaiter(this, void 0, void 0, function* () {
            var _a2;
            yield a = m.createElement("script");
            a.id = this.id;
            e.set("libraries", [...r] + "");
            for (k in g)
              e.set(k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()), g[k]);
            e.set("callback", c + ".maps." + q);
            a.src = this.url + `?` + e;
            d[q] = f;
            a.onerror = () => h = n(Error(p + " could not load."));
            a.nonce = this.nonce || ((_a2 = m.querySelector("script[nonce]")) === null || _a2 === void 0 ? void 0 : _a2.nonce) || "";
            m.head.append(a);
          })))
        );
        d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));
      })(params);
    }
    const libraryPromises = this.libraries.map((library) => this.importLibrary(library));
    if (!libraryPromises.length) {
      libraryPromises.push(this.importLibrary("core"));
    }
    Promise.all(libraryPromises).then(() => this.callback(), (error) => {
      const event = new ErrorEvent("error", { error });
      this.loadErrorCallback(event);
    });
  }
  /**
   * Reset the loader state.
   */
  reset() {
    this.deleteScript();
    this.done = false;
    this.loading = false;
    this.errors = [];
    this.onerrorEvent = null;
  }
  resetIfRetryingFailed() {
    if (this.failed) {
      this.reset();
    }
  }
  loadErrorCallback(e) {
    this.errors.push(e);
    if (this.errors.length <= this.retries) {
      const delay = this.errors.length * Math.pow(2, this.errors.length);
      console.error(`Failed to load Google Maps script, retrying in ${delay} ms.`);
      setTimeout(() => {
        this.deleteScript();
        this.setScript();
      }, delay);
    } else {
      this.onerrorEvent = e;
      this.callback();
    }
  }
  callback() {
    this.done = true;
    this.loading = false;
    this.callbacks.forEach((cb) => {
      cb(this.onerrorEvent);
    });
    this.callbacks = [];
  }
  execute() {
    this.resetIfRetryingFailed();
    if (this.done) {
      this.callback();
    } else {
      if (window.google && window.google.maps && window.google.maps.version) {
        console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match.");
        this.callback();
        return;
      }
      if (this.loading)
        ;
      else {
        this.loading = true;
        this.setScript();
      }
    }
  }
}
const Map_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "div.svelte-1jw0l0w{border:#222223 solid 4px}",
  map: null
};
const Map = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { map } = $$props;
  let markers = [];
  let marker;
  let markerPositions = [];
  let markerCluster;
  let infoWindow;
  let { mapResult } = $$props;
  new Loader({
    apiKey: data.GOOGLE_MAPS_API_KEY,
    version: "weekly"
  });
  function hideMarkers() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;
  }
  function addMarkers(mapResult2) {
    hideMarkers();
    markerCluster.clearMarkers();
    markers = [];
    markerPositions = [];
    for (const tournament of mapResult2) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(tournament.lat, tournament.lng),
        map,
        icon: "markers/red-marker.png"
      });
      if (markerPositions.includes(marker.position.toString())) {
        marker.setIcon("markers/yellow-marker.png");
        marker.setPosition(new google.maps.LatLng(mapResult2.lat + 1e-4, mapResult2.lng + 1e-4));
      }
      if (tournament.numAttendees > 50) {
        marker.setIcon("markers/green-marker.png");
      }
      if (tournament.numAttendees > 100) {
        marker.setIcon("markers/blue-marker.png");
      }
      if (tournament.numAttendees > 500) {
        marker.setIcon("markers/purple-marker.png");
      }
      if (tournament.state === 3) {
        marker.setIcon("markers/grey-marker.png");
      }
      markers.push(marker);
      markerPositions.push(marker.getPosition().toString());
      const mailTo = tournament.primaryContact.includes("@") ? '<a href="mailto:' + tournament.primaryContact + '" target="_blank">' + tournament.primaryContact + "</a>" : '<a href="' + tournament.primaryContact + '" target="_blank">' + tournament.primaryContact + "</a>";
      google.maps.event.addListener(marker, "click", function(marker2, tournament2) {
        return function() {
          var infoContent = '<div style="display: block;\n        text-align: left"><h2>' + tournament2.name + "</h2><p><strong>Address: </strong><a target='_blank' href='https://www.google.com/maps/place/" + tournament2.venueAddress.replace(" ", "+") + "'>" + tournament2.venueAddress + "</a></p><p><strong>Date: </strong>" + tournament2.startAt + "</p><p><strong>Attendees: </strong>" + tournament2.numAttendees + "</p><p><strong>Contact Info: </strong>" + mailTo + "</p><p><strong>Start.gg site: </strong><a target='_blank' href='" + tournament2.url + "'>" + tournament2.url + "</a></p></div>";
          infoWindow.setContent(infoContent);
          infoWindow.open(map, marker2);
          google.maps.event.addListener(map, "click", function(event) {
            infoWindow.close();
          });
          google.maps.event.addListener(map, "drag", function(event) {
            infoWindow.close();
          });
          google.maps.event.addListener(markerCluster, "click", function(cluster) {
            infoWindow.close();
          });
        };
      }(marker, tournament));
    }
    markerCluster.addMarkers(markers);
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.map === void 0 && $$bindings.map && map !== void 0)
    $$bindings.map(map);
  if ($$props.mapResult === void 0 && $$bindings.mapResult && mapResult !== void 0)
    $$bindings.mapResult(mapResult);
  $$result.css.add(css$2);
  {
    {
      if (mapResult) {
        addMarkers(mapResult);
      }
    }
  }
  return `<div id="map" style="height: 100%; width: 100%" class="svelte-1jw0l0w"></div>`;
});
const InfoCircle_svelte_svelte_type_style_lang = "";
const Search_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: 'aside.svelte-wl73y9.svelte-wl73y9{height:60%;overflow:visible;overflow-x:hidden;font-family:"Kanit", serif;padding:5px 0 5px 5px;white-space:nowrap;justify-items:left;text-align:left}.filter-item.svelte-wl73y9.svelte-wl73y9{display:flex;margin-bottom:5px}.filter-item.svelte-wl73y9 select.svelte-wl73y9,.filter-item.svelte-wl73y9 input.svelte-wl73y9{margin-left:auto;margin-right:3em;width:10em}.error.svelte-wl73y9.svelte-wl73y9{color:red;white-space:normal}button.svelte-wl73y9.svelte-wl73y9{background-color:black;border:none;color:white;padding:10px 20px 8px 20px;font-size:1.4em;margin:5px 5px 5px 5px;border-radius:20%;transition:right 0.5s ease-in-out;font-family:"Bebas Neue", serif}button.svelte-wl73y9.svelte-wl73y9:hover{background-color:#555}button.svelte-wl73y9.svelte-wl73y9:disabled{background-color:grey}',
  map: null
};
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let minDate = /* @__PURE__ */ new Date();
  minDate.setDate(minDate.getDate() - 14);
  minDate = minDate.toISOString().split("T")[0];
  let { startDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0] } = $$props;
  let { data } = $$props;
  let { tournaments } = $$props;
  let addresses = tournaments.map(({ venue_address }) => venue_address);
  let { endDate } = $$props;
  let { country } = $$props;
  let { minAttendees = 0 } = $$props;
  let { state } = $$props;
  let { game } = $$props;
  let { geolocated } = $$props;
  let { mapResult } = $$props;
  let { showShareDialog = false } = $$props;
  let showWarningDialog = false;
  let tooManyRequestsError = false;
  let loading = false;
  let errorMessage = false;
  let noData = false;
  let cancelled = false;
  let { delay } = $$props;
  let geocoder;
  new Loader({
    apiKey: data.GOOGLE_MAPS_API_KEY,
    version: "weekly"
  });
  async function geocode_address(tournament) {
    if (addresses.includes(tournament.venueAddress)) {
      let tournamentFound = tournaments.find(({ venue_address }) => venue_address === tournament.venueAddress);
      console.log("Found tournament in list");
      return {
        lat: tournamentFound["lat"],
        lng: tournamentFound["lng"]
      };
    } else {
      try {
        console.log("Geocoding address");
        const results = await geocoder.geocode({ "address": tournament.venueAddress });
        let result = results.results[0].geometry.location;
        const { error } = await supabase.from("tournaments").insert({
          name: tournament.name,
          lat: result.lat(),
          lng: result.lng(),
          start_at: tournament.startAt,
          primary_contact: tournament.primaryContact,
          url: tournament.url,
          num_attendees: tournament.numAttendees,
          state: tournament.state,
          venue_address: tournament.venueAddress
        });
        if (error) {
          console.log("Error inserting into database:", error);
        }
        return { lat: result.lat(), lng: result.lng() };
      } catch (error) {
        console.log("Error geocoding address:", error);
        return void 0;
      }
    }
  }
  async function updateMap() {
    if (startDate > endDate) {
      alert("Start date must be before end date");
      return;
    }
    if (endDate === void 0) {
      alert("Please enter an end date");
      return;
    }
    try {
      tooManyRequestsError = false;
      errorMessage = false;
      loading = true;
      noData = false;
      cancelled = false;
      showWarningDialog = false;
      let tournamentsData;
      let unixStartTime = new Date(startDate.replace(/-/g, "/").replace("T", " "));
      let unixEndTime = new Date(endDate.replace(/-/g, "/").replace("T", " "));
      unixEndTime.setHours(23, 59, 59);
      unixStartTime = Math.floor(unixStartTime.getTime() / 1e3);
      unixEndTime = Math.floor(unixEndTime.getTime() / 1e3);
      let gameSelections = game.split(" ");
      const apiVersion = "alpha";
      const endpoint = "https://api.start.gg/gql/" + apiVersion;
      const client = new GraphQLClient(
        endpoint,
        {
          headers: {
            Authorization: "Bearer " + data.SMASH_GG_API_KEY
          }
        }
      );
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
        perPage: 151,
        after: unixStartTime,
        before: unixEndTime,
        state,
        game: gameSelections
      };
      if (state === "all" || country !== "US") {
        delete variables.state;
        query = query.replace(/addrState: \$state,?/, "").replace(", $state: String", "");
      }
      let resData = await client.request(query, variables);
      let locations = [];
      tournamentsData = resData.tournaments.nodes;
      for (let i of resData.tournaments.nodes) {
        const timestamp = i.startAt;
        const date = new Date(timestamp * 1e3);
        i.startAt = date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        });
      }
      tournamentsData = tournamentsData.filter(function(tournament) {
        return minAttendees <= tournament["numAttendees"];
      });
      if (tournamentsData.length === 0) {
        loading = false;
        noData = true;
        return;
      }
      if (tournamentsData.length > 150) {
        loading = false;
        tooManyRequestsError = true;
        return;
      }
      if (minAttendees !== 0) {
        tournamentsData = tournamentsData.filter((item) => item.numAttendees !== null && item.numAttendees !== void 0);
      } else {
        tournamentsData = tournamentsData.map((item) => {
          if (item.numAttendees === null || item.numAttendees === void 0) {
            item.numAttendees = "unknown";
          }
          return item;
        });
      }
      for (let i of tournamentsData) {
        let latlng;
        if (cancelled) {
          loading = false;
          return;
        }
        try {
          latlng = await geocode_address(i);
        } catch (e) {
          console.log(e);
          continue;
        }
        let url = "https://start.gg" + i.url;
        if (latlng !== void 0) {
          locations.push({
            name: i.name,
            lat: latlng.lat,
            lng: latlng.lng,
            primaryContact: i.primaryContact,
            venueAddress: i.venueAddress,
            url,
            startAt: i.startAt,
            numAttendees: i.numAttendees,
            state: i.state
          });
        }
      }
      await supabase.from("tournaments").select().then((data2) => {
        tournaments = data2.data;
        addresses = data2.data.map(({ venue_address }) => venue_address);
      }).catch((error) => {
        console.log(error);
      });
      mapResult = locations;
      console.log(mapResult);
    } catch (error) {
      errorMessage = true;
      loading = false;
      console.error("Error:", error);
    }
    loading = false;
  }
  if ($$props.startDate === void 0 && $$bindings.startDate && startDate !== void 0)
    $$bindings.startDate(startDate);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.tournaments === void 0 && $$bindings.tournaments && tournaments !== void 0)
    $$bindings.tournaments(tournaments);
  if ($$props.endDate === void 0 && $$bindings.endDate && endDate !== void 0)
    $$bindings.endDate(endDate);
  if ($$props.country === void 0 && $$bindings.country && country !== void 0)
    $$bindings.country(country);
  if ($$props.minAttendees === void 0 && $$bindings.minAttendees && minAttendees !== void 0)
    $$bindings.minAttendees(minAttendees);
  if ($$props.state === void 0 && $$bindings.state && state !== void 0)
    $$bindings.state(state);
  if ($$props.game === void 0 && $$bindings.game && game !== void 0)
    $$bindings.game(game);
  if ($$props.geolocated === void 0 && $$bindings.geolocated && geolocated !== void 0)
    $$bindings.geolocated(geolocated);
  if ($$props.mapResult === void 0 && $$bindings.mapResult && mapResult !== void 0)
    $$bindings.mapResult(mapResult);
  if ($$props.showShareDialog === void 0 && $$bindings.showShareDialog && showShareDialog !== void 0)
    $$bindings.showShareDialog(showShareDialog);
  if ($$props.delay === void 0 && $$bindings.delay && delay !== void 0)
    $$bindings.delay(delay);
  if ($$props.updateMap === void 0 && $$bindings.updateMap && updateMap !== void 0)
    $$bindings.updateMap(updateMap);
  $$result.css.add(css$1);
  return `<aside class="svelte-wl73y9"><div class="filter-item svelte-wl73y9"><label>Game:</label>
        <select required name="game" class="svelte-wl73y9"><option value="1386">Ultimate</option><option value="1">Melee</option><option value="1 1386">Both</option></select></div>


    <div class="filter-item svelte-wl73y9"><label>Country: </label>
        <select required name="country" class="svelte-wl73y9"><option value="CA">Canada</option><option value="US">USA</option><option value="MX">Mexico</option><option value="JP">Japan</option><option value="FR">France</option><option value="GB">United Kingdom</option><option value="DE">Germany</option><option value="IT">Italy</option><option value="ES">Spain</option><option value="CH">Switzerland</option><option value="NL">Netherlands</option><option value="AU">Australia</option></select></div>


    ${country === "US" ? `<div class="filter-item svelte-wl73y9"><label>State:</label>
            <select required name="state" class="svelte-wl73y9"><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District Of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option><option value="all">All</option></select></div>` : ``}

    <div class="filter-item svelte-wl73y9"><label>From: </label>
        <input required name="startDate"${add_attribute("min", minDate, 0)} type="date" class="svelte-wl73y9"${add_attribute("value", startDate, 0)}></div>

    <div class="filter-item svelte-wl73y9"><label>To: </label>
        <input required name="endDate"${add_attribute("min", startDate, 0)} type="date" class="svelte-wl73y9"${add_attribute("value", endDate, 0)}></div>


    <div class="filter-item svelte-wl73y9"><label>Attendees: </label>
        <input required name="attendees" type="number" min="0" class="svelte-wl73y9"${add_attribute("value", minAttendees, 0)}></div>


    <button ${loading ? "disabled" : ""} class="svelte-wl73y9">Search</button>

    ${loading ? `<button class="svelte-wl73y9">Cancel</button>
        <p>Loading...</p>` : ``}

    ${errorMessage ? `<p class="error svelte-wl73y9">There was an error loading the map</p>` : ``}

    ${noData ? `<p class="error svelte-wl73y9">No tournaments found</p>` : ``}

    ${tooManyRequestsError ? `<p class="error svelte-wl73y9">You cannot search for more than 150 tournaments.</p>` : ``}

    ${cancelled ? `<p class="error svelte-wl73y9">Request cancelled</p>` : ``}</aside>
`;
});
const Help_svelte_svelte_type_style_lang = "";
const TournamentsCard_svelte_svelte_type_style_lang = "";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-h2ooe8.svelte-h2ooe8.svelte-h2ooe8{margin:0;padding:0;background-color:#26282B}footer.svelte-h2ooe8.svelte-h2ooe8.svelte-h2ooe8{background:#1c1c1c;height:5vh}body.svelte-h2ooe8.svelte-h2ooe8.svelte-h2ooe8{margin:0;padding:0;overflow:hidden;height:95vh;overflow-y:auto}a.svelte-h2ooe8.svelte-h2ooe8.svelte-h2ooe8{color:white;background:none}a.svelte-h2ooe8.svelte-h2ooe8.svelte-h2ooe8:hover{color:red}.map.svelte-h2ooe8.svelte-h2ooe8.svelte-h2ooe8{display:flex;flex-flow:row nowrap;text-align:center;height:90vh;position:relative;z-index:0}.sidebar.svelte-h2ooe8.svelte-h2ooe8.svelte-h2ooe8{color:white;height:100%;overflow-y:auto;background-color:#2c343c;margin:0 0 3px;transition:margin-left 0.5s ease-in-out;z-index:1;border-bottom:#222223 solid 3px;border-top:#222223 solid 3px}.sidebar-buttons.svelte-h2ooe8.svelte-h2ooe8.svelte-h2ooe8{z-index:2;background:#181818;width:3em;height:100%;border:#222223 solid 3px;border-left:none}.sidebar-buttons.svelte-h2ooe8>button.svelte-h2ooe8.svelte-h2ooe8{display:block;margin-top:0.5em;background:#181818;border-bottom:#2b2b31 solid 2px;border-top:#2b2b31 solid 2px;cursor:pointer}.sidebar-buttons.svelte-h2ooe8 button.svelte-h2ooe8>img.svelte-h2ooe8{display:block;background:#181818;margin:4px 0 4px 0}.sidebar-buttons.svelte-h2ooe8 img.svelte-h2ooe8.svelte-h2ooe8:hover,.sidebar-buttons.svelte-h2ooe8 button.svelte-h2ooe8.svelte-h2ooe8:hover{background:#444446}.sidebar-buttons.svelte-h2ooe8 .sidebarSelected img.svelte-h2ooe8.svelte-h2ooe8,.sidebar-buttons.svelte-h2ooe8 .sidebarSelected.svelte-h2ooe8.svelte-h2ooe8{background:#c91616}.sidebar-buttons.svelte-h2ooe8 .sidebarSelected img.svelte-h2ooe8.svelte-h2ooe8:hover,.sidebar-buttons.svelte-h2ooe8 .sidebarSelected.svelte-h2ooe8.svelte-h2ooe8:hover{background:#c91616}.tournaments-sidebar-close-button.svelte-h2ooe8.svelte-h2ooe8.svelte-h2ooe8{background:none;border:none;color:white;font-size:1.5em;transition:transform 0.5s ease-in-out;z-index:1;margin:2px 2px 2px auto;background:#2a2d42;border-radius:80%;padding:0 4px 0 4px}.tournaments-sidebar-close-button.svelte-h2ooe8.svelte-h2ooe8.svelte-h2ooe8:hover{background:#444446}.sidebar.sidebarClosed.svelte-h2ooe8.svelte-h2ooe8.svelte-h2ooe8{transition:margin 0.5s ease-in-out}.tournaments-title.svelte-h2ooe8.svelte-h2ooe8.svelte-h2ooe8{font-size:1.4em;background-color:#130c0c;display:flex;justify-content:center}.tournaments-title.svelte-h2ooe8>p.svelte-h2ooe8.svelte-h2ooe8{background-color:#130c0c}@media(max-width: 500px){.sidebar.svelte-h2ooe8.svelte-h2ooe8.svelte-h2ooe8{width:80%}.sidebar.sidebarClosed.svelte-h2ooe8.svelte-h2ooe8.svelte-h2ooe8{margin-left:-66.6%}}@media(min-width: 500px){.sidebar.svelte-h2ooe8.svelte-h2ooe8.svelte-h2ooe8{width:25%}.sidebar.sidebarClosed.svelte-h2ooe8.svelte-h2ooe8.svelte-h2ooe8{margin-left:-24.5%}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let mapResult;
  let startDate;
  let endDate;
  let country;
  let minAttendees = 0;
  let state;
  let showShareDialog;
  let geolocated = data.geolocated;
  let sidebarTitle = "Filters:";
  let delay;
  let map;
  let { tournaments } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1ot263w_START -->${$$result.title = `<title>Smash Mapping: Map</title>`, ""}<meta charset="utf-8" class="svelte-h2ooe8"><meta name="viewport" content="width=device-width,initial-scale=1" class="svelte-h2ooe8"><meta property="og:locale" content="en_US" class="svelte-h2ooe8"><meta property="og:type" content="website" class="svelte-h2ooe8"><meta name="twitter:card" content="summary_large_image" class="svelte-h2ooe8"><meta name="twitter:site" content="@ZedenZeder" class="svelte-h2ooe8"><meta property="og:site_name" content="Smash Mapping - A New Way to Find Tournaments" class="svelte-h2ooe8"><meta property="og:title" content="Smash Mapping - A New Way to Find Tournaments" class="svelte-h2ooe8"><meta name="twitter:title" content="Smash Mapping - A New Way to Find Tournaments" class="svelte-h2ooe8"><meta name="description" content="Showing where in-person e-sports are held." class="svelte-h2ooe8"><meta property="og:description" content="Showing where in-person e-sports are held." class="svelte-h2ooe8"><meta name="twitter:description" content="Showing where in-person e-sports are held." class="svelte-h2ooe8"><meta property="og:url" content="https://www.smash-mapping.com/" class="svelte-h2ooe8"><meta property="og:image" content="example.png" class="svelte-h2ooe8"><meta name="twitter:image" content="example.png" class="svelte-h2ooe8"><!-- HEAD_svelte-1ot263w_END -->`, ""}

<body class="svelte-h2ooe8"><div class="map svelte-h2ooe8"><div class="sidebar-buttons svelte-h2ooe8"><button class="${["svelte-h2ooe8", "sidebarSelected"].join(" ").trim()}"><img src="filter.png" style="width: 40px; height: 45px" alt="filter-image" class="svelte-h2ooe8"></button>

        <button class="${["svelte-h2ooe8", ""].join(" ").trim()}"><img src="tournaments.png" style="width: 40px; height: 45px" alt="tournaments-image" class="svelte-h2ooe8"></button>

        <button class="${["svelte-h2ooe8", ""].join(" ").trim()}"><img src="questionmark.png" style="width: 40px; height: 40px" alt="tournaments-image" class="svelte-h2ooe8"></button></div>

    <div class="${["sidebar svelte-h2ooe8", ""].join(" ").trim()}" id="tournaments-sidebar"><div class="tournaments-title svelte-h2ooe8"><p style="margin-left: auto" class="svelte-h2ooe8">${escape(sidebarTitle)}</p>

            <button class="${[
      "tournaments-sidebar-close-button svelte-h2ooe8",
      ""
    ].join(" ").trim()}" style="cursor: pointer">&gt;
            </button></div>


        ${``}

        ${`${validate_component(Search, "Search").$$render(
      $$result,
      {
        delay,
        state,
        tournaments,
        data,
        geolocated,
        mapResult,
        startDate,
        endDate,
        country,
        minAttendees,
        showShareDialog
      },
      {
        state: ($$value) => {
          state = $$value;
          $$settled = false;
        },
        tournaments: ($$value) => {
          tournaments = $$value;
          $$settled = false;
        },
        data: ($$value) => {
          data = $$value;
          $$settled = false;
        },
        geolocated: ($$value) => {
          geolocated = $$value;
          $$settled = false;
        },
        mapResult: ($$value) => {
          mapResult = $$value;
          $$settled = false;
        },
        startDate: ($$value) => {
          startDate = $$value;
          $$settled = false;
        },
        endDate: ($$value) => {
          endDate = $$value;
          $$settled = false;
        },
        country: ($$value) => {
          country = $$value;
          $$settled = false;
        },
        minAttendees: ($$value) => {
          minAttendees = $$value;
          $$settled = false;
        },
        showShareDialog: ($$value) => {
          showShareDialog = $$value;
          $$settled = false;
        }
      },
      {}
    )}`}

        ${``}</div>

    ${validate_component(Map, "Map").$$render(
      $$result,
      { map, data, mapResult },
      {
        map: ($$value) => {
          map = $$value;
          $$settled = false;
        },
        data: ($$value) => {
          data = $$value;
          $$settled = false;
        },
        mapResult: ($$value) => {
          mapResult = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>

<footer style="height: 30px; display:block;" class="svelte-h2ooe8"><p style="text-align: center; color: white" class="svelte-h2ooe8">Created by: <a href="https://twitter.com/ZedenZeder" class="svelte-h2ooe8">Sleepy</a></p></footer>
</body>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
