$(function () {
	var scroll = new SmoothScroll('a[href*="#"]');
	$(document).on('scroll', function () {
		$('.nav-sidebar nav').css({
			'position': 'fixed'
		});
	});
});