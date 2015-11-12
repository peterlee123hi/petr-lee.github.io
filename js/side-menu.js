$(document).ready(function() {
	$(".side-menu-toggle").click(function() {
		$(".contain-side-menu").toggleClass("active");
		$(".side-menu").toggleClass("active");
		$(".side-menu-toggle").toggleClass("active");
	});
});