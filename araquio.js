// =========================================================
// GSAP SETUP (SCROLL REVEAL)
// =========================================================
gsap.registerPlugin(ScrollTrigger);

// Select all info boxes and the tour section for GSAP animation
const elementsToReveal = document.querySelectorAll(".info-section .info-box, .tour-section, .location-section, .stay-social");

// Loop through each element and apply the animation
elementsToReveal.forEach((el, i) => {
    gsap.from(el, {
        opacity: 0, 
        y: 80, 
        duration: 1, 
        ease: "power3.out", 
        scrollTrigger: {
            trigger: el, 
            start: "top 85%", // Animation starts when element top hits 85% of viewport
            toggleActions: "play none none none", 
        }
    });
});

// =========================================================
// SLIDER CORE LOGIC
// =========================================================
let slideIndex = 1;

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    // Loop logic
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    // Hide all slides and deactivate all dots
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Display the current slide and activate the corresponding dot
    if (slides.length > 0) {
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }
}

// Initial display of the first slide
showSlides(slideIndex);

// Manual controls (exposed to HTML via window)
function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}

window.plusSlides = plusSlides;
window.currentSlide = currentSlide;


// =========================================================
// THEME TOGGLE (Dark Mode)
// =========================================================
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        // Change icon
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌓";
    });
}


// =========================================================
// BACK TO TOP BUTTON
// =========================================================
const backToTopButton = document.getElementById('backToTop');

// Scroll event listener for the button visibility
window.addEventListener('scroll', () => {
    // Show button after scrolling past 500 pixels
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        if (backToTopButton) backToTopButton.style.display = "block";
    } else {
        if (backToTopButton) backToTopButton.style.display = "none";
    }
});

// Scroll to top function
if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });
}