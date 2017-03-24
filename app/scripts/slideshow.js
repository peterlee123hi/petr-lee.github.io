$(function() {
	var showSlide = function(width, image) {
		$('.intro-slide').css('top', '-20px');
		$('.intro-slide').css('background-size', width + 'px auto');
		$('.intro-slide').css('background-image', 'url("images/' + image + '")');
		$('.intro-slide').animate({
			'top': 0,
			'opacity': 1
		}, {
			'duration': 500,
			'easing': 'linear'
		});
		setTimeout(function() {
			$('.intro-slide').animate({
				'top': '20px',
				'opacity': 0
			}, {
				'duration': 500,
				'easing': 'linear'
			});
		}, 2000);
	}

	var index = 0;
	var images = [
		'laptop.png',
		'openark-logo.png',
		'microsoft.png',
		'illustrator.svg'
	];
	var widths = [
		400,
		400,
		400,
		160
	];

	var runSlideshow = function() {
		index = index % images.length;
		showSlide(widths[index], images[index]);
		index += 1;
		setTimeout(runSlideshow, 3000);
	}

	runSlideshow();
});
