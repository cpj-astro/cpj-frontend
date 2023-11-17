(function ($) {

	//======================
	// Preloder
	//======================
	$(window).on("load", function () {
		$("#preloader").fadeOut();
		$("#preloader").delay(500).fadeOut("slow");
		$("body").delay(500).css({ overflow: "visible" });
	});

	$("#price-slider").slider({
		range: true,
		min: 10,
		max: 1000,
		values: [10, 1000],
		slide: function (event, ui) {
			$(".price-filter .amount").text("Range: $" + ui.values[0] + " - $" + ui.values[1]);
		},
	});
	// $(".price-filter .amount").val("$" + $(".price-filter").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));

	$(function() { 
		$('.mega-menu li a:not(:only-child)').click(function(e) {
		  $(this).siblings('.mega-menu', 'sub-menu').toggle();
		  e.stopPropagation();
		});
		$('.has-menu-child').click(function() {
		  $('.mega-menu', this).slideToggle();
		  $('.sub-menu', this).slideToggle();
		});
	});

	$(".mobile-nav-toggler").on("click", function (e) {
		$(".nav-menu > ul").slideToggle();
	});

	$(".mini-cart-btn > a").on("click", function (e) {
		e.preventDefault();
		$(".mc-panel").slideToggle("fast");
	});

	$(".mc-close").on("click", function (e) {
		e.preventDefault();
		$(".mc-panel").slideUp("fast");
	});

	// Logged user
	$(".logged-user > a").on("click", function (e) {
		e.preventDefault();
		$(".logged-user-dropdown").slideToggle("fast");
	});

	// Quantity
	$(".decressQnt").on("click", function () {
		let qntValue = $(this).siblings(".qnttinput").val();
		$(this)
			.siblings(".qnttinput")
			.val(+qntValue !== 0 ? +qntValue - 1 : 0);
	});

	$(".incressQnt").on("click", function () {
		let qntValue = $(this).siblings(".qnttinput").val();
		$(this)
			.siblings(".qnttinput")
			.val(+qntValue + 1);
	});
})(jQuery);
