$(document).ready(function(){
	$('#about-link').click(function() {
		$('html, body').animate({
	        scrollTop: $('section.about').offset().top
	    }, 1000);
	});

	$('#design-link').click(function() {
		$('html, body').animate({
	        scrollTop: $('section#design-portfolio').offset().top
	    }, 1000);
	});

	$('#web-link').click(function() {
		$('html, body').animate({
	        scrollTop: $('section#web-portfolio').offset().top
	    }, 1400);
	});

	$('section.portfolio img').hover(function(){
			$(this).stop().animate({"top" : "-10px"});
		}, function(){
	 		$(this).stop().animate({"top": "0"});
	});

	$('#design-portfolio img').click(function(){
		var img = $('<img>');
		img.attr('src', $(this).attr("src"));
		$('#overlay').append(img);
		$('#overlay').attr("opacity", 0);
		$('#overlay').attr("display", "block");
		$('#overlay').fadeTo(1000, 1);
	});

	$('#overlay h6').click(function() {
		$('#overlay').fadeTo(1000, 0, function() {
			$('#overlay img').remove();
			$('#overlay').hide();
		});
	});
});