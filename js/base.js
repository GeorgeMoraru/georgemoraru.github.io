(function () {
    
    var randomHeroImage = function () {
        var images = ["/img/hero1.jpg", "/img/hero2.jpg", "/img/hero3.jpg", "/img/hero4.jpg", "/img/hero5.jpg", "/img/hero6.jpg"];
        var randomNumber = Math.floor((Math.random() * 6));
        var heroImage = document.querySelector("#heroImg");
        heroImage.src = images[randomNumber];
    }

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

    window.Utils = window.Utils || {};
    Utils.RandomHeroImage = randomHeroImage;
    Utils.ShowConfirmationModal = showConfirmationModal;
    Utils.DismissConfirmationModal = dismissConfirmationModal;
})();
