'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function () {
  'use strict';
  function e(n) {
    return 'undefined' == typeof this || Object.getPrototypeOf(this) !== e.prototype ? new e(n) : (O = this, O.version = '3.3.4', O.tools = new E(), O.isSupported() ? (O.tools.extend(O.defaults, n || {}), O.defaults.container = t(O.defaults), O.store = { elements: {}, containers: [] }, O.sequences = {}, O.history = [], O.uid = 0, O.initialized = !1) : 'undefined' != typeof console && null !== console, O);
  }function t(e) {
    if (e && e.container) {
      if ('string' == typeof e.container) return window.document.documentElement.querySelector(e.container);if (O.tools.isNode(e.container)) return e.container;
    }return O.defaults.container;
  }function n(e, t) {
    return 'string' == typeof e ? Array.prototype.slice.call(t.querySelectorAll(e)) : O.tools.isNode(e) ? [e] : O.tools.isNodeList(e) ? Array.prototype.slice.call(e) : [];
  }function i() {
    return ++O.uid;
  }function o(e, t, n) {
    t.container && (t.container = n), e.config ? e.config = O.tools.extendClone(e.config, t) : e.config = O.tools.extendClone(O.defaults, t), 'top' === e.config.origin || 'bottom' === e.config.origin ? e.config.axis = 'Y' : e.config.axis = 'X';
  }function r(e) {
    var t = window.getComputedStyle(e.domEl);e.styles || (e.styles = { transition: {}, transform: {}, computed: {} }, e.styles.inline = e.domEl.getAttribute('style') || '', e.styles.inline += '; visibility: visible; ', e.styles.computed.opacity = t.opacity, t.transition && 'all 0s ease 0s' !== t.transition ? e.styles.computed.transition = t.transition + ', ' : e.styles.computed.transition = ''), e.styles.transition.instant = s(e, 0), e.styles.transition.delayed = s(e, e.config.delay), e.styles.transform.initial = ' -webkit-transform:', e.styles.transform.target = ' -webkit-transform:', a(e), e.styles.transform.initial += 'transform:', e.styles.transform.target += 'transform:', a(e);
  }function s(e, t) {
    var n = e.config;return '-webkit-transition: ' + e.styles.computed.transition + '-webkit-transform ' + n.duration / 1e3 + 's ' + n.easing + ' ' + t / 1e3 + 's, opacity ' + n.duration / 1e3 + 's ' + n.easing + ' ' + t / 1e3 + 's; transition: ' + e.styles.computed.transition + 'transform ' + n.duration / 1e3 + 's ' + n.easing + ' ' + t / 1e3 + 's, opacity ' + n.duration / 1e3 + 's ' + n.easing + ' ' + t / 1e3 + 's; ';
  }function a(e) {
    var t,
        n = e.config,
        i = e.styles.transform;t = 'top' === n.origin || 'left' === n.origin ? /^-/.test(n.distance) ? n.distance.substr(1) : '-' + n.distance : n.distance, parseInt(n.distance) && (i.initial += ' translate' + n.axis + '(' + t + ')', i.target += ' translate' + n.axis + '(0)'), n.scale && (i.initial += ' scale(' + n.scale + ')', i.target += ' scale(1)'), n.rotate.x && (i.initial += ' rotateX(' + n.rotate.x + 'deg)', i.target += ' rotateX(0)'), n.rotate.y && (i.initial += ' rotateY(' + n.rotate.y + 'deg)', i.target += ' rotateY(0)'), n.rotate.z && (i.initial += ' rotateZ(' + n.rotate.z + 'deg)', i.target += ' rotateZ(0)'), i.initial += '; opacity: ' + n.opacity + ';', i.target += '; opacity: ' + e.styles.computed.opacity + ';';
  }function l(e) {
    var t = e.config.container;t && O.store.containers.indexOf(t) === -1 && O.store.containers.push(e.config.container), O.store.elements[e.id] = e;
  }function c(e, t, n) {
    var i = { target: e, config: t, interval: n };O.history.push(i);
  }function f() {
    if (O.isSupported()) {
      y();for (var e = 0; e < O.store.containers.length; e++) {
        O.store.containers[e].addEventListener('scroll', d), O.store.containers[e].addEventListener('resize', d);
      }O.initialized || (window.addEventListener('scroll', d), window.addEventListener('resize', d), O.initialized = !0);
    }return O;
  }function d() {
    T(y);
  }function u() {
    var e, t, n, i;O.tools.forOwn(O.sequences, function (o) {
      i = O.sequences[o], e = !1;for (var r = 0; r < i.elemIds.length; r++) {
        n = i.elemIds[r], t = O.store.elements[n], q(t) && !e && (e = !0);
      }i.active = e;
    });
  }function y() {
    var e, t;u(), O.tools.forOwn(O.store.elements, function (n) {
      t = O.store.elements[n], e = w(t), g(t) ? (t.config.beforeReveal(t.domEl), e ? t.domEl.setAttribute('style', t.styles.inline + t.styles.transform.target + t.styles.transition.delayed) : t.domEl.setAttribute('style', t.styles.inline + t.styles.transform.target + t.styles.transition.instant), p('reveal', t, e), t.revealing = !0, t.seen = !0, t.sequence && m(t, e)) : v(t) && (t.config.beforeReset(t.domEl), t.domEl.setAttribute('style', t.styles.inline + t.styles.transform.initial + t.styles.transition.instant), p('reset', t), t.revealing = !1);
    });
  }function m(e, t) {
    var n = 0,
        i = 0,
        o = O.sequences[e.sequence.id];o.blocked = !0, t && 'onload' === e.config.useDelay && (i = e.config.delay), e.sequence.timer && (n = Math.abs(e.sequence.timer.started - new Date()), window.clearTimeout(e.sequence.timer)), e.sequence.timer = { started: new Date() }, e.sequence.timer.clock = window.setTimeout(function () {
      o.blocked = !1, e.sequence.timer = null, d();
    }, Math.abs(o.interval) + i - n);
  }function p(e, t, n) {
    var i = 0,
        o = 0,
        r = 'after';switch (e) {case 'reveal':
        o = t.config.duration, n && (o += t.config.delay), r += 'Reveal';break;case 'reset':
        o = t.config.duration, r += 'Reset';}t.timer && (i = Math.abs(t.timer.started - new Date()), window.clearTimeout(t.timer.clock)), t.timer = { started: new Date() }, t.timer.clock = window.setTimeout(function () {
      t.config[r](t.domEl), t.timer = null;
    }, o - i);
  }function g(e) {
    if (e.sequence) {
      var t = O.sequences[e.sequence.id];return t.active && !t.blocked && !e.revealing && !e.disabled;
    }return q(e) && !e.revealing && !e.disabled;
  }function w(e) {
    var t = e.config.useDelay;return 'always' === t || 'onload' === t && !O.initialized || 'once' === t && !e.seen;
  }function v(e) {
    if (e.sequence) {
      var t = O.sequences[e.sequence.id];return !t.active && e.config.reset && e.revealing && !e.disabled;
    }return !q(e) && e.config.reset && e.revealing && !e.disabled;
  }function b(e) {
    return { width: e.clientWidth, height: e.clientHeight };
  }function h(e) {
    if (e && e !== window.document.documentElement) {
      var t = x(e);return { x: e.scrollLeft + t.left, y: e.scrollTop + t.top };
    }return { x: window.pageXOffset, y: window.pageYOffset };
  }function x(e) {
    var t = 0,
        n = 0,
        i = e.offsetHeight,
        o = e.offsetWidth;do {
      isNaN(e.offsetTop) || (t += e.offsetTop), isNaN(e.offsetLeft) || (n += e.offsetLeft), e = e.offsetParent;
    } while (e);return { top: t, left: n, height: i, width: o };
  }function q(e) {
    function t() {
      var t = c + a * s,
          n = f + l * s,
          i = d - a * s,
          y = u - l * s,
          m = r.y + e.config.viewOffset.top,
          p = r.x + e.config.viewOffset.left,
          g = r.y - e.config.viewOffset.bottom + o.height,
          w = r.x - e.config.viewOffset.right + o.width;return t < g && i > m && n > p && y < w;
    }function n() {
      return 'fixed' === window.getComputedStyle(e.domEl).position;
    }var i = x(e.domEl),
        o = b(e.config.container),
        r = h(e.config.container),
        s = e.config.viewFactor,
        a = i.height,
        l = i.width,
        c = i.top,
        f = i.left,
        d = c + a,
        u = f + l;return t() || n();
  }function E() {}var O, T;e.prototype.defaults = { origin: 'bottom', distance: '20px', duration: 500, delay: 0, rotate: { x: 0, y: 0, z: 0 }, opacity: 0, scale: .9, easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)', container: window.document.documentElement, mobile: !0, reset: !1, useDelay: 'always', viewFactor: .2, viewOffset: { top: 0, right: 0, bottom: 0, left: 0 }, beforeReveal: function beforeReveal(e) {}, beforeReset: function beforeReset(e) {}, afterReveal: function afterReveal(e) {}, afterReset: function afterReset(e) {} }, e.prototype.isSupported = function () {
    var e = document.documentElement.style;return 'WebkitTransition' in e && 'WebkitTransform' in e || 'transition' in e && 'transform' in e;
  }, e.prototype.reveal = function (e, s, a, d) {
    var u, y, m, p, g, w;if (void 0 !== s && 'number' == typeof s ? (a = s, s = {}) : void 0 !== s && null !== s || (s = {}), u = t(s), y = n(e, u), !y.length) return O;a && 'number' == typeof a && (w = i(), g = O.sequences[w] = { id: w, interval: a, elemIds: [], active: !1 });for (var v = 0; v < y.length; v++) {
      p = y[v].getAttribute('data-sr-id'), p ? m = O.store.elements[p] : (m = { id: i(), domEl: y[v], seen: !1, revealing: !1 }, m.domEl.setAttribute('data-sr-id', m.id)), g && (m.sequence = { id: g.id, index: g.elemIds.length }, g.elemIds.push(m.id)), o(m, s, u), r(m), l(m), O.tools.isMobile() && !m.config.mobile || !O.isSupported() ? (m.domEl.setAttribute('style', m.styles.inline), m.disabled = !0) : m.revealing || m.domEl.setAttribute('style', m.styles.inline + m.styles.transform.initial);
    }return !d && O.isSupported() && (c(e, s, a), O.initTimeout && window.clearTimeout(O.initTimeout), O.initTimeout = window.setTimeout(f, 0)), O;
  }, e.prototype.sync = function () {
    if (O.history.length && O.isSupported()) {
      for (var e = 0; e < O.history.length; e++) {
        var t = O.history[e];O.reveal(t.target, t.config, t.interval, !0);
      }f();
    }return O;
  }, E.prototype.isObject = function (e) {
    return null !== e && 'object' == (typeof e === 'undefined' ? 'undefined' : _typeof(e)) && e.constructor === Object;
  }, E.prototype.isNode = function (e) {
    return 'object' == _typeof(window.Node) ? e instanceof window.Node : e && 'object' == (typeof e === 'undefined' ? 'undefined' : _typeof(e)) && 'number' == typeof e.nodeType && 'string' == typeof e.nodeName;
  }, E.prototype.isNodeList = function (e) {
    var t = Object.prototype.toString.call(e),
        n = /^\[object (HTMLCollection|NodeList|Object)\]$/;return 'object' == _typeof(window.NodeList) ? e instanceof window.NodeList : e && 'object' == (typeof e === 'undefined' ? 'undefined' : _typeof(e)) && n.test(t) && 'number' == typeof e.length && (0 === e.length || this.isNode(e[0]));
  }, E.prototype.forOwn = function (e, t) {
    if (!this.isObject(e)) throw new TypeError('Expected "object", but received "' + (typeof e === 'undefined' ? 'undefined' : _typeof(e)) + '".');for (var n in e) {
      e.hasOwnProperty(n) && t(n);
    }
  }, E.prototype.extend = function (e, t) {
    return this.forOwn(t, function (n) {
      this.isObject(t[n]) ? (e[n] && this.isObject(e[n]) || (e[n] = {}), this.extend(e[n], t[n])) : e[n] = t[n];
    }.bind(this)), e;
  }, E.prototype.extendClone = function (e, t) {
    return this.extend(this.extend({}, e), t);
  }, E.prototype.isMobile = function () {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
  }, T = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e) {
    window.setTimeout(e, 1e3 / 60);
  }, 'function' == typeof define && 'object' == _typeof(define.amd) && define.amd ? define(function () {
    return e;
  }) : 'undefined' != typeof module && module.exports ? module.exports = e : window.ScrollReveal = e;
}();
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === 'function' && _typeof2(Symbol.iterator) === 'symbol' ? function (obj) {
  return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
};

/*!
 * Salvattore 1.0.9 by @rnmp and @ppold
 * https://github.com/rnmp/salvattore
 */
!function (e, t) {
  'function' == typeof define && define.amd ? define([], t) : 'object' == (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) ? module.exports = t() : e.salvattore = t();
}(window, function () {
  /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
  window.matchMedia || (window.matchMedia = function () {
    'use strict';

    var e = window.styleMedia || window.media;if (!e) {
      var t = document.createElement('style'),
          n = document.getElementsByTagName('script')[0],
          r = null;t.type = 'text/css', t.id = 'matchmediajs-test', n.parentNode.insertBefore(t, n), r = 'getComputedStyle' in window && window.getComputedStyle(t, null) || t.currentStyle, e = { matchMedium: function matchMedium(e) {
          var n = '@media ' + e + '{ #matchmediajs-test { width: 1px; } }';return t.styleSheet ? t.styleSheet.cssText = n : t.textContent = n, '1px' === r.width;
        } };
    }return function (t) {
      return { matches: e.matchMedium(t || 'all'), media: t || 'all' };
    };
  }()), /*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
  function () {
    'use strict';

    if (window.matchMedia && window.matchMedia('all').addListener) return !1;var e = window.matchMedia,
        t = e('only all').matches,
        n = !1,
        r = 0,
        a = [],
        i = function i(t) {
      clearTimeout(r), r = setTimeout(function () {
        for (var t = 0, n = a.length; n > t; t++) {
          var r = a[t].mql,
              i = a[t].listeners || [],
              o = e(r.media).matches;if (o !== r.matches) {
            r.matches = o;for (var c = 0, l = i.length; l > c; c++) {
              i[c].call(window, r);
            }
          }
        }
      }, 30);
    };window.matchMedia = function (r) {
      var o = e(r),
          c = [],
          l = 0;return o.addListener = function (e) {
        t && (n || (n = !0, window.addEventListener('resize', i, !0)), 0 === l && (l = a.push({ mql: o, listeners: c })), c.push(e));
      }, o.removeListener = function (e) {
        for (var t = 0, n = c.length; n > t; t++) {
          c[t] === e && c.splice(t, 1);
        }
      }, o;
    };
  }(), function () {
    'use strict';

    for (var e = 0, t = ['ms', 'moz', 'webkit', 'o'], n = 0; n < t.length && !window.requestAnimationFrame; ++n) {
      window.requestAnimationFrame = window[t[n] + 'RequestAnimationFrame'], window.cancelAnimationFrame = window[t[n] + 'CancelAnimationFrame'] || window[t[n] + 'CancelRequestAnimationFrame'];
    }window.requestAnimationFrame || (window.requestAnimationFrame = function (t, n) {
      var r = new Date().getTime(),
          a = Math.max(0, 16 - (r - e)),
          i = window.setTimeout(function () {
        t(r + a);
      }, a);return e = r + a, i;
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
      clearTimeout(e);
    });
  }(), 'function' != typeof window.CustomEvent && !function () {
    'use strict';

    function e(e, t) {
      t = t || { bubbles: !1, cancelable: !1, detail: void 0 };var n = document.createEvent('CustomEvent');return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
    }e.prototype = window.Event.prototype, window.CustomEvent = e;
  }();var e = function (e, t, n) {
    'use strict';

    var r = {},
        a = [],
        i = [],
        o = [],
        c = function c(e, t, n) {
      e.dataset ? e.dataset[t] = n : e.setAttribute('data-' + t, n);
    };return r.obtainGridSettings = function (t) {
      var n = e.getComputedStyle(t, ':before'),
          r = n.getPropertyValue('content').slice(1, -1),
          a = r.match(/^\s*(\d+)(?:\s?\.(.+))?\s*$/),
          i = 1,
          o = [];return a ? (i = a[1], o = a[2], o = o ? o.split('.') : ['column']) : (a = r.match(/^\s*\.(.+)\s+(\d+)\s*$/), a && (o = a[1], i = a[2], i && (i = i.split('.')))), { numberOfColumns: i, columnClasses: o };
    }, r.addColumns = function (e, n) {
      for (var a, i = r.obtainGridSettings(e), o = i.numberOfColumns, l = i.columnClasses, s = new Array(+o), u = t.createDocumentFragment(), d = o; 0 !== d--;) {
        a = '[data-columns] > *:nth-child(' + o + 'n-' + d + ')', s.push(n.querySelectorAll(a));
      }s.forEach(function (e) {
        var n = t.createElement('div'),
            r = t.createDocumentFragment();n.className = l.join(' '), Array.prototype.forEach.call(e, function (e) {
          r.appendChild(e);
        }), n.appendChild(r), u.appendChild(n);
      }), e.appendChild(u), c(e, 'columns', o);
    }, r.removeColumns = function (n) {
      var r = t.createRange();r.selectNodeContents(n);var a = Array.prototype.filter.call(r.extractContents().childNodes, function (t) {
        return t instanceof e.HTMLElement;
      }),
          i = a.length,
          o = a[0].childNodes.length,
          l = new Array(o * i);Array.prototype.forEach.call(a, function (e, t) {
        Array.prototype.forEach.call(e.children, function (e, n) {
          l[n * i + t] = e;
        });
      });var s = t.createElement('div');return c(s, 'columns', 0), l.filter(function (e) {
        return !!e;
      }).forEach(function (e) {
        s.appendChild(e);
      }), s;
    }, r.recreateColumns = function (t) {
      e.requestAnimationFrame(function () {
        r.addColumns(t, r.removeColumns(t));var e = new CustomEvent('columnsChange');t.dispatchEvent(e);
      });
    }, r.mediaQueryChange = function (e) {
      e.matches && Array.prototype.forEach.call(a, r.recreateColumns);
    }, r.getCSSRules = function (e) {
      var t;try {
        t = e.sheet.cssRules || e.sheet.rules;
      } catch (n) {
        return [];
      }return t || [];
    }, r.getStylesheets = function () {
      var e = Array.prototype.slice.call(t.querySelectorAll('style'));return e.forEach(function (t, n) {
        'text/css' !== t.type && '' !== t.type && e.splice(n, 1);
      }), Array.prototype.concat.call(e, Array.prototype.slice.call(t.querySelectorAll('link[rel=\'stylesheet\']')));
    }, r.mediaRuleHasColumnsSelector = function (e) {
      var t, n;try {
        t = e.length;
      } catch (r) {
        t = 0;
      }for (; t--;) {
        if (n = e[t], n.selectorText && n.selectorText.match(/\[data-columns\](.*)::?before$/)) return !0;
      }return !1;
    }, r.scanMediaQueries = function () {
      var t = [];if (e.matchMedia) {
        r.getStylesheets().forEach(function (e) {
          Array.prototype.forEach.call(r.getCSSRules(e), function (e) {
            try {
              e.media && e.cssRules && r.mediaRuleHasColumnsSelector(e.cssRules) && t.push(e);
            } catch (n) {}
          });
        });var n = i.filter(function (e) {
          return -1 === t.indexOf(e);
        });o.filter(function (e) {
          return -1 !== n.indexOf(e.rule);
        }).forEach(function (e) {
          e.mql.removeListener(r.mediaQueryChange);
        }), o = o.filter(function (e) {
          return -1 === n.indexOf(e.rule);
        }), t.filter(function (e) {
          return -1 == i.indexOf(e);
        }).forEach(function (t) {
          var n = e.matchMedia(t.media.mediaText);n.addListener(r.mediaQueryChange), o.push({ rule: t, mql: n });
        }), i.length = 0, i = t;
      }
    }, r.rescanMediaQueries = function () {
      r.scanMediaQueries(), Array.prototype.forEach.call(a, r.recreateColumns);
    }, r.nextElementColumnIndex = function (e, t) {
      var n,
          r,
          a,
          i = e.children,
          o = i.length,
          c = 0,
          l = 0;for (a = 0; o > a; a++) {
        n = i[a], r = n.children.length + (t[a].children || t[a].childNodes).length, 0 === c && (c = r), c > r && (l = a, c = r);
      }return l;
    }, r.createFragmentsList = function (e) {
      for (var n = new Array(e), r = 0; r !== e;) {
        n[r] = t.createDocumentFragment(), r++;
      }return n;
    }, r.appendElements = function (e, t) {
      var n = e.children,
          a = n.length,
          i = r.createFragmentsList(a);Array.prototype.forEach.call(t, function (t) {
        var n = r.nextElementColumnIndex(e, i);i[n].appendChild(t);
      }), Array.prototype.forEach.call(n, function (e, t) {
        e.appendChild(i[t]);
      });
    }, r.prependElements = function (e, n) {
      var a = e.children,
          i = a.length,
          o = r.createFragmentsList(i),
          c = i - 1;n.forEach(function (e) {
        var t = o[c];t.insertBefore(e, t.firstChild), 0 === c ? c = i - 1 : c--;
      }), Array.prototype.forEach.call(a, function (e, t) {
        e.insertBefore(o[t], e.firstChild);
      });for (var l = t.createDocumentFragment(), s = n.length % i; 0 !== s--;) {
        l.appendChild(e.lastChild);
      }e.insertBefore(l, e.firstChild);
    }, r.registerGrid = function (n) {
      if ('none' !== e.getComputedStyle(n).display) {
        var i = t.createRange();i.selectNodeContents(n);var o = t.createElement('div');o.appendChild(i.extractContents()), c(o, 'columns', 0), r.addColumns(n, o), a.push(n);
      }
    }, r.init = function () {
      var e = t.createElement('style');e.innerHTML = '[data-columns]::before{display:block;visibility:hidden;position:absolute;font-size:1px;}', t.head.appendChild(e);var n = t.querySelectorAll('[data-columns]');Array.prototype.forEach.call(n, r.registerGrid), r.scanMediaQueries();
    }, r.init(), { appendElements: r.appendElements, prependElements: r.prependElements, registerGrid: r.registerGrid, recreateColumns: r.recreateColumns, rescanMediaQueries: r.rescanMediaQueries, init: r.init, append_elements: r.appendElements, prepend_elements: r.prependElements, register_grid: r.registerGrid, recreate_columns: r.recreateColumns, rescan_media_queries: r.rescanMediaQueries };
  }(window, window.document);return e;
});
//# sourceMappingURL=masonry.js.map
'use strict';

$(function () {
  var introTop = $('#intro').position().top;
  var introMid = introTop + $('#intro').height() / 2;
  var introBottom = introTop + $('#intro').height();
  var projectsTop = $('#projects').position().top;
  var projectsMid = projectsTop + $('#projects').height() / 2;
  var projectsBottom = projectsTop + $('#projects').height();

  var init = function init() {
    var positionTop = $('html').offset().top;
    $('.button-collapse').sideNav();
    $('.modal').modal();

    $('ul.side-nav li a').click(function () {
      $('.button-collapse').sideNav('hide');
    });

    setTimeout(function () {
      $('main div h1').addClass('animated fadeInUp');
    }, 500);
    setTimeout(function () {
      $('main div h2').addClass('animated fadeInUp');
    }, 900);
    setTimeout(function () {
      $('main div a').css('opacity', 1);
      $('main div a').addClass('animated zoomIn');
    }, 1300);

    setTimeout(function () {
      $('nav').addClass('animated fadeInDown');
    }, 1300);
    setTimeout(function () {
      $('div.navbar-fixed').css('opacity', '0.95');
    }, 2000);

    $('.materialboxed').materialbox();

    window.sr = ScrollReveal();
    sr.reveal('#web .col');
  };

  /*** NAV LINKS ***/
  var links = function links() {
    $('a[href*="#"]:not([href="#"]):not([href="#about-modal"]):not([href="#website-modal"])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
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
  var scrolling = function scrolling() {
    $(window).scroll(function () {
      var scrollTop = $(window).scrollTop();

      if (scrollTop < introMid) {
        $('nav').removeClass('short');
        $('nav').addClass('no-shadow');
      } else {
        $('nav').addClass('short');
        $('nav').removeClass('no-shadow');
      }

      var viewingProjects = projectsTop - 60 <= scrollTop && scrollTop <= projectsBottom;
      if (!viewingProjects) {
        $('nav').removeClass('darkNav');
        $('nav img').attr('src', 'images/personal_banner.png');
      } else {
        $('nav').addClass('darkNav');
        $('nav img').attr('src', 'images/personal_banner_light.png');
      }
    });

    var options = [{ selector: '#microsoft-video',
      offset: 100,
      callback: function callback() {
        $('#microsoft-video').addClass('animated fadeInLeft');
      }
    }, { selector: '#microsoft-desc',
      offset: 100,
      callback: function callback() {
        $('#microsoft-desc').addClass('animated fadeInRight');
      }
    }, { selector: '#sherlock-video',
      offset: 100,
      callback: function callback() {
        $('#sherlock-video').addClass('animated fadeInLeft');
      }
    }, { selector: '#sherlock-desc',
      offset: 100,
      callback: function callback() {
        $('#sherlock-desc').addClass('animated fadeInRight');
      }
    }, { selector: '#ai-video',
      offset: 100,
      callback: function callback() {
        $('#ai-video').addClass('animated fadeInLeft');
      }
    }, { selector: '#ai-desc',
      offset: 100,
      callback: function callback() {
        $('#ai-desc').addClass('animated fadeInRight');
      }
    }];

    Materialize.scrollFire(options);
  };

  /*** WEB MODAL ***/
  var webModal = function webModal() {
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

    var changeWebModal = function changeWebModal(webID) {
      $('#website-modal h3').text(webInfo[webID]['title']);
      $('#website-modal p').text(webInfo[webID]['desc']);
      $('#website-modal a').attr('href', webInfo[webID]['link']);
      $('#website-modal img').attr('src', 'images/websites/' + webID + '.png');
    };

    $('.csm-btn').hover(function () {
      changeWebModal('csm');
    });

    $('.unrac-btn').hover(function () {
      changeWebModal('unrac');
    });

    $('.boilerplate-btn').hover(function () {
      changeWebModal('boilerplate');
    });

    $('.alary-btn').hover(function () {
      changeWebModal('alary');
    });

    $('.cp-btn').hover(function () {
      changeWebModal('cp');
    });

    $('.rubik-btn').hover(function () {
      changeWebModal('rubik');
    });
  };

  init();
  links();
  scrolling();
  webModal();
});