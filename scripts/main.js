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

				if (pageID === 'design') {
					loadIsoGrids();
				}
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

	var loadIsoGrids = function loadIsoGrids() {
		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		[].slice.call(document.querySelectorAll('.isolayer')).forEach(function (el) {
			new IsoGrid(el, {
				type: 'scrollable',
				transform: 'translateX(-15vw) translateY(275px) rotateX(45deg) rotateZ(45deg)',
				stackItemsAnimation: {
					properties: function properties(pos) {
						return {
							translateZ: (pos + 1) * 50,
							rotateZ: getRandomInt(-3, 3)
						};
					},
					options: function options(pos, itemstotal) {
						return {
							type: dynamics.bezier,
							duration: 500,
							points: [{ 'x': 0, 'y': 0, 'cp': [{ 'x': 0.2, 'y': 1 }] }, { 'x': 1, 'y': 1, 'cp': [{ 'x': 0.3, 'y': 1 }] }]
						};
					}
				},
				onGridLoaded: function onGridLoaded() {
					classie.add(document.body, 'grid-loaded');
				}
			});
		});
	};
});