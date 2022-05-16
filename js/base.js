(function () {
    var CarouselActiveIndex = 0;

    var dismissConfirmationModal = function () {
        if (event.srcElement.id == "contact-modal" || event.srcElement.id == "close-btn" ) {
            document.querySelector("#contact-modal").classList.remove("show");
            document.querySelector("body").classList.remove("disable-overflow");
            window.location.hash = "";
        }
    }

    var showConfirmationModal = function () {
        window.location.hash = "#modal";
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        document.querySelector("#contact-modal").classList.add("show");
        document.querySelector("body").classList.add("disable-overflow");
    }

    var animateCarousel = function () {
        setActiveSlide();
        setInterval(setActiveSlide, 5000);
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
            }, 5000);
        }
    }

    var reveal = function() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            } else {
                reveals[i].classList.remove("active");
            }
        }
    }

    var initialize = function () {
        animateCarousel();
        disableOverflow();
        window.location.hash = "";
    }
   
    var handleHashChange = function () {
        if(window.location.hash == "#modal") {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        } else {
            disableOverflow();
            document.querySelector("#contact-modal").classList.remove("show");
        }
    }

    var disableOverflow = function() {
        document.querySelector("body").classList.remove("disable-overflow");
    }

    var goTo = function (id) {
        document.querySelector("#" + id).scrollIntoView({ behavior: "smooth" });
    }

    document.addEventListener("DOMContentLoaded", initialize);
    window.addEventListener("scroll", reveal);
    window.addEventListener("hashchange", handleHashChange);

    window.Utils = window.Utils || {};
    Utils.ShowConfirmationModal = showConfirmationModal;
    Utils.DismissConfirmationModal = dismissConfirmationModal;
    Utils.goTo = goTo;
})();
