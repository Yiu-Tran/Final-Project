function initSlides() {
    var slides = document.getElementsByClassName("slides"); //Get all slides
    var slideIndex = 1;
    var i;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; //Hide all slides before showing individually
    }
    showSlides(slides, slideIndex);
}


function showSlides(slides, slideIndex, slideLength = 7000) {

    if (slideIndex > slides.length){
        slideIndex = 1
    }
    
    var currentSlide = slides[slideIndex-1]
    
    currentSlide.style.opacity = 0;
    currentSlide.style.display = "block";
    
    
    setTimeout(function(){fadeIn(currentSlide)},0)
    
    setTimeout(function(){fadeOut(currentSlide)}, 7000)
    
    currentSlide.style.display = "none";
    
    setTimeout(function(){showSlides(slides, slideIndex+1)}, 7300)

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
    }, 10);
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
    }, 10);
}