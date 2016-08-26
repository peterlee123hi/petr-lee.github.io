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
  $('section#design img:not(.ignore)').click(function() {
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
      "name": "United Nations Refugee Agency at Cal",
      "info": "I was requested to make a website for this nonprofit that was dedicated to raising awareness for the refugee crisis in Syria. At the time, I was proficient at more advanced front-end frameworks including Angular, which is the major framework for the website.",
      "link": "http://unrac.berkeley.edu",
      "repo": "https://github.com/UNRAC/unrac.github.io"
    },

    "boilerplate-link": {
      "name": "Front-end Boilerplate",
      "info": "After learning so many different frameworks and plugins for front-end, I decided to compile my own starter code pre-installed with mostly necessary, sometimes extra fancy features for future front-end projects. I also made boilerplates for Materialize and Material Kit PRO. Also note, there have been MAJOR revisions since I made the sample landing page, so the updated boilerplate is on a separate branch.",
      "link": "http://peterlee.tech/FrontendBoilerplate/",
      "repo": "https://github.com/petr-lee/FrontendBoilerplate"
    },

    "hackin-link": {
      "name": "Hack In",
      "info": "At the European Innovation Academy, a 4-week extreme startup accelerator, I founded this tech startup along with a small team of software developers and business specialists. Hack In is a platform that facilitates the recruitment process of software develoepers through customizable and comprehensive software development assessments. Our platform uses Meteor as the web framework. To demo, a sample login is \"sample@company.io\" and the password is \"12345678\".",
      "link": "http://www.hackin.io/",
      "repo": "https://github.com/petr-lee/HackIn"
    },

    "notebook-link": {
      "name": "Petr's Competitive Programming Algorithm Notebook",
      "info": "My journey to becoming a competitive programmer began in the winter break of 2015. After hours of research, practice, and reflection, I realized that becoming a master of competitive programming is more than problem solving skills, but complete mastery of famous algorithms in computer science. This lead to the creation of my algorithm notebook, which contains the algorithms that I run into on my journey to mastery.",
      "link": "http://peterlee.tech/algorithms",
      "repo": "https://github.com/petr-lee/petr-lee.github.io/tree/master/assets/docs/code"
    },

    "alarylanguage-link": {
      "name": "Alary Language",
      "info": "I was requested to make this website for an official club at UC Berkeley. Alary Language focuses on connecting students who are passionate about learning and teaching languages. The club provides a more personal language learning experience with companionship. This website was made in a single day.",
      "link": "http://alarylanguage.club",
      "repo": "https://github.com/petr-lee/AlaryLanguage"
    },

    "yelpmaps-link": {
      "name": "Yelp Maps",
      "info": "I made a program in Python that retrieves data from the Yelp academic dataset and displays a visualization of restaurant ratings using machine learning. Regions are highlighted based on restaurant quality and density. The program generates a Voronoi diagram using k-means clustering algorithm.",
      "repo": "https://github.com/petr-lee/YelpMaps"
    },

    "bearmaps-link": {
      "name": "Bear Maps",
      "info": "Created a clone of Google Maps using the JavaFX library and advanced data structures including a QuadTree and Trie. Bear Maps has a database of images of the Berkeley region and displays corresponding images based on zoom level and location.",
      "link": "http://bearmaps2016.herokuapp.com/",
      "repo": "https://github.com/petr-lee/BearMaps"
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
    if (codeDescriptions[$(this).attr('id')]["link"]) {
      $('#overlay').append(link);
    }
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
