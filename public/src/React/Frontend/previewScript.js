/*=============== SHOW MENU ===============*/


/*=============== REMOVE MENU MOBILE ===============*/


/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    if(this.scrollY >=50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll',scrollHeader)

/*=============== POPULAR SWIPER ===============*/


/*=============== MIXITUP FILTER FEATURED ===============*/


/* Link active featured */ 


/*=============== SHOW SCROLL UP ===============*/ 


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


/*=============== SCROLL REVEAL ANIMATION ===============*/



/*================ add a video after click on button ====== */
document.addEventListener("DOMContentLoaded", function() {
    const startButtons = document.querySelectorAll(".home__button");
    const closeButton = document.getElementById("closeButton");
    const videoContainer = document.getElementById("videoContainer");

    startButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            videoContainer.style.display = "block";
        });
    });

    closeButton.addEventListener("click", function() {
        videoContainer.style.display = "none";
    });
});


function navigateTo(page) {
    window.location.href = page;
}
