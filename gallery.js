// LIGHTBOX SCRIPT
const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const close = lightbox.querySelector("span");

galleryImages.forEach(img => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    });
});

close.onclick = () => lightbox.style.display = "none";

lightbox.onclick = e => { 
    if (e.target === lightbox) lightbox.style.display = "none"; 
};
// GALLERY ELEMENTS
constgalleryImages = document.querySelectorAll(".gallery img");
constlightbox = document.getElementById("lightbox");
constlightboxImg = document.getElementById("lightbox-img");
constclose = lightbox.querySelector("span");

let currentIndex = 0; // Track current image

// OPEN LIGHTBOX ON CLICK
galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightbox.style.display = "flex";
    lightboxImg.src = galleryImages[currentIndex].src;
}

// CLOSE LIGHTBOX
close.onclick = () => closeLightbox();

function closeLightbox() {
    lightbox.style.display = "none";
}

// CLICK OUTSIDE TO CLOSE
lightbox.onclick = e => {
    if (e.target === lightbox) closeLightbox();
};

// 🔥 ARROW KEY SUPPORT
document.addEventListener("keydown", (e) => {
    if (lightbox.style.display !== "flex") return;

    if (e.key === "ArrowRight") {
        // Next image
        currentIndex = (currentIndex + 1) % galleryImages.length;
        openLightbox();
    }

    if (e.key === "ArrowLeft") {
        // Previous image
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        openLightbox();
    }

    if (e.key === "Escape") {
        closeLightbox();
    }
});
