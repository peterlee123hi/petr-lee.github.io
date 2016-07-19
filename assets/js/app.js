(function($) {
  $(".button-collapse").sideNav();

  particlesJS.load('particles-js', 'assets/config/particles.json');

  // NAVBAR LINKS
  $('a#about-link').click(function() {
    $('html, body').animate({
      scrollTop: $('.cards').offset().top - 64
    }, 500);
  });

  $('a#design-link').click(function() {
    $('html, body').animate({
      scrollTop: $('section#design').offset().top
    }, 500);
  });

  $('a#code-link').click(function() {
    $('html, body').animate({
      scrollTop: $('section#code').offset().top
    }, 500);
  });

  $('a#contact-link').click(function() {
    $('html, body').animate({
      scrollTop: $('footer').offset().top
    }, 500);
  });

  // PORTFOLIO ANIMATIONS
  $('section.portfolio img').hover(function() {
      $(this).stop().animate({"top" : "-10px"}, 250, 'swing');
    }, function() {
      $(this).stop().animate({"top": "0"}, 250, 'swing');
  });

  // Ok, this is annoying.
  // Why won't the animations work?!?!
  $('section#design img').click(function() {
    var img = $('<img>');
    img.attr('src', $(this).attr("src"));
    $('#overlay').append(img);
    $('#overlay').attr("opacity", 0);
    $('#overlay').attr("display", "block");
    $('#overlay').fadeTo(100, 1);
  });

  $('#overlay h6').click(function() {
    $('#overlay').fadeTo(100, 0, function() {
      $('#overlay img').remove();
      $('#overlay').hide();
    });
  });
}(jQuery));
