var scrollFunction = function() {
    var sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if(section.className.indexOf("active") > -1) {
            section.className = section.className.replace(" active", "");
        } else {
            section.className = section.className + " active";
            section.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }
    })
}

document.addEventListener("wheel",scrollFunction);
document.addEventListener("touchmove",scrollFunction);
window.addEventListener("touchmove",scrollFunction);