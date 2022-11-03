(function ($) {
	
	"use strict";

	// Window Resize Mobile Menu Fix
	mobileNav();


	// Scroll animation init
	window.sr = new scrollReveal();
	

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 130
				}, 700);
				return false;
			}
		}
	});

	$(document).ready(function () {
	    $(document).on("scroll", onScroll);
	    
	    //smoothscroll
	    $('a[href^="#"]').on('click', function (e) {
	        e.preventDefault();
	        $(document).off("scroll");
	        
	        $('a').each(function () {
	            $(this).removeClass('active');
	        })
	        $(this).addClass('active');
	      
	        var target = this.hash,
	        menu = target;
	       	var target = $(this.hash);
	        $('html, body').stop().animate({
	            scrollTop: (target.offset().top) - 130
	        }, 500, 'swing', function () {
	            window.location.hash = target;
	            $(document).on("scroll", onScroll);
	        });
	    });
	});

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.nav ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}


	// Home seperator
	if($('.home-seperator').length) {
		$('.home-seperator .left-item, .home-seperator .right-item').imgfix();
	}


	// Home number counterup
	if($('.count-item').length){
		$('.count-item strong').counterUp({
			delay: 10,
			time: 1000
		});
	}


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function() {
		mobileNav();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function() {
			if(width < 992) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}


})(window.jQuery);


// *** Inicio Slider Comentarios ***

jQuery(document).ready(function ($) {
	var feedbackSlider = $(".feedback-slider");
	feedbackSlider.owlCarousel({
		items: 1,
		nav: true,
		dots: true,
		autoplay: true,
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		autoplayTimeout: 15000,
		smartSpeed: 800,
		navText: [
			"<i class='fa fa-long-arrow-left'></i>",
			"<i class='fa fa-long-arrow-right'></i>"
		],
		responsive: {
			// breakpoint from 767 up
			767: {
				items: 1,
				nav: true,
				dots: false
			},
			// breakpoint from 991 up
			991: {
				items: 2,
				nav: true,
				dots: false
			}
		}
	});

	feedbackSlider.on("translate.owl.carousel", function () {
		$(".feedback-slider-item h3")
			.removeClass("animated fadeIn")
			.css("opacity", "0");
		$(".feedback-slider-item img, .feedback-slider-thumb img, .customer-rating")
			.removeClass("animated zoomIn")
			.css("opacity", "0");
	});

	feedbackSlider.on("translated.owl.carousel", function () {
		$(".feedback-slider-item h3").addClass("animated fadeIn").css("opacity", "1");
		$(".feedback-slider-item img, .feedback-slider-thumb img, .customer-rating")
			.addClass("animated zoomIn")
			.css("opacity", "1");
	});
	feedbackSlider.on("changed.owl.carousel", function (property) {
		var current = property.item.index;
		var prevThumb = $(property.target)
			.find(".owl-item")
			.eq(current)
			.prev()
			.find("img")
			.attr("src");
		var nextThumb = $(property.target)
			.find(".owl-item")
			.eq(current)
			.next()
			.find("img")
			.attr("src");
		var prevRating = $(property.target)
			.find(".owl-item")
			.eq(current)
			.prev()
			.find("span")
			.attr("data-rating");
		var nextRating = $(property.target)
			.find(".owl-item")
			.eq(current)
			.next()
			.find("span")
			.attr("data-rating");
		$(".thumb-prev").find("img").attr("src", prevThumb);
		$(".thumb-next").find("img").attr("src", nextThumb);
		$(".thumb-prev")
			.find("span")
			.next()
			.html(prevRating + '<i class="fa fa-star"></i>');
		$(".thumb-next")
			.find("span")
			.next()
			.html(nextRating + '<i class="fa fa-star"></i>');
	});
	$(".thumb-next").on("click", function () {
		feedbackSlider.trigger("next.owl.carousel", [300]);
		return false;
	});
	$(".thumb-prev").on("click", function () {
		feedbackSlider.trigger("prev.owl.carousel", [300]);
		return false;
	});
}); //end ready

// *** Fin Slider Comentarios ***

// *** Inicio Slider Equipo ***

var sliderTeam = (function(document, $) {
  
	'use strict';
	
	var $sliderTeams = $('.slider--teams'),
		$list = $('#list'),
		$listItems = $('#list li'),
		$nItems = $listItems.length,
		$nView = 3,
		autoSlider,
		$current = 0,
		$isAuto = true,
		$acAuto = 3500,
		
		_init = function() {
		  _initWidth();
		  _eventInit();
		},
		
		_initWidth = function() {
		  $list.css({
			'margin-left': ~~(100 / $nView) + '%',
			'width': ~~(100 * ($nItems / $nView)) + '%'
		  });
		  $listItems.css('width', 100 / $nItems + '%');
		  $sliderTeams.velocity({ opacity: 1 }, { display: "block" }, { delay:1000 });
		},
		
		_eventInit = function() {
		  
		  window.requestAnimFrame = (function() {
			return  window.requestAnimationFrame       || 
				window.webkitRequestAnimationFrame || 
				window.mozRequestAnimationFrame    || 
				window.oRequestAnimationFrame      || 
				window.msRequestAnimationFrame     || 
				function(callback, element){
				  window.setTimeout(callback, 1000 / 60);
				};
		  })();
  
		  window.requestInterval = function(fn, delay) {
			  if( !window.requestAnimationFrame       && 
				  !window.webkitRequestAnimationFrame && 
				  !window.mozRequestAnimationFrame    && 
				  !window.oRequestAnimationFrame      && 
				  !window.msRequestAnimationFrame)
					  return window.setInterval(fn, delay);
			  var start = new Date().getTime(),
			  handle = new Object();
  
			  function loop() {
				  var current = new Date().getTime(),
				  delta = current - start;
				  if(delta >= delay) {
					  fn.call();
					  start = new Date().getTime();
				  }
				  handle.value = requestAnimFrame(loop);
			  };
			  handle.value = requestAnimFrame(loop);
			  return handle;
		  }
  
		  window.clearRequestInterval = function(handle) {
			  window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
			  window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value)   :
			  window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
			  window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
			  window.msCancelRequestAnimationFrame ? msCancelRequestAnimationFrame(handle.value) :
			  clearInterval(handle);
		  };
		  
		  $.each($listItems, function(i) {
			var $this = $(this);
			$this.on('touchstart click', function(e) {
			  e.preventDefault();
			  _stopMove(i);
			  _moveIt($this, i);
			});
		  });
		  
		  autoSlider = requestInterval(_autoMove, $acAuto);
		},
		
		_moveIt = function(obj, x) {
		  
		  var n = x;
		  
		  obj.find('figure').addClass('active');        
		  $listItems.not(obj).find('figure').removeClass('active');
		  
		  $list.velocity({
			translateX: ~~((-(100 / $nItems)) * n) + '%',
			translateZ: 0
		  }, {
			duration: 1000,
			easing: [400, 26],
			queue: false
		  });
		  
		},
		
		_autoMove = function(currentSlide) {
		  if ($isAuto) { 
			$current = ~~(($current + 1) % $nItems);
		  } else {
			$current = currentSlide;
		  }
		  console.log($current);
		  _moveIt($listItems.eq($current), $current);
		},
		
		_stopMove = function(x) {
		  clearRequestInterval(autoSlider);
		  $isAuto = false;
		  _autoMove(x);
		};
	
	return {
	  init: _init
	};
  
  })(document, jQuery);
  
  $(window).load(function(){
	'use strict';
	sliderTeam.init();
  });

// *** Fin Slider Equipo ***