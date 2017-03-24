'use strict';

$(function () {
	var currentLocation = 'intro';

	setTimeout(function () {
		$('.intro-header').css('opacity', 1);
		$('.links').css('opacity', 1);
	}, 500);

	var transition = function transition(event, pageID) {
		$('.background').css('-webkit-clip-path', 'circle(150vmax at 0px 0px)');
		$('.background').css('clip-path', 'circle(150vmax at 0px 0px)');

		setTimeout(function () {
			if (pageID === 'intro') {
				$('#intro').removeClass('hide');
				$('.page').addClass('hide');
			} else {
				$('#intro').addClass('hide');
				$('.page').removeClass('hide');

				$('section').addClass('hide');
				$('section#' + pageID).removeClass('hide');
			}
			currentLocation = pageID;

			$('.background').css('-webkit-clip-path', 'circle(0vmax at 0px 0px)');
			$('.background').css('clip-path', 'circle(0vmax at 0px 0px)');
		}, 1500);
	};

	$('.intro-btn').click(function (e) {
		transition(e, 'intro');
	});

	$('.code-btn').click(function (e) {
		transition(e, 'code');
	});

	$('.web-btn').click(function (e) {
		transition(e, 'web');
	});

	$('.design-btn').click(function (e) {
		transition(e, 'design');
	});

	$('.theory-btn').click(function (e) {
		transition(e, 'theory');
	});

	$('.music-btn').click(function (e) {
		transition(e, 'music');
	});
});
'use strict';

$(function () {
	var showSlide = function showSlide(width, image) {
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
		setTimeout(function () {
			$('.intro-slide').animate({
				'top': '20px',
				'opacity': 0
			}, {
				'duration': 500,
				'easing': 'linear'
			});
		}, 2000);
	};

	var index = 0;
	var images = ['laptop.png', 'openark-logo.png', 'microsoft.png', 'illustrator.svg'];
	var widths = [400, 400, 400, 160];

	var runSlideshow = function runSlideshow() {
		index = index % images.length;
		showSlide(widths[index], images[index]);
		index += 1;
		setTimeout(runSlideshow, 3000);
	};

	runSlideshow();
});