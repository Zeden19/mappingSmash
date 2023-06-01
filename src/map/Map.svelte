<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
<script>
    import {MarkerClusterer} from "@googlemaps/markerclusterer";

    export let mapResult;

    var center = {lat: 43.73758865859436, lng: -79.50304080536894};
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    let container;
    let map;
    var markers = [];
    var markerPositions = [];
    var markerCluster;

    import {onMount} from 'svelte';

    onMount(async () => {
        map = new google.maps.Map(
            container, {zoom: 3, center: center});
        map.setOptions({minZoom: 3, maxZoom: 18});
        markerCluster = new MarkerClusterer({map, markers, algorithmOptions: {maxZoom: 8}});

    });

    function hideMarkers() {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers.length = 0;
    }


    function addMarkers(mapResult) {
        hideMarkers();
        markerCluster.clearMarkers()
        markers = [];
        markerPositions = [];

        for (var i = 0; i < mapResult.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(mapResult[i][1], mapResult[i][2]),
                map: map,
                icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
            });

            if (markerPositions.includes(marker.position.toString())) {
                marker.setIcon("https://maps.google.com/mapfiles/ms/icons/yellow-dot.png")
                marker.setPosition(new google.maps.LatLng(mapResult[i][1] + 0.0001, mapResult[i][2] + 0.0001));
            }

            if (mapResult[i][7] > 50) {
                marker.setIcon('https://maps.google.com/mapfiles/ms/icons/green-dot.png')
            }

            if (mapResult[i][7] > 100) {
                marker.setIcon('https://maps.google.com/mapfiles/ms/icons/blue-dot.png')
            }

            if (mapResult[i][7] > 500) {
                marker.setIcon('https://maps.google.com/mapfiles/ms/icons/purple-dot.png')
            }


            // Add the marker to the array
            markers.push(marker);
            markerPositions.push(marker.getPosition().toString());

            const mailTo = (mapResult[i][3].includes("@")) ?
                "<a href=\"mailto:" + mapResult[i][3] + "\" target=\"_blank\">" + mapResult[i][3] + "</a>" :
                "<a href=\"" + mapResult[i][3] + "\" target=\"_blank\">" + mapResult[i][3] + "</a>";

            // Create an info window for the marker
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    var infoContent =
                        "<div style='text-align: left'>" +
                        "<p><strong>Name: </strong>" + mapResult[i][0] + "</p>" +
                        "<p><strong>Address: </strong>" + mapResult[i][4] + "</p>" +
                        "<p><strong>Date: </strong>" + mapResult[i][6] + "</p>" +
                        "<p><strong>Contact Info: </strong>" + mailTo + "</p>" +
                        "<p><strong>Start.gg site: </strong><a target='_blank' href='" + mapResult[i][5] + "'>" + mapResult[i][5] + "</a></p>" +
                        "</div>";

                    infowindow.setContent(infoContent);
                    infowindow.open(map, marker);
                    google.maps.event.addListener(map, "click", function (event) {
                        infowindow.close();
                    });
                    google.maps.event.addListener(map, "drag", function (event) {
                        infowindow.close();
                    });
                };

            })(marker, i));
        }
        // update with new markers
        markerCluster.addMarkers(markers)
    }

    $: {
        if (mapResult) {
            addMarkers(mapResult);
        }
    }


</script>

<div id="map" bind:this={container} style="height: 100%; width: 100%">
</div>


<style>

</style>