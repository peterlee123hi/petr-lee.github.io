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
      { selector: '#openark-preview', 
        offset: 100, 
        callback: function() {
          $('#openark-preview').addClass('animated fadeInLeft');
        }
      }, 
      { selector: '#openark-desc', 
        offset: 100, 
        callback: function() {
          $('#openark-desc').addClass('animated fadeInRight');
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
        'desc': 'I was requested to make a website for this nonprofit that was dedicated to raising awareness for the refugee crisis in Syria. At the time, I was proficient at more advanced front-end frameworks including Angular, which is the major framework for the website.',
        'link': 'https://unrac.berkeley.edu/#/'
      },

      'boilerplate': {
        'title': 'Front-end Boilerplate',
        'desc': 'After learning so many different frameworks and plugins for front-end, I decided to compile my own starter code pre-installed with mostly necessary, sometimes extra fancy features for future front-end projects. I also made boilerplates for Materialize and Material Kit PRO. Also note, there have been MAJOR revisions since I made the sample landing page, so the updated boilerplate is on a separate branch.',
        'link': 'https://peterlee.tech/FrontendBoilerplate/'
      },

      'hackin': {
        'title': 'Hack In',
        'desc': 'At the European Innovation Academy, a 4-week extreme startup accelerator, I founded this tech startup along with a small team of software developers and business specialists. Hack In is a platform that facilitates the recruitment process of software developers through customizable and comprehensive software development assessments. Our platform uses Meteor as the web framework. To demo, a sample login is "sample@company.io" and the password is "12345678".',
        'link': 'http://hackin.io/'
      },

      'alary': {
        'title': 'Alary Language',
        'desc': 'I was requested to make this website for an official club at UC Berkeley. Alary Language focuses on connecting students who are passionate about learning and teaching languages. The club provides a more personal language learning experience with companionship. This website was made in a single day.',
        'link': 'http://alarylanguage.club/'
      },

      'csm': {
        'title': 'Computer Science Mentors',
        'desc': 'After becoming a member of CSM and visiting the official website, I was inspired to recreate it using a modern material theme. Teaching others is fulfilling for me because I believe that knowledge is always accessible and being able to help other students become passionate about a topic is fulfilling for me. I\'ve always felt that teaching is natural for me because of my detail-oriented nature.',
        'link': 'http://csmberkeley.github.io/#/'
      },

      'launchpad': {
        'title': 'Launchpad',
        'desc': 'After attending a tech talk by the founders of Box, I was inspired to gather the most passionate and intelligent students at UC Berkeley to solve real-world problems with artificial intelligence, machine learning, and data science.',
        'link': 'https://callaunchpad.org/#/'
      },

      'sherlock': {
        'title': 'Project Sherlock',
        'desc': 'My team project for Launchpad was Sherlock who is an artificial intelligence that recognizes different things live through webcams. Aside from Sherlock, we train convolutional neural networks for different computer vision tasks.',
        'link': 'https://sherlock.callaunchpad.org/'
      },

      'lab': {
        'title': 'Web Lab',
        'desc': 'As a project leader, I also had my team of developers create a web lab to showcase live online demos of mini-projects.',
        'link': 'https://lab.callaunchpad.org/'
      },

      'fzcf': {
        'title': 'FZ Cultural Foundation',
        'desc': 'This was my first web project during freshman year for a nonprofit organization located in Texas.',
        'link': 'http://fzculturalfoundation.org/'
      }
    };

    var changeWebModal = function(webID) {
      $('#website-modal h3').text(webInfo[webID]['title']);
      $('#website-modal p').text(webInfo[webID]['desc']);
      $('#website-modal a').attr('href', webInfo[webID]['link']);
      $('#website-modal img').attr('src', 'images/websites/' + webID + '.png');
    };

    $('.launchpad-btn').hover(function() {
      changeWebModal('launchpad');
    });

    $('.csm-btn').hover(function() {
      changeWebModal('csm');
    });

    $('.hackin-btn').hover(function() {
      changeWebModal('hackin');
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

    $('.sherlock-btn').hover(function() {
      changeWebModal('sherlock');
    });

    $('.lab-btn').hover(function() {
      changeWebModal('lab');
    });

    $('.fzcf-btn').hover(function() {
      changeWebModal('fzcf');
    });
  };

  init();
  links();
  scrolling();
  webModal();
});
