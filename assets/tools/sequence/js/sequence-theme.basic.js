(() => {
    var seqEl = document.getElementById("sequence1");
    var researchSlider = document.getElementById("MultiCarousel");
    var options = {
        autoPlay: true,
        autoPlayInterval: 5000,
        autoPlayPauseOnHover: false
    }

    var mySequence = sequence(seqEl,options);
})();