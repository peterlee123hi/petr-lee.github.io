"use strict";

/* http://prismjs.com/download.html?themes=prism-okaidia&languages=clike+c+cpp&plugins=line-numbers+toolbar+copy-to-clipboard */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function () {
  var e = /\blang(?:uage)?-(\w+)\b/i,
      t = 0,
      n = _self.Prism = { manual: _self.Prism && _self.Prism.manual, util: { encode: function encode(e) {
        return e instanceof a ? new a(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
      }, type: function type(e) {
        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
      }, objId: function objId(e) {
        return e.__id || Object.defineProperty(e, "__id", { value: ++t }), e.__id;
      }, clone: function clone(e) {
        var t = n.util.type(e);switch (t) {case "Object":
            var a = {};for (var r in e) {
              e.hasOwnProperty(r) && (a[r] = n.util.clone(e[r]));
            }return a;case "Array":
            return e.map && e.map(function (e) {
              return n.util.clone(e);
            });}return e;
      } }, languages: { extend: function extend(e, t) {
        var a = n.util.clone(n.languages[e]);for (var r in t) {
          a[r] = t[r];
        }return a;
      }, insertBefore: function insertBefore(e, t, a, r) {
        r = r || n.languages;var l = r[e];if (2 == arguments.length) {
          a = arguments[1];for (var i in a) {
            a.hasOwnProperty(i) && (l[i] = a[i]);
          }return l;
        }var o = {};for (var s in l) {
          if (l.hasOwnProperty(s)) {
            if (s == t) for (var i in a) {
              a.hasOwnProperty(i) && (o[i] = a[i]);
            }o[s] = l[s];
          }
        }return n.languages.DFS(n.languages, function (t, n) {
          n === r[e] && t != e && (this[t] = o);
        }), r[e] = o;
      }, DFS: function DFS(e, t, a, r) {
        r = r || {};for (var l in e) {
          e.hasOwnProperty(l) && (t.call(e, l, e[l], a || l), "Object" !== n.util.type(e[l]) || r[n.util.objId(e[l])] ? "Array" !== n.util.type(e[l]) || r[n.util.objId(e[l])] || (r[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, l, r)) : (r[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, null, r)));
        }
      } }, plugins: {}, highlightAll: function highlightAll(e, t) {
      var a = { callback: t, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' };n.hooks.run("before-highlightall", a);for (var r, l = a.elements || document.querySelectorAll(a.selector), i = 0; r = l[i++];) {
        n.highlightElement(r, e === !0, a.callback);
      }
    }, highlightElement: function highlightElement(t, a, r) {
      for (var l, i, o = t; o && !e.test(o.className);) {
        o = o.parentNode;
      }o && (l = (o.className.match(e) || [, ""])[1].toLowerCase(), i = n.languages[l]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l);var s = t.textContent,
          u = { element: t, language: l, grammar: i, code: s };if (n.hooks.run("before-sanity-check", u), !u.code || !u.grammar) return u.code && (u.element.textContent = u.code), n.hooks.run("complete", u), void 0;if (n.hooks.run("before-highlight", u), a && _self.Worker) {
        var g = new Worker(n.filename);g.onmessage = function (e) {
          u.highlightedCode = e.data, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, r && r.call(u.element), n.hooks.run("after-highlight", u), n.hooks.run("complete", u);
        }, g.postMessage(JSON.stringify({ language: u.language, code: u.code, immediateClose: !0 }));
      } else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, r && r.call(t), n.hooks.run("after-highlight", u), n.hooks.run("complete", u);
    }, highlight: function highlight(e, t, r) {
      var l = n.tokenize(e, t);return a.stringify(n.util.encode(l), r);
    }, tokenize: function tokenize(e, t) {
      var a = n.Token,
          r = [e],
          l = t.rest;if (l) {
        for (var i in l) {
          t[i] = l[i];
        }delete t.rest;
      }e: for (var i in t) {
        if (t.hasOwnProperty(i) && t[i]) {
          var o = t[i];o = "Array" === n.util.type(o) ? o : [o];for (var s = 0; s < o.length; ++s) {
            var u = o[s],
                g = u.inside,
                c = !!u.lookbehind,
                h = !!u.greedy,
                f = 0,
                d = u.alias;if (h && !u.pattern.global) {
              var p = u.pattern.toString().match(/[imuy]*$/)[0];u.pattern = RegExp(u.pattern.source, p + "g");
            }u = u.pattern || u;for (var m = 0, y = 0; m < r.length; y += r[m].length, ++m) {
              var v = r[m];if (r.length > e.length) break e;if (!(v instanceof a)) {
                u.lastIndex = 0;var b = u.exec(v),
                    k = 1;if (!b && h && m != r.length - 1) {
                  if (u.lastIndex = y, b = u.exec(e), !b) break;for (var w = b.index + (c ? b[1].length : 0), _ = b.index + b[0].length, P = m, A = y, j = r.length; j > P && _ > A; ++P) {
                    A += r[P].length, w >= A && (++m, y = A);
                  }if (r[m] instanceof a || r[P - 1].greedy) continue;k = P - m, v = e.slice(y, A), b.index -= y;
                }if (b) {
                  c && (f = b[1].length);var w = b.index + f,
                      b = b[0].slice(f),
                      _ = w + b.length,
                      x = v.slice(0, w),
                      O = v.slice(_),
                      S = [m, k];x && S.push(x);var N = new a(i, g ? n.tokenize(b, g) : b, d, b, h);S.push(N), O && S.push(O), Array.prototype.splice.apply(r, S);
                }
              }
            }
          }
        }
      }return r;
    }, hooks: { all: {}, add: function add(e, t) {
        var a = n.hooks.all;a[e] = a[e] || [], a[e].push(t);
      }, run: function run(e, t) {
        var a = n.hooks.all[e];if (a && a.length) for (var r, l = 0; r = a[l++];) {
          r(t);
        }
      } } },
      a = n.Token = function (e, t, n, a, r) {
    this.type = e, this.content = t, this.alias = n, this.length = 0 | (a || "").length, this.greedy = !!r;
  };if (a.stringify = function (e, t, r) {
    if ("string" == typeof e) return e;if ("Array" === n.util.type(e)) return e.map(function (n) {
      return a.stringify(n, t, e);
    }).join("");var l = { type: e.type, content: a.stringify(e.content, t, r), tag: "span", classes: ["token", e.type], attributes: {}, language: t, parent: r };if ("comment" == l.type && (l.attributes.spellcheck = "true"), e.alias) {
      var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];Array.prototype.push.apply(l.classes, i);
    }n.hooks.run("wrap", l);var o = Object.keys(l.attributes).map(function (e) {
      return e + '="' + (l.attributes[e] || "").replace(/"/g, "&quot;") + '"';
    }).join(" ");return "<" + l.tag + ' class="' + l.classes.join(" ") + '"' + (o ? " " + o : "") + ">" + l.content + "</" + l.tag + ">";
  }, !_self.document) return _self.addEventListener ? (_self.addEventListener("message", function (e) {
    var t = JSON.parse(e.data),
        a = t.language,
        r = t.code,
        l = t.immediateClose;_self.postMessage(n.highlight(r, n.languages[a], a)), l && _self.close();
  }, !1), _self.Prism) : _self.Prism;var r = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();return r && (n.filename = r.src, !document.addEventListener || n.manual || r.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(n.highlightAll) : window.setTimeout(n.highlightAll, 16) : document.addEventListener("DOMContentLoaded", n.highlightAll))), _self.Prism;
}();"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\w\W]*?\*\//, lookbehind: !0 }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 }], string: { pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 }, "class-name": { pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i, lookbehind: !0, inside: { punctuation: /(\.|\\)/ } }, keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/, "boolean": /\b(true|false)\b/, "function": /[a-z0-9_]+(?=\()/i, number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i, operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/, punctuation: /[{}[\];(),.:]/ };
Prism.languages.c = Prism.languages.extend("clike", { keyword: /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/, operator: /\-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|?\||[~^%?*\/]/, number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)[ful]*\b/i }), Prism.languages.insertBefore("c", "string", { macro: { pattern: /(^\s*)#\s*[a-z]+([^\r\n\\]|\\.|\\(?:\r\n?|\n))*/im, lookbehind: !0, alias: "property", inside: { string: { pattern: /(#\s*include\s*)(<.+?>|("|')(\\?.)+?\3)/, lookbehind: !0 }, directive: { pattern: /(#\s*)\b(define|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/, lookbehind: !0, alias: "keyword" } } }, constant: /\b(__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|stdin|stdout|stderr)\b/ }), delete Prism.languages.c["class-name"], delete Prism.languages.c["boolean"];
Prism.languages.cpp = Prism.languages.extend("c", { keyword: /\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/, "boolean": /\b(true|false)\b/, operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\/|\b(and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/ }), Prism.languages.insertBefore("cpp", "keyword", { "class-name": { pattern: /(class\s+)[a-z0-9_]+/i, lookbehind: !0 } });
!function () {
  "undefined" != typeof self && self.Prism && self.document && Prism.hooks.add("complete", function (e) {
    if (e.code) {
      var t = e.element.parentNode,
          s = /\s*\bline-numbers\b\s*/;if (t && /pre/i.test(t.nodeName) && (s.test(t.className) || s.test(e.element.className)) && !e.element.querySelector(".line-numbers-rows")) {
        s.test(e.element.className) && (e.element.className = e.element.className.replace(s, "")), s.test(t.className) || (t.className += " line-numbers");var n,
            a = e.code.match(/\n(?!$)/g),
            l = a ? a.length + 1 : 1,
            r = new Array(l + 1);r = r.join("<span></span>"), n = document.createElement("span"), n.setAttribute("aria-hidden", "true"), n.className = "line-numbers-rows", n.innerHTML = r, t.hasAttribute("data-start") && (t.style.counterReset = "linenumber " + (parseInt(t.getAttribute("data-start"), 10) - 1)), e.element.appendChild(n);
      }
    }
  });
}();
!function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    var t = [],
        e = {},
        n = function n() {};Prism.plugins.toolbar = {};var a = Prism.plugins.toolbar.registerButton = function (n, a) {
      var o;o = "function" == typeof a ? a : function (t) {
        var e;return "function" == typeof a.onClick ? (e = document.createElement("button"), e.type = "button", e.addEventListener("click", function () {
          a.onClick.call(this, t);
        })) : "string" == typeof a.url ? (e = document.createElement("a"), e.href = a.url) : e = document.createElement("span"), e.textContent = a.text, e;
      }, t.push(e[n] = o);
    },
        o = Prism.plugins.toolbar.hook = function (a) {
      var o = a.element.parentNode;if (o && /pre/i.test(o.nodeName) && !o.classList.contains("code-toolbar")) {
        o.classList.add("code-toolbar");var r = document.createElement("div");r.classList.add("toolbar"), document.body.hasAttribute("data-toolbar-order") && (t = document.body.getAttribute("data-toolbar-order").split(",").map(function (t) {
          return e[t] || n;
        })), t.forEach(function (t) {
          var e = t(a);if (e) {
            var n = document.createElement("div");n.classList.add("toolbar-item"), n.appendChild(e), r.appendChild(n);
          }
        }), o.appendChild(r);
      }
    };a("label", function (t) {
      var e = t.element.parentNode;if (e && /pre/i.test(e.nodeName) && e.hasAttribute("data-label")) {
        var n,
            a,
            o = e.getAttribute("data-label");try {
          a = document.querySelector("template#" + o);
        } catch (r) {}return a ? n = a.content : (e.hasAttribute("data-url") ? (n = document.createElement("a"), n.href = e.getAttribute("data-url")) : n = document.createElement("span"), n.textContent = o), n;
      }
    }), Prism.hooks.add("complete", o);
  }
}();
!function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    if (!Prism.plugins.toolbar) return console.warn("Copy to Clipboard plugin loaded before Toolbar plugin."), void 0;var o = window.Clipboard || void 0;o || "function" != typeof require || (o = require("clipboard"));var e = [];if (!o) {
      var t = document.createElement("script"),
          n = document.querySelector("head");t.onload = function () {
        if (o = window.Clipboard) for (; e.length;) {
          e.pop()();
        }
      }, t.src = "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.8/clipboard.min.js", n.appendChild(t);
    }Prism.plugins.toolbar.registerButton("copy-to-clipboard", function (t) {
      function n() {
        var e = new o(i, { text: function text() {
            return t.code;
          } });e.on("success", function () {
          i.textContent = "Copied!", r();
        }), e.on("error", function () {
          i.textContent = "Press Ctrl+C to copy", r();
        });
      }function r() {
        setTimeout(function () {
          i.textContent = "Copy";
        }, 5e3);
      }var i = document.createElement("a");return i.textContent = "Copy", o ? n() : e.push(n), i;
    });
  }
}();
'use strict';

$(function () {
	var currentLocation = 'intro';

	setTimeout(function () {
		$('.intro-header').css('opacity', 1);
		$('.links').css('opacity', 1);
	}, 500);

	var transition = function transition(event, pageID) {
		$('.background').css('z-index', '99999999');
		$('.background').css('opacity', '1');

		setTimeout(function () {
			if (pageID === 'intro') {
				$('#intro').removeClass('hide');
				$('.page').addClass('hide');
			} else {
				$('#intro').addClass('hide');
				$('.page').removeClass('hide');

				$('section').addClass('hide');
				$('section#' + pageID).removeClass('hide');
			}
			currentLocation = pageID;

			$('.background').css('opacity', '0');
			setTimeout(function () {
				$('.background').css('z-index', '-1');
			}, 250);
		}, 1000);
	};

	$('.intro-btn').click(function (e) {
		transition(e, 'intro');
	});

	$('.code-btn').click(function (e) {
		transition(e, 'code');
	});

	$('.web-btn').click(function (e) {
		transition(e, 'web');
	});

	$('.design-btn').click(function (e) {
		transition(e, 'design');
	});

	$('.theory-btn').click(function (e) {
		transition(e, 'theory');
	});

	$('.music-btn').click(function (e) {
		transition(e, 'music');
	});
});
'use strict';

$(function () {
	var showSlide = function showSlide(width, image) {
		$('.intro-slide').css('top', '-20px');
		$('.intro-slide').css('background-size', width + 'px auto');
		$('.intro-slide').css('background-image', 'url("images/' + image + '")');
		$('.intro-slide').animate({
			'top': 0,
			'opacity': 1
		}, {
			'duration': 250,
			'easing': 'linear'
		});
		setTimeout(function () {
			$('.intro-slide').animate({
				'top': '20px',
				'opacity': 0
			}, {
				'duration': 250,
				'easing': 'linear'
			});
		}, 2000);
	};

	var index = 0;
	var images = ['laptop.png', 'openark-logo.png', 'microsoft.png', 'innod.png'];
	var widths = [400, 400, 400, 400];

	var runSlideshow = function runSlideshow() {
		index = index % images.length;
		showSlide(widths[index], images[index]);
		index += 1;
		setTimeout(runSlideshow, 2600);
	};

	runSlideshow();
});
'use strict';

$(function () {
	var currentWebPreview = 'launchpad';

	var webInfo = {
		'unrac': {
			'title': 'United Nations Refugee Agency at Cal',
			'desc': 'I was requested to make a website for this nonprofit that was dedicated to raising awareness for the refugee crisis in Syria. At the time, I was proficient at more advanced front-end frameworks including Angular, which is the major framework for the website.'
		},

		'boilerplate': {
			'title': 'Front-end Boilerplate',
			'desc': 'After learning so many different frameworks and plugins for front-end, I decided to compile my own starter code pre-installed with mostly necessary, sometimes extra fancy features for future front-end projects. I also made boilerplates for Materialize and Material Kit PRO. Also note, there have been MAJOR revisions since I made the sample landing page, so the updated boilerplate is on a separate branch.'
		},

		'hackin': {
			'title': 'Hack In',
			'desc': 'At the European Innovation Academy, a 4-week extreme startup accelerator, I founded this tech startup along with a small team of software developers and business specialists. Hack In is a platform that facilitates the recruitment process of software develoepers through customizable and comprehensive software development assessments. Our platform uses Meteor as the web framework. To demo, a sample login is "sample@company.io" and the password is "12345678".'
		},

		'alary': {
			'title': 'Alary Language',
			'desc': 'I was requested to make this website for an official club at UC Berkeley. Alary Language focuses on connecting students who are passionate about learning and teaching languages. The club provides a more personal language learning experience with companionship. This website was made in a single day.'
		},

		'csm': {
			'title': 'Computer Science Mentors',
			'desc': 'After becoming a member of CSM and visiting the official website, I was inspired to recreate it using a modern material theme. It is still a work in progress, but hopefully will become the official website in a few weeks at "csmentors.berkeley.edu".'
		},

		'launchpad': {
			'title': 'Launchpad',
			'desc': 'After attending a tech talk by the founders of Box, I was inspired to gather the most passionate and intelligent students at UC Berkeley to solve real-world problems with artificial intelligence, machine learning, and data science.'
		}
	};

	var changeWebPreview = function changeWebPreview(webID) {
		if (currentWebPreview != webID) {
			$('.web-preview-link').removeClass('selected');
			$('.' + webID + '-btn').addClass('selected');
			currentWebPreview = webID;

			$('.web-info').css('opacity', 0);
			setTimeout(function () {
				$('.web-preview-title').text(webInfo[webID]['title']);
				$('.web-preview-desc').text(webInfo[webID]['desc']);
				$('.web-info').css('opacity', 1);
			}, 200);
		}
	};

	$('.launchpad-btn').hover(function () {
		changeWebPreview('launchpad');
	});

	$('.csm-btn').hover(function () {
		changeWebPreview('csm');
	});

	$('.hackin-btn').hover(function () {
		changeWebPreview('hackin');
	});

	$('.unrac-btn').hover(function () {
		changeWebPreview('unrac');
	});

	$('.boilerplate-btn').hover(function () {
		changeWebPreview('boilerplate');
	});

	$('.alary-btn').hover(function () {
		changeWebPreview('alary');
	});
});
'use strict';

$(function () {
	$('.modal').modal();
});
'use strict';

$(function () {
  var editor = $('#editor');

  $.get('code/main_lite.cpp', function (data) {
    editor.html(Prism.highlight(data, Prism.languages.cpp));
  });

  $('li').click(function () {
    if (!$(this).hasClass('selected')) {
      $('li.selected').removeClass('selected');
      $(this).addClass('selected');
      $.get('code/' + $(this).attr('file'), function (data) {
        editor.html(Prism.highlight(data, Prism.languages.cpp));
      });
    }
  });
});