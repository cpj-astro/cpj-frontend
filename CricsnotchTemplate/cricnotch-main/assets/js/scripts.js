(function ($) {

	//======================
	// Preloder
	//======================
	$(window).on("load", function () {
		$("#preloader").fadeOut();
		$("#preloader").delay(500).fadeOut("slow");
		$("body").delay(500).css({ overflow: "visible" });
	});

	$(".editors-pick").owlCarousel({
		dots: false,
		loop: true,
		margin: 10,
		nav: true,
		navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
		responsive: {
			0: {
				items: 1,
			},
			600: {
				items: 3,
			},
			// 1000: {
			// 	items: 5,
			// },
		},
	});

	$(".featVideo-caro").owlCarousel({
		autoplay: true,
		dots: true,
		loop: true,
		margin: 10,
		nav: false,
		items: 1,
	});

	$(".preview-caro").owlCarousel({
		autoplay: true,
		dots: true,
		loop: true,
		margin: 10,
		nav: false,
		items: 1,
		thumbs: true,
		thumbsPrerendered: true,
	});

	$(".score-card-caro").owlCarousel({
		autoplay: false,
		dots: false,
		loop: false,
		margin: 30,
		nav: false,
		items: 4,
		responsive: {
			0: {
				items: 1,
			},
			480: {
				items: 2,
			},
			768: {
				items: 3,
			},
			1000: {
				items: 4,
			},
		},
	});

	$(".related-product-caro").owlCarousel({
		autoplay: false,
		dots: false,
		loop: false,
		margin: 30,
		nav: false,
		items: 4,
		responsive: {
			0: {
				items: 1,
			},
			480: {
				items: 2,
			},
			768: {
				items: 3,
			},
			1000: {
				items: 4,
			},
		},
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

	// $(window).on("load", function () {
	// 	if ($(window).width() < 992) {
	// 		$(".has-menu-child").on("click", function (e) {
	// 			e.preventDefault();
	// 			$(".mega-menu", this).slideToggle();
	// 			$(".sub-menu", this).slideToggle();
	// 		});
	// 	}
	// });

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
