$(function() {
	var currentWebPreview = 'launchpad';

	var webInfo = {
	    'unrac': {
	      'title': 'United Nations Refugee Agency at Cal',
	      'desc': 'I was requested to make a website for this nonprofit that was dedicated to raising awareness for the refugee crisis in Syria. At the time, I was proficient at more advanced front-end frameworks including Angular, which is the major framework for the website.',
	    },

	    'boilerplate': {
	      'title': 'Front-end Boilerplate',
	      'desc': 'After learning so many different frameworks and plugins for front-end, I decided to compile my own starter code pre-installed with mostly necessary, sometimes extra fancy features for future front-end projects. I also made boilerplates for Materialize and Material Kit PRO. Also note, there have been MAJOR revisions since I made the sample landing page, so the updated boilerplate is on a separate branch.',
	    },

	    'hackin': {
	      'title': 'Hack In',
	      'desc': 'At the European Innovation Academy, a 4-week extreme startup accelerator, I founded this tech startup along with a small team of software developers and business specialists. Hack In is a platform that facilitates the recruitment process of software develoepers through customizable and comprehensive software development assessments. Our platform uses Meteor as the web framework. To demo, a sample login is "sample@company.io" and the password is "12345678".',
	    },

	    'alary': {
	      'title': 'Alary Language',
	      'desc': 'I was requested to make this website for an official club at UC Berkeley. Alary Language focuses on connecting students who are passionate about learning and teaching languages. The club provides a more personal language learning experience with companionship. This website was made in a single day.',
	    },

	    'csm': {
	      'title': 'Computer Science Mentors',
	      'desc': 'After becoming a member of CSM and visiting the official website, I was inspired to recreate it using a modern material theme. It is still a work in progress, but hopefully will become the official website in a few weeks at "csmentors.berkeley.edu".',
	    },

	    'launchpad': {
	      'title': 'Launchpad',
	      'desc': 'After attending a tech talk by the founders of Box, I was inspired to gather the most passionate and intelligent students at UC Berkeley to solve real-world problems with artificial intelligence, machine learning, and data science.',
	    }
	}

	var changeWebPreview = function(webID) {
		if (currentWebPreview != webID) {
			$('.web-preview-link').removeClass('selected');
			$('.' + webID + '-btn').addClass('selected');
			currentWebPreview = webID;

			$('.web-info').css('opacity', 0);
			setTimeout(function() {
				$('.web-preview-title').text(webInfo[webID]['title']);
				$('.web-preview-desc').text(webInfo[webID]['desc']);
				$('.web-info').css('opacity', 1);
			}, 200);
		}
	};

	$('.launchpad-btn').hover(function() {
		changeWebPreview('launchpad');
	});

	$('.csm-btn').hover(function() {
		changeWebPreview('csm');
	});

	$('.hackin-btn').hover(function() {
		changeWebPreview('hackin');
	});

	$('.unrac-btn').hover(function() {
		changeWebPreview('unrac');
	});

	$('.boilerplate-btn').hover(function() {
		changeWebPreview('boilerplate');
	});

	$('.alary-btn').hover(function() {
		changeWebPreview('alary');
	});
});
