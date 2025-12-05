// ---------- PAGE FADE IN ----------
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "1";
});

// ---------- CURSOR WAND ----------
const wand = document.getElementById("cursor-wand");
document.addEventListener("mousemove", (e) => {
    wand.style.left = e.pageX + "px";
    wand.style.top = e.pageY + "px";
});

// ---------- PARTICLES ----------
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];
for (let i = 0; i < 65; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
}
drawParticles();

// ---------- REVEAL ON LOAD ----------
setTimeout(() => {
    document.querySelectorAll(".reveal, .reveal-delayed").forEach(el => {
        el.classList.add("show");
    });
}, 300);

// ---------- AUTO TYPE EFFECT ----------
const textList = [
    "Experience Peñaranda.",
    "Explore our Culture.",
    "Enjoy the Journey."
];

let i = 0, j = 0, current = "", isDeleting = false;

function typeEffect() {
    current = textList[i];

    document.getElementById("typed").textContent =
        current.substring(0, j);

    if (!isDeleting) j++;
    else j--;

    if (j === current.length + 1) {
        isDeleting = true;
        setTimeout(typeEffect, 800);
        return;
    }

    if (j === 0) {
        isDeleting = false;
        i = (i + 1) % textList.length;
    }

    setTimeout(typeEffect, isDeleting ? 40 : 80);
}

typeEffect();
