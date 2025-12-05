// Simple JavaScript for future interactivity (optional)

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('bg-video');
    
    // Check if the video is ready to play
    if (video) {
        video.onloadeddata = () => {
            console.log("Video background is loaded and ready.");
        };

        // You could add an event listener to pause/play the video if the user wants
        // Example:
        // const discoverBtn = document.querySelector('.discover-btn');
        // discoverBtn.addEventListener('click', () => {
        //     alert("Discover button clicked!");
        //     // video.pause(); 
        // });
    }
});