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
		if($(sequenceElement).length) {
		// Launch Sequence on the element, and with the options we specified above
			var mySequence = sequence(sequenceElement, options);
		}
	})();
});
