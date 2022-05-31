(() => {
    var seqEl = document.getElementById("sequence1");
    var researchSlider = document.getElementById("MultiCarousel");
    var options = {
        autoPlay: true,
        autoPlayInterval: 8000,
        autoPlayPauseOnHover: false
    }

    var mySequence = sequence(seqEl,options);
})();