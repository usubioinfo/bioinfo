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
	$('.sabbi-book_timeline .btn-expand').on('click', function(event) {
		event.preventDefault();
		var btnThis = $(this);
		btnThis.siblings('.book-list').find('.onexpan').slideToggle(200);
		
		if (btnThis.text() != "View Less" ) {
			btnThis.text('View Less');
		} else {
			btnThis.text(btnThis.data('text'));
		}
	});
	
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
		if($(sequenceElement).length) {
		// Launch Sequence on the element, and with the options we specified above
			var mySequence = sequence(sequenceElement, options);
		}
	})();


	$(document).on('click', '[data-toggle="lightbox"]', function(event) {
	    event.preventDefault();
	    $(this).ekkoLightbox();
	});
	if ($("#Inputphone").length) {
		$("#Inputphone").intlTelInput({
	      // allowDropdown: false,
	      // autoHideDialCode: false,
	      // autoPlaceholder: "off",
	      // dropdownContainer: "body",
	      // excludeCountries: ["us"],
	      // formatOnDisplay: false,
	      geoIpLookup: function(callback) {
	        $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
	          var countryCode = (resp && resp.country) ? resp.country : "";
	          callback(countryCode);
	        });
	      },
	      // initialCountry: "auto",
	      // nationalMode: false,
	      // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
	      // placeholderNumberType: "MOBILE",
	      preferredCountries: ['bd', 'jp'],
	      // separateDialCode: true,
	      utilsScript: "assets/tools/intlTelInput/js/utils.js"
	    });
	}

	// Function for email address validation and contact form ajax code
	function validateEmail(email) {
	    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	    return re.test(email);
	}
	/******************** CONTACT FORM ********************/
	$('#contact-form').on('submit', function(e) {
		//console.log($(this).attr('action'));
		var formThat = $(this);
	    e.preventDefault();
	    $('#form_errors').addClass('hide');
	    var data = $(this).serialize();
	    
	    if (validateEmail( $(this).find('input[name="email"]').val() )) {
	        $.ajax({
	            type: "POST",
	            url: $(this).attr('action'),
	            data: data,
	            success: function(res) {
	                //console.log(res);
	                res = $.parseJSON(res);
	                //console.log(formThat.text())
	                if(res.status) {
	                	$('#form_errors').addClass('hide');
	                    $('#form_success').html(res.message).removeClass('hide');
	                    formThat.find('.btn').attr('disabled','disabled');
	                } else {
	                    $('#form_errors').html(res.message).removeClass('hide');
	                }
	            }
	        });
	    } else {
	        $('#form_errors').html('Please give a valid email address').removeClass('hide');
	    }
	    return false;
	});





});
