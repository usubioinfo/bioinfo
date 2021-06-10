/*
develop by: https://authlab.io/
Description: work with the One in a Million people who have the ability to change the world Are You One
Version: 0.1.0
Author: Nurealamsabbir
Author URI: fb.com/nurealam.sabbir
email:hello@authlab.io;
*/
jQuery(document).ready(function($) {
	"use strict";

	var sequenceElement_single = document.getElementById("sequence-single");

	// Place your Sequence options here to override defaults
	// See: http://sequencejs.com/documentation/#options
	var options = {
	  startingStepAnimatesIn: true,
	  autoPlay: false,
	  /* Make this the same as the animateCanvasDuration */
	  phaseThreshold: 250,
	  preloader: false,
	  reverseWhenNavigatingBackwards: false,
	  fadeStepWhenSkipped: false,
	  navigationSkip: true
	}
	if($(sequenceElement_single).length) {
		var mySequence_single = sequence(sequenceElement_single, options);
	}
	// Launch Sequence on the element, and with the options we specified above


	(function(){
		var sequenceElement = document.getElementById("sequence");
		//console.log(sequenceElement)

		// Place your Sequence options here to override defaults
		// See: http://sequencejs.com/documentation/#options
		var options = {
		  startingStepAnimatesIn: true,
		  autoPlay: false,
		  /* Make this the same as the animateCanvasDuration */
		  phaseThreshold: 250,
		  preloader: true,
		  reverseWhenNavigatingBackwards: true,
		  keyNavigation: true,
		  fadeStepWhenSkipped: false
		}
	})();


	$(document).on('click', '[data-toggle="lightbox"]', function(event) {
	    event.preventDefault();
	    $(this).ekkoLightbox();
	});
});
