(function($){
  $(".button-collapse").sideNav();

  particlesJS.load('particles-js', 'assets/config/particles.json');

  // NAVBAR LINKS
  $('a#about-link').click(function() {
    $('html, body').animate({
      scrollTop: $('.cards').offset().top - 64
    }, 500);
  });

  $('a#about-link').click(function() {
    $('html, body').animate({
      scrollTop: $('section#design').offset().top - 64
    }, 500);
  });

  // PORTFOLIO ANIMATIONS
  $('section.portfolio img').hover(function() {
      $(this).stop().animate({"top" : "-10px"}, 250, 'swing');
    }, function() {
      $(this).stop().animate({"top": "0"}, 250, 'swing');
  });
}(jQuery));
