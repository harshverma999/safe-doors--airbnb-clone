const map = new mapboxgl.Map({
    accessToken: mapToken,
    container: 'map', // container ID
    center: indvList.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

const marker1 = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(indvList.geometry.coordinates) // Listing.Geometry.Coordinates
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h4>${indvList.location}</h4> <p>Exact Location Provided after booking</p>`)
    .setMaxWidth("300px"))
    .addTo(map);