$(function() {
	var currentLocation = 'intro';

	setTimeout(function() {
		$('.intro-header').css('opacity', 1);
		$('.links').css('opacity', 1);
	}, 500);

	var transition = function (event, pageID) {
		$('.background').css(
			'z-index', 
			'99999999'
		);
		$('.background').css(
			'opacity', 
			'1'
		);

		setTimeout(function() {
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

			$('.background').css(
				'opacity', 
				'0'
			);
			setTimeout(function() {
				$('.background').css(
					'z-index', 
					'-1'
				);
			}, 1000);
		}, 1000);
	};

	$('.intro-btn').click(function(e) {
		transition(e, 'intro');
	});

	$('.code-btn').click(function(e) {
		transition(e, 'code');
	});

	$('.web-btn').click(function(e) {
		transition(e, 'web');
	});

	$('.design-btn').click(function(e) {
		transition(e, 'design');
	});

	$('.theory-btn').click(function(e) {
		transition(e, 'theory');
	});

	$('.music-btn').click(function(e) {
		transition(e, 'music');
	});
});