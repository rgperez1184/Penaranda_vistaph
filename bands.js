// =========================================================
// 1. GSAP SCROLLTRIGGER SETUP & PREMIUM ANIMATIONS
// =========================================================
gsap.registerPlugin(ScrollTrigger);

// --- GSAP Scroll Reveal (Replaces old Intersection Observer) ---
const elementsToReveal = document.querySelectorAll('.info-box, .stay-social, .location-section');

elementsToReveal.forEach((el, i) => {
    gsap.from(el, {
        opacity: 0, 
        y: 60, // Slides up 60px
        duration: 1.2, 
        ease: "power3.out", 
        scrollTrigger: {
            trigger: el, 
            start: "top 85%", // Start when element hits 85% of viewport
            toggleActions: "play none none none", 
        }
    });
});

// --- GSAP Hero Parallax ---
const heroWrapper = document.querySelector('.services-wrapper');

if (heroWrapper) {
    // Parallax logic for Hero section content (optional: requires specific CSS background)
    gsap.to(heroWrapper.querySelector('.services-title'), {
        y: (index, target) => {
            // Check for content element, or just use a fixed negative value
            return -100;
        },
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
            trigger: heroWrapper,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
        }
    });
}


// =========================================================
// 2. BACK TO TOP & THEME TOGGLE
// =========================================================
const backBtn = document.getElementById('backToTop');
if (backBtn) {
    backBtn.style.display = 'none';
    window.addEventListener('scroll', () => {
        // Show button after scrolling past 1.5 times the viewport height
        if (window.scrollY > window.innerHeight / 1.5) backBtn.style.display = 'block';
        else backBtn.style.display = 'none';
    });
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

const themeToggle = document.getElementById('themeToggle');
themeToggle && themeToggle.addEventListener('click', () => {
    const body = document.body;
    const pressed = themeToggle.getAttribute('aria-pressed') === 'true';
    themeToggle.setAttribute('aria-pressed', String(!pressed));
    body.classList.toggle('dark');
    themeToggle.textContent = body.classList.contains('dark') ? "☀️" : "🌓";
});

// =========================================================
// 3. GALLERY MODAL LOGIC (FIXED & COMPLETE)
// =========================================================
const modal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImage');
const thumbs = Array.from(document.querySelectorAll('.gallery-thumb'));
let currentGallery = [];
let currentIndex = 0;

// Helper to get image array from the current card
const buildGalleryFromThumb = (thumb) => {
    const container = thumb.closest('.info-box');
    if (!container) return [];
    return Array.from(container.querySelectorAll('.gallery-thumb')).map(i => ({
        src: i.src,
        alt: i.alt || ''
    }));
};

const openModal = (images, index = 0) => {
    if (!images || !images.length || !modal) return;
    currentGallery = images;
    currentIndex = index;
    modalImg.src = currentGallery[currentIndex].src;
    modalImg.alt = currentGallery[currentIndex].alt || '';
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close')?.focus();
};

const closeModal = () => {
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
};

const showImage = (idx) => {
    currentIndex = (idx + currentGallery.length) % currentGallery.length;
    modalImg.src = currentGallery[currentIndex].src;
    modalImg.alt = currentGallery[currentIndex].alt || '';
};

// Click handlers: open gallery from buttons
document.querySelectorAll('.open-gallery').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.info-box');
        const imgs = Array.from(card.querySelectorAll('.gallery-thumb')).map(i => ({ src: i.src, alt: i.alt }));
        openModal(imgs, 0);
    });
});

// Clicking thumbs open modal to that specific image
thumbs.forEach((t) => {
    t.addEventListener('click', (ev) => {
        const imgs = buildGalleryFromThumb(t);
        const idx = imgs.findIndex(i => i.src === t.src);
        openModal(imgs, idx >= 0 ? idx : 0);
    });
});

// Modal controls
if (modal) {
    document.getElementById('prevImg')?.addEventListener('click', () => showImage(currentIndex - 1));
    document.getElementById('nextImg')?.addEventListener('click', () => showImage(currentIndex + 1));
    modal.querySelector('.modal-close')?.addEventListener('click', closeModal);
    
    // close modal by clicking outside image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// keyboard navigation for modal
window.addEventListener('keydown', (e) => {
    if (modal && modal.style.display === 'flex') {
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'Escape') closeModal();
    }
});


// =========================================================
// 4. IMPROVED MAGIC WAND CURSOR (FIXED & EFFICIENT)
// =========================================================
const wand = document.getElementById('cursor-wand');
let mouseX = -100, mouseY = -100;
let wandX = -100, wandY = -100;
const ease = 0.18;

// Sparkle pool setup (efficiently reuses DOM elements)
const sparklePool = [];
const maxSparkles = 12; 

const makeSparkle = (x, y) => {
    let meta = sparklePool.find(s => !s.inUse);
    let el;
    
    if (!meta) {
        if (sparklePool.length < maxSparkles) {
            el = document.createElement('div');
            el.className = 'sparkle';
            document.body.appendChild(el);
            meta = { el, inUse: false, timeout: null };
            sparklePool.push(meta);
        } else {
            return; // Max sparkles reached
        }
    } else {
        el = meta.el;
    }

    meta.inUse = true;
    el.style.left = (x) + 'px';
    el.style.top = (y) + 'px';
    el.style.opacity = '1';
    el.style.transform = 'scale(1)';
    el.style.pointerEvents = 'none';

    // Animation for sparkle
    const dx = (Math.random() - 0.5) * 20;
    const dy = -Math.random() * 30;
    el.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.2)`, opacity: 0 }
    ], { duration: 700 + Math.random() * 300, easing: 'cubic-bezier(.2,.9,.2,1)' });

    // Free the sparkle after animation
    clearTimeout(meta.timeout);
    meta.timeout = setTimeout(() => { meta.inUse = false; }, 1000);
};

// Mouse movement listener
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // create occasional sparkles (throttle)
    if (Math.random() > 0.8) makeSparkle(mouseX + (Math.random() * 8 - 4), mouseY + (Math.random() * 8 - 4));
});

// Animation loop for smooth wand follow
const animate = () => {
    const dx = mouseX - wandX;
    const dy = mouseY - wandY;
    wandX += dx * ease;
    wandY += dy * ease;
    if (wand) {
        wand.style.left = wandX + 'px';
        wand.style.top = wandY + 'px';
    }
    requestAnimationFrame(animate);
};
animate();

// Accessibility: focus styles for keyboard users (re-enabled logic)
document.querySelectorAll('.info-box').forEach(box => {
    box.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const imgs = Array.from(box.querySelectorAll('.gallery-thumb')).map(i => ({ src: i.src, alt: i.alt }));
            if (imgs.length) openModal(imgs, 0);
        }
    });
});