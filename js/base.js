var randomHeroImage = function(){
    var images = ["/img/hero1.jpg", "/img/hero2.jpg", "/img/hero3.jpg", "/img/hero4.jpg", "/img/hero5.jpg", "/img/hero6.jpg"];
    var randomNumber = Math.floor((Math.random() * 6));
    var heroImage = document.querySelector("#heroImg");
    heroImage.src = images[randomNumber];
}