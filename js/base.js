var randomHeroImage = function(){
    var images = ["/img/hero1.jpg", "/img/hero2.jpg", "/img/hero3.jpg", "/img/hero4.jpg", "/img/hero5.jpg"];
    var randomNumber = Math.floor((Math.random() * 5));
    var heroImage = document.querySelector("#heroImg");
    heroImage.src = images[randomNumber];
}

var initMap = function() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.031 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}

