$(function() {
  var introTop = $('#intro').position().top;
  var introMid = introTop + $('#intro').height() / 2;
  var introBottom = introTop + $('#intro').height();
  var projectsTop = $('#projects').position().top;
  var projectsMid = projectsTop + $('#projects').height() / 2;
  var projectsBottom = projectsTop + $('#projects').height();

  var init = function() {
    var positionTop = $('html').offset().top;
    $(".button-collapse").sideNav();

    setTimeout(function() {
      $('main div h1').addClass('animated fadeInUp');
    }, 500);
    setTimeout(function() {
      $('main div h2').addClass('animated fadeInUp');
    }, 900);
    setTimeout(function() {
      $('main div a').css('opacity', 1);
      $('main div a').addClass('animated zoomIn');
    }, 1300);

    setTimeout(function() {
      $('nav').addClass('animated fadeInDown');
    }, 1300);
    setTimeout(function() {
      $('div.navbar-fixed').css('opacity', '0.95');
    }, 2000);
  };

  /*** NAV LINKS ***/
  var links = function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 60
          }, 600);
          return false;
        }
      }
    });
  };

  /*** SCROLLING ANIMATIONS ***/
  /*** REPLACE WITH SCROLLFIRE ***/
  var scrolling = function() {
    $(window).scroll(function() {
      var scrollTop = $(window).scrollTop();

      if (scrollTop < introMid) {
        $('nav').removeClass('short');
        $('nav').addClass('no-shadow');
      } else {
        $('nav').addClass('short');
        $('nav').removeClass('no-shadow');
      }

      var viewingProjects = (projectsTop - 60) <= scrollTop
        && scrollTop <= projectsBottom;
      if (!viewingProjects) {
        $('nav').removeClass('darkNav');
      } else {
        $('nav').addClass('darkNav');
      }
    });
  }

  init();
  links();
  scrolling();
});