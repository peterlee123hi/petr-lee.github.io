$(document).ready(function(){
	$('#email-popup').hide();

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
	    }, 1500);
	});

	$('#project-link').click(function() {
		$('html, body').animate({
	        scrollTop: $('section#project-portfolio').offset().top
	    }, 2000);
	});

	$('#contact-link').click(function() {
		$('html, body').animate({
	        scrollTop: $('section.contact').offset().top
	    }, 2000);
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

	$('#email-link').hover(function() {
		$('#email-popup').fadeIn(400);
	}, function() {
		$('#email-popup').fadeOut(400);
	});

        $('#email-link').click(function() {
            var email = 'peter.lee@berkeley.edu';
            var subject = 'Hi, Peter!';
            window.open('mailto:' + email + '?subject=' + subject, '_blank');
        });

	var link;
	$('section.web-portfolio div.web-cover p').hover(function() {
		$(this).css('color', 'red');
		link = $(this).closest('a');
		link.bind('click', function(e){
		  e.preventDefault();
		});
	}, function() {
		$(this).css('color', 'white');
		link.unbind('click');
	});

	$('#fzcf-link').click(function() {
		window.open('https://github.com/fzcf/fzcf.github.io', '_blank');
	});

	$('#unrac-link').click(function() {
		window.open('https://github.com/UNRAC/unrac.github.io', '_blank');
	});

	$('#boilerplate-link').click(function() {
		window.open('https://github.com/petr-lee/FrontendBoilerplate', '_blank');
	});

	$('#globaltoday-link').click(function() {
		window.open('https://github.com/petr-lee/GlobalToday', '_blank');
	});

	$('#resume-link').click(function() {
		window.open('./docs/resume.pdf', '_blank');
	});

	$('#github-link').click(function() {
		window.open('https://github.com/petr-lee', '_blank');
	});
});
