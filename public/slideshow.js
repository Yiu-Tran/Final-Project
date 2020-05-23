function initSlides() {
    var slides = document.getElementsByClassName("slides"); //Get all slides
    var container = document.getElementsByClassName("slideshow-container");
    var urls = ["url('./res/Corvallis2_header_blurred.jpg')",
                "url('./res/OregonCoast_header_blurred.jpg')",
                "url('./res/Weatherford_Hall_header_blurred.jpg')"]
    var slideIndex = 1;
    var i;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; //Hide all slides before showing individually
    }
    showSlides(slides, slideIndex, container, urls);
}


function showSlides(slides, slideIndex, container, urls, slideLength = 10000) {

    if (slideIndex > slides.length){
        slideIndex = 1
    }
    
    var currentSlide = slides[slideIndex-1];
    container[0].style.backgroundImage = urls[slideIndex-1];
    
    currentSlide.style.opacity = 0;
    currentSlide.style.display = "block";
    
    
    setTimeout(function(){fadeIn(currentSlide)},0)
    
    setTimeout(function(){fadeOut(currentSlide)}, 7000)
    
    currentSlide.style.display = "none";
    
    setTimeout(function(){showSlides(slides, slideIndex+1, container, urls)}, 11500)

}


function fadeOut(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}


function fadeIn(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 50);
}