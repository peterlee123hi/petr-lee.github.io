$(document).ready(function(){
	$('#about-link').click(function() {
		$('html, body').animate({
	        scrollTop: $('section.about').offset().top
	    }, 600);
	});
});
