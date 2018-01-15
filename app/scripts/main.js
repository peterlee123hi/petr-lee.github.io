$(function() {
  var introTop = $('#intro').position().top;
  var introMid = introTop + $('#intro').height() / 2;
  var introBottom = introTop + $('#intro').height();
  var projectsTop = $('#projects').position().top;
  var projectsMid = projectsTop + $('#projects').height() / 2;
  var projectsBottom = projectsTop + $('#projects').height();

  var init = function() {
    var positionTop = $('html').offset().top;
    $('.button-collapse').sideNav();
    $('.modal').modal();

    $('ul.side-nav li a').click(function() {
      $('.button-collapse').sideNav('hide');
    });

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

    $('.materialboxed').materialbox();

    window.sr = ScrollReveal();
    sr.reveal('#web .col');
  };

  /*** NAV LINKS ***/
  var links = function() {
    $('a[href*="#"]:not([href="#"]):not([href="#about-modal"]):not([href="#website-modal"])').click(function() {
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
        $('nav img').attr('src', 'images/personal_banner.png');
      } else {
        $('nav').addClass('darkNav');
        $('nav img').attr('src', 'images/personal_banner_light.png');
      }
    });

    var options = [
      { selector: '#microsoft-video', 
        offset: 100, 
        callback: function() {
          $('#microsoft-video').addClass('animated fadeInLeft');
        }
      }, 
      { selector: '#microsoft-desc', 
        offset: 100, 
        callback: function() {
          $('#microsoft-desc').addClass('animated fadeInRight');
        }
      },
      { selector: '#sherlock-video', 
        offset: 100, 
        callback: function() {
          $('#sherlock-video').addClass('animated fadeInLeft');
        }
      }, 
      { selector: '#sherlock-desc', 
        offset: 100, 
        callback: function() {
          $('#sherlock-desc').addClass('animated fadeInRight');
        }
      },
      { selector: '#ai-video', 
        offset: 100, 
        callback: function() {
          $('#ai-video').addClass('animated fadeInLeft');
        }
      }, 
      { selector: '#ai-desc', 
        offset: 100, 
        callback: function() {
          $('#ai-desc').addClass('animated fadeInRight');
        }
      }
    ];

    Materialize.scrollFire(options);
  };

  /*** WEB MODAL ***/
  var webModal = function() {
    var webInfo = {
      'unrac': {
        'title': 'United Nations Refugee Agency at Cal',
        'desc': 'In my freshman year, I was asked to make a website for a local nonprofit that was dedicated to raising awareness for the refugee crisis in Syria.',
        'link': 'https://unrac.berkeley.edu/#/'
      },

      'boilerplate': {
        'title': 'Front-end Boilerplate',
        'desc': 'After getting my PhD in Javascript, I compiled my own starter code pre-installed with mostly necessary, some extra fancy features for future front-end projects. Now days, I use Yeoman though...',
        'link': 'https://peterlee.tech/FrontendBoilerplate/'
      },

      'alary': {
        'title': 'Alary Language',
        'desc': 'I was requested to make this website for an official club at UC Berkeley. Alary Language focuses on connecting students who are passionate about learning and teaching languages. The club provides a more personal language learning experience with companionship. This website was made in a single day.',
        'link': 'https://peterlee.tech/AlaryLanguage'
      },

      'csm': {
        'title': 'Computer Science Mentors',
        'desc': 'CSM is the largest student organization on campus that provides resources for aspiring computer science students. After becoming a member for a semester, I recreated the homepage using a modern material theme that became the official website!',
        'link': 'https://csmentors.berkeley.edu'
      },

      'cp': {
        'title': 'Competitive Programming',
        'desc': 'In junior year, I competed in the ACM-ICPC Pacific NW Regional competition. I compiled a personal algorithm notebook for reference.',
        'link': 'https://peterlee.tech/CPNotebook'
      },

      'rubik': {
        'title': 'Rubik Scanner',
        'desc': 'Over winter break of my junior year, I found my old Rubik\'s cube that I used for speedcubing years ago. I forgot how to solve it, so I decided to build a website to solve it for me.',
        'link': 'https://rubikscan.webcam'
      }
    };

    var changeWebModal = function(webID) {
      $('#website-modal h3').text(webInfo[webID]['title']);
      $('#website-modal p').text(webInfo[webID]['desc']);
      $('#website-modal a').attr('href', webInfo[webID]['link']);
      $('#website-modal img').attr('src', 'images/websites/' + webID + '.png');
    };

    $('.csm-btn').hover(function() {
      changeWebModal('csm');
    });

    $('.unrac-btn').hover(function() {
      changeWebModal('unrac');
    });

    $('.boilerplate-btn').hover(function() {
      changeWebModal('boilerplate');
    });

    $('.alary-btn').hover(function() {
      changeWebModal('alary');
    });

    $('.cp-btn').hover(function() {
      changeWebModal('cp');
    });

    $('.rubik-btn').hover(function() {
      changeWebModal('rubik');
    });
  };

  init();
  links();
  scrolling();
  webModal();
});
