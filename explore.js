

// ===============================

// EXPLORE PAGE JS EFFECTS

// ===============================



// ===============================

// 1. Info Section Fade-In Sequential

// ===============================

const infoInner = document.querySelectorAll(".info-inner, .info-text");

infoInner.forEach((section) => {

    const paragraphs = section.querySelectorAll("p, h2, h3");

    paragraphs.forEach((p, i) => {

        p.style.opacity = 0;

        p.style.transform = "translateY(20px)";

        p.style.transition = `opacity 0.6s ease-out ${i * 0.3}s, transform 0.6s ease-out ${i * 0.3}s`;

    });

});



function fadeInfo() {

    infoInner.forEach((section) => {

        const top = section.getBoundingClientRect().top;

        const trigger = window.innerHeight * 0.85;

        if (top < trigger) {

            section.classList.add("active");

            section.querySelectorAll("p, h2, h3").forEach((p) => {

                p.style.opacity = 1;

                p.style.transform = "translateY(0)";

            });

        }

    });

}

window.addEventListener("scroll", fadeInfo);

fadeInfo();



// ===============================

// 2. Gallery Tilt Hover

// ===============================

const galleryImgs = document.querySelectorAll(".gallery img");

galleryImgs.forEach(img => {

    img.addEventListener("mousemove", e => {

        const rect = img.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;

        const centerY = rect.height / 2;



        const rotateX = ((y - centerY) / centerY) * 8; // tilt max 8deg

        const rotateY = ((x - centerX) / centerX) * 8;



        img.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

        img.style.boxShadow = `0 15px 25px rgba(0,0,0,0.2)`;

    });



    img.addEventListener("mouseleave", () => {

        img.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";

        img.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";

    });

});



// ===============================

// 3. Slideshow Auto Zoom

// ===============================

const slides = document.querySelectorAll(".slides img");

let slideIndex = 0;



function changeSlide() {

    slides.forEach((slide) => {

        slide.classList.remove("active");

        slide.style.transform = "scale(1)";

    });

    slides[slideIndex].classList.add("active");

    slides[slideIndex].style.transform = "scale(1.05)";

    slideIndex = (slideIndex + 1) % slides.length;

}



setInterval(changeSlide, 5000);



// ===============================

// 4. Services Hover Pop-up

// ===============================

const services = document.querySelectorAll(".service-item");

services.forEach(service => {

    service.addEventListener("mouseenter", () => {

        service.style.transform = "translateY(-10px)";

        service.style.boxShadow = "0 12px 20px rgba(0,0,0,0.25)";

    });

    service.addEventListener("mouseleave", () => {

        service.style.transform = "translateY(0)";

        service.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";

    });

});



// ===============================

// 5. Scroll Highlight Navigation

// ===============================

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".topnav .menu a");



window.addEventListener("scroll", () => {

    let scrollPos = window.scrollY + 200;

    sections.forEach(section => {

        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                const href = link.getAttribute("href");

                if (href && href.includes(section.id)) {

                    link.classList.add("active");

                }

            });

        }

    });

});



// ===============================

// 6. Premium Particles / Mist Effect

// ===============================

const particleContainer = document.createElement("div");

particleContainer.classList.add("particles");

document.body.appendChild(particleContainer);



for (let i = 0; i < 50; i++) {

    const particle = document.createElement("span");

    particle.style.left = `${Math.random() * 100}%`;

    particle.style.top = `${Math.random() * 100}%`;

    particle.style.width = `${Math.random() * 4 + 2}px`;

    particle.style.height = particle.style.width;

    particle.style.animationDuration = `${Math.random() * 20 + 10}s`;

    particleContainer.appendChild(particle);

}

// =========================

// SCROLL PROGRESS BAR

// =========================

window.addEventListener("scroll", () => {

    let h = document.documentElement;

    let scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;

    document.querySelector(".scroll-progress").style.width = scrolled + "%";

});



// =========================

// FLOATING SCROLL BUBBLE

// =========================

let scrollBubble = document.querySelector(".scroll-indicator");

let bubbleTimeout;

window.addEventListener("scroll", () => {

    scrollBubble.classList.add("hide");

    clearTimeout(bubbleTimeout);

    bubbleTimeout = setTimeout(() => {

        scrollBubble.classList.remove("hide");

    }, 1500);

});



// =========================

// REVEAL EFFECT

// =========================

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {

    reveals.forEach(el => {

        let top = el.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            el.classList.add("show");

        }

    });

});



// =========================

// LIGHTBOX

// =========================

document.querySelectorAll(".gallery img").forEach(img => {

    img.addEventListener("click", () => {

        document.getElementById("lightbox").style.display = "flex";

        document.getElementById("lightbox-img").src = img.src;

    });

});

document.getElementById("lightbox").addEventListener("click", () => {

    document.getElementById("lightbox").style.display = "none";

});



// =========================

// CURSOR RIPPLE

// =========================

document.addEventListener("click", (e) => {

    let ripple = document.createElement("div");

    ripple.className = "ripple";

    ripple.style.left = e.clientX + "px";

    ripple.style.top = e.clientY + "px";

    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 400);

});



// =========================

// PARTICLES

// =========================

const canvas = document.getElementById("particle-canvas");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;



let particles = [];

for (let i = 0; i < 60; i++) {

    particles.push({

        x: Math.random() * canvas.width,

        y: Math.random() * canvas.height,

        r: Math.random() * 3 + 1,

        dx: Math.random() * 1 - .5,

        dy: Math.random() * 1 - .5

    });

}



function drawParticles() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p => {

        ctx.beginPath();

        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

        ctx.fillStyle = "rgba(255,255,255,.5)";

        ctx.fill();

        p.x += p.dx;

        p.y += p.dy;



        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;

        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    });

    requestAnimationFrame(drawParticles);

}

drawParticles();