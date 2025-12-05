// Global variables
let map;
let userLocation;
let geocoder;
let infoWindow;
const statusEl = document.getElementById('status');
const addressEl = document.getElementById('current-address');
const landmarksListEl = document.getElementById('landmarks-list');

// 1. Initialize Map and Detect Location
function initMap() {
    geocoder = new google.maps.Geocoder();
    infoWindow = new google.maps.InfoWindow();

    // Default map settings (Centered in Peñaranda, Nueva Ecija)
    const defaultCenter = { lat: 15.3575, lng: 121.0068 };

    map = new google.maps.Map(document.getElementById("map"), {
        center: defaultCenter,
        zoom: 12,
    });

    // Check for Geolocation support
    if (navigator.geolocation) {
        statusEl.textContent = "Nagre-request ng lokasyon...";
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // SUCCESS: User granted permission
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                statusEl.textContent = "✅ Lokasyon ay na-detect na!";

                // 2. Determine Exact Location (Geocoding)
                geocodeLatLng(userLocation);
                
                // 3. Showcase Landmarks (Places API)
                findNearbyLandmarks(userLocation);

            },
            (error) => {
                // ERROR: User denied or Geolocation failed
                handleLocationError(true, map.getCenter(), error.message);
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter(), "Hindi sinusuportahan ng iyong browser ang Geolocation.");
    }
}

// Function to handle Geolocation errors
function handleLocationError(browserHasGeolocation, pos, message) {
    statusEl.textContent = `❌ Error: ${message}`;
    
    // Display error marker on the map
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Hindi pinahintulutan ang serbisyo ng lokasyon."
            : "Error: Hindi sinusuportahan ng browser ang Geolocation."
    );
    infoWindow.open(map);
}
// 2b. Geocoding API: Convert Coordinates to Address
function geocodeLatLng(latlng) {
    geocoder.geocode({ location: latlng })
        .then((response) => {
            if (response.results[0]) {
                const address = response.results[0].formatted_address;
                addressEl.textContent = address;
                
                // Center map to user's location
                map.setCenter(latlng);
                map.setZoom(16);

                // Add a marker for the user's current location
                new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: "Ito ang iyong lokasyon",
                    icon: {
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    }
                });

            } else {
                addressEl.textContent = "Walang nahanap na address.";
            }
        })
        .catch((e) => {
            addressEl.textContent = "Nabigo ang Geocoding: " + e.message;
        });
}


// 3. Places API: Retrieve and Display Nearby Landmarks
function findNearbyLandmarks(latlng) {
    // Clear previous list content
    landmarksListEl.innerHTML = '';
    
    // Create the Places Service request
    const request = {
        location: latlng,
        radius: '5000', // Search within 5km radius
        type: ['church', 'park', 'tourist_attraction', 'landmark', 'place_of_interest'],
        rankby: google.maps.places.RankBy.PROMINENCE
    };

    const service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            
            // Limit the results to 5 best landmarks
            const topResults = results.slice(0, 5); 

            topResults.forEach(place => {
                // Add marker to the map
                addPlaceMarker(place);
                
                // Add item to the list
                addLandmarkToList(place);
            });

        } else {
            landmarksListEl.innerHTML = '<li>Walang kalapit na landmark na nahanap sa 5km radius.</li>';
        }
    });
}

// Helper to add marker for a landmark
function addPlaceMarker(place) {
    const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        }
    });

    // Info window when marker is clicked
    marker.addListener("click", () => {
        infoWindow.setContent(`<strong>${place.name}</strong><br>${place.vicinity || ''}`);
        infoWindow.open(map, marker);
    });
}

// Helper to add landmark details to the list
function addLandmarkToList(place) {
    let photoUrl = '';
    if (place.photos && place.photos.length > 0) {
        // Use the first available photo
        photoUrl = place.photos[0].getUrl({ maxWidth: 80, maxHeight: 80 });
    }

    const listItem = document.createElement('li');
    listItem.className = 'landmark-item';
    listItem.innerHTML = `
        <img src="${photoUrl || 'default_placeholder.jpg'}" alt="${place.name} Photo">
        <div class="landmark-details">
            <h3>${place.name}</h3>
            <p>${place.vicinity || place.formatted_address}</p>
        </div>
    `;
    landmarksListEl.appendChild(listItem);
}