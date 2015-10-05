$(document).ready(function() {
	$('.project').css({
		'opacity': 0,
		'padding-top': '10px'
	});

	$('#durd').animate({
		'opacity': 1,
		'padding-top': '0'
	}, 500, 'linear', function() {
			$('#moochr').animate({
			'opacity': 1,
			'padding-top': '0'
		}, 500, 'linear');
	});
});