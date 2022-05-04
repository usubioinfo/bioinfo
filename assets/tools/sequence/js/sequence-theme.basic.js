(() => {
    var seqEl = document.getElementById("sequence1");
    var options = {
        autoPlay: true,
        autoPlayInterval: 5000,
        autoPlayPauseOnHover: false
    }

    var mySequence = sequence(seqEl,options);
})();