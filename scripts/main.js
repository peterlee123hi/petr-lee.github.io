'use strict';

$(function () {
	var currentLocation = 'intro';

	var transition = function transition(pageID) {
		$('.background').addClass('background-active');

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

			$('.background').removeClass('background-active');
		}, 1500);
	};

	$('.intro-btn').click(function () {
		transition('intro');
	});

	$('.code-btn').click(function () {
		transition('code');
	});

	$('.web-btn').click(function () {
		transition('web');
	});

	$('.design-btn').click(function () {
		transition('design');
	});

	$('.theory-btn').click(function () {
		transition('theory');
	});

	$('.music-btn').click(function () {
		transition('music');
	});
});