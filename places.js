    document.addEventListener('DOMContentLoaded', function() {
        // --- 1. Geolocation API Logic ---

        const locationStatus = document.getElementById('location-status');

        if (navigator.geolocation) {
            // Hihingi ng location ang browser sa user
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    // Success: Kapag nag-allow ang user
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    locationStatus.textContent = `📍 Success! Your location is: Lat ${lat.toFixed(2)}, Lon ${lon.toFixed(2)}.`;
                    locationStatus.style.color = '#28a745'; // Green color for success
                },
                function(error) {
                    // Error: Kapag nag-block o nag-fail
                    let message;
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            message = "⚠️ Location access denied by the user. Showing general information.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            message = "⚠️ Location information is unavailable.";
                            break;
                        case error.TIMEOUT:
                            message = "⚠️ The request to get user location timed out.";
                            break;
                        default:
                            message = "⚠️ An unknown error occurred while getting location.";
                            break;
                    }
                    locationStatus.textContent = message;
                    locationStatus.style.color = '#dc3545'; // Red color for error
                }
            );
        } else {
            // Kapag hindi supported ng browser
            locationStatus.textContent = "❌ Geolocation is not supported by this browser.";
            locationStatus.style.color = '#dc3545';
        }


        // --- 2. Modal Pop-up Logic ---

        const modal = document.getElementById('placeModal');
        const btn = document.querySelectorAll('.open-modal');
        const span = document.getElementsByClassName('close-btn')[0];
        
        // Function para buksan ang modal
        btn.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault(); // Iwasan ang default action ng link (e.g., mag-reload)

                // Kukunin ang data mula sa data-attributes ng button
                const title = this.getAttribute('data-title');
                const description = this.getAttribute('data-description');
                const imageUrl = this.getAttribute('data-image-url');
                
                // I-update ang content ng modal
                document.getElementById('modal-title').textContent = title;
                document.getElementById('modal-description').textContent = description;
                document.getElementById('modal-image').src = imageUrl;
                
                // I-display ang modal
                modal.style.display = 'block';
            });
        });

        // Function para isara ang modal kapag nag-click sa (x)
        span.onclick = function() {
            modal.style.display = 'none';
        }

        // Function para isara ang modal kapag nag-click sa labas ng box
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    });