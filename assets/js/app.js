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

  // PORTFOLIO INTERACTIVITY
  $('section.portfolio img').hover(function() {
      $(this).stop().animate({"top" : "-10px"}, 250, 'swing');
    }, function() {
      $(this).stop().animate({"top": "0"}, 250, 'swing');
  });

  // DESIGN PORTFOLIO
  $('section#design img').click(function() {
    var img = $('<img>');
    img.attr('src', $(this).attr("src"));
    $('#overlay').append(img);
    $('#overlay').attr("opacity", 0);
    $('#overlay').attr("display", "block");
    $('#overlay').fadeIn(0);
  });

  var codeDescriptions = {
    "fzcf-link": {
      "name": "Feng Zheng Cultural Foundation",
      "info": "This was where it all began. A nonprofit organized by a friend asked me to make their website. I was new to the front-end web development community, and only used Bootstrap to make this website. Looking back at this site, I realized I've come a long way since then.",
      "link": "http://fzculturalfoundation.org/",
      "repo": "https://github.com/fzcf/fzcf.github.io"
    },

    "globaltoday-link": {
      "name": "Global Today",
      "info": "I made this website as a homework assignment for my english class about the environment. It's also the only reason I got an A instead of an A- in the class. I used this project to master pure HTML and CSS.",
      "link": "http://peterlee.tech/GlobalToday/",
      "repo": "https://github.com/petr-lee/GlobalToday"
    },

    "unrac-link": {
      "name": "United Nations Refugee at Cal",
      "info": "I was asked to make a website for this nonprofit that was dedicated to raising awareness for the refugee crisis in Syria. At the time, I was proficient at more advanced front-end frameworks including Angular. I knew Angular was unnecessary for this simple front-end project, but I decided to use it as an exercise.",
      "link": "http://unrac.github.io/#/",
      "repo": "https://github.com/UNRAC/unrac.github.io"
    },

    "boilerplate-link": {
      "name": "Front-end Boilerplate",
      "info": "After learning so many different frameworks and plugins for front-end, I decided to compile my own starter code pre-installed with mostly necessary, sometimes extra fancy features for future front-end projects. I also made boilerplates for Materialize and Material Kit PRO. Also note, there have been MAJOR revisions since I made the sample landing page, so the updated boilerplate is on a separate branch.",
      "link": "http://peterlee.tech/FrontendBoilerplate/",
      "repo": "https://github.com/petr-lee/FrontendBoilerplate"
    }
  };

  // CODE PORTFOLIO
  $('section#code img').click(function() {
    var h1 = $('<h1>');
    var p = $('<p>');
    var img = $('<img>');
    var link = $('<a class="waves-effect waves-light btn blue" target="_blank">');
    var repo = $('<a class="waves-effect waves-light btn blue" target="_blank">');

    h1.text(codeDescriptions[$(this).attr('id')]["name"]);
    p.text(codeDescriptions[$(this).attr('id')]["info"]);
    img.attr('src', $(this).attr("src"));
    link.attr('href', codeDescriptions[$(this).attr('id')]["link"]);
    repo.attr('href', codeDescriptions[$(this).attr('id')]["repo"]);
    link.text("Visit");
    repo.text("Github");

    $('#overlay').append(h1);
    $('#overlay').append(p);
    $('#overlay').append(link);
    $('#overlay').append(repo);
    $('#overlay').append(img);
    $('#overlay').attr("opacity", 0);
    $('#overlay').attr("display", "block");
    $('#overlay').fadeIn(0);
  });

  $('#overlay h6').click(function() {
    $('#overlay').fadeOut(0, function() {
      var x = $('#overlay h6').detach();
      $('#overlay').empty();
      $('#overlay').append(x);
      $('#overlay').hide();
    });
  });
}(jQuery));
