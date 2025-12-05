// Get the modal elements
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");
const span = document.getElementsByClassName("modal-close")[0];

/**
 * Opens the modal/lightbox when an image is clicked.
 * @param {HTMLImageElement} imgElement - The clicked image element.
 */
function openModal(imgElement) {
    // Show the modal
    modal.style.display = "flex";
    
    // Set the image source and alt text
    modalImg.src = imgElement.src;
    captionText.innerHTML = imgElement.alt;
    
    // Disable body scroll when modal is open
    document.body.style.overflow = "hidden";
}

// Close modal when the 'x' is clicked
if (span) {
    span.onclick = function() {
        closeModal();
    }
}

// Close modal when the dark area around the image is clicked (delegated from HTML)
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Attach functions to the global window object so they can be called from HTML
window.openModal = openModal;
window.closeModal = closeModal;