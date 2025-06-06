document.addEventListener("DOMContentLoaded", function() {
    const sliderVideos = document.querySelectorAll('.slider-video');

    sliderVideos.forEach(function(sliderVideo) {
        const video = sliderVideo.querySelector('video');

        sliderVideo.addEventListener('mouseenter', function() {
            video.play();
            sliderVideo.classList.add('playing');
        });

        sliderVideo.addEventListener('mouseleave', function() {
            video.pause();
            sliderVideo.classList.remove('playing');
        });
    });
});


function navigateTo(page) {
    window.location.href = page;
}