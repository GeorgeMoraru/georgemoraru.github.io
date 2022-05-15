(function () {
    var CarouselActiveIndex = 0;

    var dismissConfirmationModal = function () {
        if (event.srcElement.id == "contact-modal" || event.srcElement.id == "close-btn" ) {
            document.querySelector("#contact-modal").classList.remove("show");
            document.querySelector("body").classList.remove("disable-overflow");
        }
    }

    var showConfirmationModal = function () {
        document.querySelector("#contact-modal").classList.add("show");
        document.querySelector("body").classList.add("disable-overflow");
    }

    var animateCarousel = function () {
        setActiveSlide();
        setInterval(setActiveSlide, 4000);
    };

    var setActiveSlide = function () {
        var carousel = document.querySelector(".carousel-content");
        var carouselImages = carousel.children;
        var activeImage = document.querySelector(".carousel-content .active");
        if (activeImage == null && carouselImages.length > CarouselActiveIndex) {            
            carouselImages[CarouselActiveIndex].classList.add("active");
        } else {
            var oldIndex = CarouselActiveIndex;
            CarouselActiveIndex = CarouselActiveIndex == carouselImages.length - 1 ? CarouselActiveIndex = 0 : CarouselActiveIndex + 1;
            carouselImages[CarouselActiveIndex].classList.add("active");
            setTimeout(function (){
                carouselImages[oldIndex].classList.remove("active");
            }, 3000);
        }
    }

    document.addEventListener("DOMContentLoaded", animateCarousel);

    window.Utils = window.Utils || {};
    Utils.ShowConfirmationModal = showConfirmationModal;
    Utils.DismissConfirmationModal = dismissConfirmationModal;
    
})();
