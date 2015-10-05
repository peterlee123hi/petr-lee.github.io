$(document).ready(function() {
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