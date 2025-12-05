// contact.js

document.addEventListener("DOMContentLoaded", function () {
    // ===== CONTACT FORM =====
    const form = document.getElementById("contactForm");
    const msg = document.getElementById("msg");

    if (form && msg) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent page refresh

            // Show success message
            msg.classList.remove("hidden");
            msg.style.opacity = "1";

            // Clear form fields
            form.reset();

            // Hide message after 3 seconds
            setTimeout(() => {
                msg.style.opacity = "0";
                setTimeout(() => msg.classList.add("hidden"), 300);
            }, 3000);
        });
    }

    // ===== LEAFLET MAP =====
    const mapContainer = document.getElementById("map");
    if (mapContainer) {
        const map = L.map("map").setView([15.360, 121.015], 14); // Peñaranda coordinates

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([15.360, 121.015])
            .addTo(map)
            .bindPopup("Peñaranda, Nueva Ecija")
            .openPopup();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.contact-wrapper').classList.add('active');
    document.querySelector('.map-section').classList.add('active');
});

const msg = document.getElementById("msg");
msg.classList.add("show");
setTimeout(() => msg.classList.remove("show"), 3000);
