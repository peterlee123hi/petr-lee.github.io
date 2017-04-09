'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! Fluffy.js v2.1.1 | (c) 2016 Sebastian Prein | http://mzdr.github.io/fluffy.js/ */

// using https://github.com/umdjs/umd/blob/master/templates/returnExports.js
(function register(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('Fluffy', factory);
    } else {
        root.Fluffy = factory();

        // in non-module mode we initialize Fluffy automatically,
        // otherwise we would have breaking changes ;)
        switch (document.readyState) {
            case 'loading':
            case 'interactive':
                document.onreadystatechange = function onReadyStateChange() {
                    if (document.readyState == 'complete') {
                        root.Fluffy.detect();
                    }
                };
                break;
            case 'complete':
                root.Fluffy.detect();
                break;
        }
    }
})(window, function Fluffy() {
    'use strict';

    /**
     * Fluffy version.
     *
     * @type {String}
     */

    var version = '2.1.1';

    /**
     * Simple detection of several features needed for Fluffy to run properly.
     *
     * @type {Boolean}
     */
    var featureSupport = !!document.querySelector && !!window.addEventListener && !!window.requestAnimationFrame;

    /**
     * Simple detection if we're on a touch device or not. I know, not really
     * reliable.
     *
     * @see http://www.stucox.com/blog/you-cant-detect-a-touchscreen/
     * @type {Boolean}
     */
    var isTouch = 'ontouchstart' in window;

    /**
     * This is the default CSS property used for shifting the Fluffy content.
     * During the automatic initialization there is a routine which checks if
     * it needs to be prefixed.
     *
     * @type {String}
     */
    var shiftProperty = 'transform';

    /**
     * All available smart size attributes.
     *
     * @type {Array}
     */
    var smartSize = ['smallest', 'average', 'largest'];

    /**
     * Defines the maximum decimal places when rounding in calculations.
     *
     * @type {Number}
     */
    var maxDecimalPlaces = 3;

    /**
     * Those are the default settings used by the FluffyObject class.
     *
     * @type {Object}
     */
    var defaults = {

        /**
         * If no trigger selector is given, the Fluffy container is also
         * the trigger area.
         *
         * @type {String}
         */
        triggerSelector: null,

        /**
         * Displays the current position within the scrollable content in
         * forms scrollbars for each dimension.
         *
         * @type {Boolean}
         */
        showScrollbars: true,

        /**
         * Automatically adjust the height of the content container according
         * to the smallest, largest or the average height of all items found.
         *
         * Allowed values: false, 'smallest', 'average', 'largest'.
         *
         * @type {Boolean}
         */
        smartHeight: false,

        /**
         * Automatically adjust the width of the content container according
         * to the smallest, largest or the average width of all items found.
         *
         * Allowed values: false, 'smallest', 'average', 'largest'.
         *
         * @type {Boolean}
         */
        smartWidth: false,

        /**
         * Define which dimension to trigger movement for.
         *
         * Allowed values: 'x', 'y', 'xy'.
         *
         * @type {String}
         */
        triggerDirection: 'x',

        /**
         * The higher the value the more lazier the reaction to the mouse
         * movement will be.
         *
         * @type {Number}
         */
        mouseDamp: 20,

        /**
         * Adds space (in pixel) to the trigger area where no action happens.
         *
         * @type {Number}
         */
        mousePadding: 60
    };

    /**
     * Size of the screen.
     *
     * @type {Object}
     */
    var screenSize = {
        x: window.innerWidth,
        y: window.innerHeight
    };

    /**
     * Fluffy stores all instantiated objects in this variable.
     *
     * @type {Array}
     */
    var fluffyObjects = [];

    /**
     * Just a simple console helper.
     *
     * @private
     * @param {Array|String} messages The message or array of messages.
     * @param {String} type Type of message. Could be 'warn', 'error', 'log' or 'debug' for example.
     * @return {Boolean}
     */
    function _(messages, type) {

        // default console message is of type debug
        type = typeof type !== 'undefined' ? type : 'debug';

        if (!window.console || !console[type]) {
            return true;
        }

        console[type].call(window.console, messages);

        return true;
    }

    /**
     * Registers global listener to the resize event that will handle all
     * instances of Fluffy.
     */
    function _registerResizeListener() {

        // need a debouncer
        var debounce;

        window.addEventListener('resize', function onResize(e) {

            // wait for it
            if (debounce) {
                clearTimeout(debounce);
            }

            debounce = setTimeout(function () {
                for (var i = 0; i < fluffyObjects.length; i++) {
                    fluffyObjects[i].updateContentSize();
                    fluffyObjects[i].updateContentPosition();
                }
            }, 100);
        });
    }

    /**
     * This represents a single Fluffy object.
     *
     * @param {HTMLElement} containerNode A DOM node representing a Fluffy container.
     */
    function FluffyObject(containerNode) {

        /**
         * This holds the Fluffy container.
         *
         * @type {HTMLElement}
         */
        this.container = null;

        /**
         * this holds the actual Fluffy content.
         *
         * @type {HTMLElement}
         */
        this.content = null;

        /**
         * This holds all child nodes of the Fluffy content.
         *
         * @type {NodeList}
         */
        this.items = null;

        /**
         * This holds the (separate) trigger element where the actual
         * interaction between the input device and the Fluffy container
         * happens. If no 'triggerSelector' has been provided the container
         * itself will be used for triggering.
         *
         * @type {HTMLElement}
         */
        this.trigger = null;

        /**
         * This holds the available scrollbars of the Fluffy container.
         *
         * @type {Object}
         */
        this.scrollbars = {};

        /**
         * This holds all relevant information about the mouse position,
         * including the MouseObserver.
         *
         * @type {Object}
         */
        this.mouse = {
            real: { x: 0, y: 0 },
            fake: { x: 0, y: 0 },
            last: { x: 0, y: 0 },
            observer: null
        };

        /**
         * This holds all relevant ratios needed for calculations.
         *
         * @type {Object}
         */
        this.ratios = {};

        /**
         * This holds the default settings as well as the user set settings.
         *
         * @type {Object}
         */
        this.settings = {};

        /**
         * This holds all cached sizes for all relevant DOM nodes.
         *
         * @type {Object}
         */
        this.sizes = {};

        /**
         * Removes text nodes and unneeded DOM elements from the content.
         *
         * @public
         */
        this.cleanContent = function cleanContent() {
            for (var i = 0; i < this.items.length; i++) {
                var current = this.items[i];
                var next = current.nextSibling;
                var prev = current.previousSibling;
                var parent = current.parentNode;

                // remove text nodes
                if (current !== null && current.nodeType === 3) {
                    parent.removeChild(current);
                }

                if (prev !== null && prev.nodeType === 3) {
                    parent.removeChild(prev);
                }

                if (next !== null && next.nodeType === 3) {
                    parent.removeChild(next);
                }
            }
        };

        /**
         * This method will do last preparations like adding scrollbars and
         * setting important CSS styling.
         *
         * @public
         */
        this.prepare = function prepare() {

            // remove invisible DOM nodes and anything that could f*ck up the
            // visual output of this instance
            this.cleanContent();

            // depending on the dimension to trigger the relevant scrollbars
            // will be created and attached to the container
            this.attachScrollbars();

            // get mouse observer instance
            this.mouse.observer = new MouseObserver(this);

            // set important styling
            this.container.style.overflow = 'hidden';

            // adjust styling to touch devices
            if (isTouch) {
                this.container.style.webkitOverflowScrolling = 'touch';
                this.container.style.overflowX = this.settings.triggerDirection.indexOf('x') >= 0 ? 'scroll' : 'hidden';
                this.container.style.overflowY = this.settings.triggerDirection.indexOf('y') >= 0 ? 'scroll' : 'hidden';
            }
        };

        /**
         * Attaches scrollbars to the container depending on which dimension
         * should be triggered and if showScrollbars is set to true.
         *
         * @public
         */
        this.attachScrollbars = function attachScrollbars() {

            // scrollbar disabled
            if (!this.settings.showScrollbars) {
                return;
            }

            var whichToCreate = [];

            // add horizontal scrollbar
            if (this.settings.triggerDirection.indexOf('x') >= 0) {
                whichToCreate.push('horizontal');
            }

            // add vertical scrollbar
            if (this.settings.triggerDirection.indexOf('y') >= 0) {
                whichToCreate.push('vertical');
            }

            // create scrollbar container
            var scrollbars = document.createElement('div');
            scrollbars.setAttribute('data-fluffy-scrollbars', '');

            for (var i = 0; i < whichToCreate.length; i++) {
                var scrollbar = document.createElement('span');
                scrollbar.classList.add('is-' + whichToCreate[i]);

                scrollbars.appendChild(scrollbar);
                this.scrollbars[whichToCreate[i]] = scrollbar;
            }

            this.container.appendChild(scrollbars);
            this.container.classList.add('has-scrollbar');
        };

        /**
         * Returns the width of the container.
         *
         * @public
         * @return {Number} In pixels.
         */
        this.getContainerWidth = function getContainerWidth() {
            return this.container.getBoundingClientRect().width;
        };

        /**
         * Returns the height of the container.
         *
         * @public
         * @return {Number} In pixels.
         */
        this.getContainerHeight = function getContainerHeight() {
            return this.container.getBoundingClientRect().height;
        };

        /**
         * Returns the width of the trigger.
         *
         * @public
         * @return {Number} In pixels.
         */
        this.getTriggerWidth = function getTriggerWidth() {
            return this.trigger.getBoundingClientRect().width;
        };

        /**
         * Returns the height of the trigger.
         *
         * @public
         * @return {Number} In pixels.
         */
        this.getTriggerHeight = function getTriggerHeight() {
            return this.trigger.getBoundingClientRect().height;
        };

        /**
         * Returns the width of the scrollable content by summing up all item
         * widths.
         *
         * @public
         * @return {Number} In pixels.
         */
        this.getContentWidth = function getContentWidth() {
            for (var i = 0, contentWidth = 0; i < this.items.length; i++) {
                contentWidth += this.items[i].getBoundingClientRect().width;
            }

            return contentWidth;
        };

        /**
         * Returns the height of the scrollable content by summing up all item
         * heights.
         *
         * @public
         * @return {Number} In pixels.
         */
        this.getContentHeight = function getContentHeight() {
            for (var i = 0, contentHeight = 0; i < this.items.length; i++) {
                contentHeight += this.items[i].getBoundingClientRect().height;
            }

            return contentHeight;
        };

        /**
         * Returns the smart widths for a set of items in a Fluffy container.
         * Smart hereby means the smallest, the average and the largest width.
         *
         * @public
         * @return {Object}
         */
        this.getSmartWidth = function getSmartWidth() {
            var widths = {
                smallest: null,
                largest: 0,
                average: 0
            };

            for (var i = 0; i < this.items.length; i++) {
                var width = 'naturalWidth' in this.items[i] ? this.items[i].naturalWidth : this.items[i].getBoundingClientRect().width;

                widths.average += width;

                if (width > widths.largest) {
                    widths.largest = width;
                }

                if (widths.smallest === null || width < widths.smallest) {
                    widths.smallest = width;
                }
            }

            // get average width
            widths.average /= this.items.length;

            return widths;
        };

        /**
         * Returns the smart heights for a set of items in a Fluffy container.
         * Smart hereby means the smallest, the average and the largest height.
         *
         * @public
         * @return {Object}
         */
        this.getSmartHeight = function getSmartHeight() {
            var heights = {
                smallest: null,
                largest: 0,
                average: 0
            };

            for (var i = 0; i < this.items.length; i++) {
                var height = 'naturalHeight' in this.items[i] ? this.items[i].naturalHeight : this.items[i].getBoundingClientRect().height;

                heights.average += height;

                if (height > heights.largest) {
                    heights.largest = height;
                }

                if (heights.smallest === null || height < heights.smallest) {
                    heights.smallest = height;
                }
            }

            // get average height
            heights.average /= this.items.length;

            return heights;
        };

        /**
         * Returns the total scrollable height.
         *
         * @public
         * @return {Number} In pixels.
         */
        this.getScrollableHeight = function getScrollableHeight() {
            return this.getContentHeight() - this.getContainerHeight();
        };

        /**
         * Returns the total scrollable width.
         *
         * @public
         * @return {Number} In pixels.
         */
        this.getScrollableWidth = function getScrollableWidth() {
            return this.getContentWidth() - this.getContainerWidth();
        };

        /**
         * Returns the mouse position in pixels as an array within the trigger
         * area.
         *
         * @public
         * @param {Object} e Mouse moving event.
         * @return {Array} An array holding the x, y position of the mouse.
         */
        this.getMousePosition = function getMousePosition(e) {
            /**
             * normalizing the offsetX, offsetY. thanks jack moore!
             * @see http://www.jacklmoore.com/notes/mouse-position/
             */
            e = e || window.event;

            var style = this.trigger.currentStyle || window.getComputedStyle(this.trigger, null);

            var rect = this.trigger.getBoundingClientRect();

            // trigger element borders
            var border = {
                left: style.borderLeftWidth | 0,
                right: style.borderRightWidth | 0,
                top: style.borderTopWidth | 0,
                bottom: style.borderBottomWidth | 0
            };

            // the border width and offset needs to be subtracted from the
            // mouse position
            var gap = {
                left: rect.left + border.left,
                right: border.left + border.right,
                bottom: border.top + border.bottom,
                top: rect.top + border.top
            };

            // retrieve value between 0 > value <= rect.{width,height}
            return {
                x: Math.min(Math.max(0, e.clientX - gap.left), rect.width - gap.right),
                y: Math.min(Math.max(0, e.clientY - gap.top), rect.height - gap.bottom)
            };
        };

        /**
         * Returns the fake mouse position which is adjusted to the padding set
         * and mapped to the content position.
         *
         * @public
         * @return {Array} An array holding the x, y position of the mouse.
         */
        this.getFakeMousePosition = function getFakeMousePosition() {

            // retrieve value between 0 > value <= rect.{width,height}
            return {
                x: Math.min(Math.max(0, this.mouse.real.x - this.settings.mousePadding), this.sizes.moveArea.width) * this.ratios.moveAreaToContent.width,
                y: Math.min(Math.max(0, this.mouse.real.y - this.settings.mousePadding), this.sizes.moveArea.height) * this.ratios.moveAreaToContent.height
            };
        };

        /**
         * Caches all sizes for several elements that are used in calculations.
         *
         * @public
         */
        this.cacheSizes = function cacheSizes() {
            /**
             * That's kind of a map for all sizes of all relevant DOM elements.
             *
             * @type {Object}
             */
            this.sizes = {
                container: {
                    width: this.getContainerWidth(),
                    height: this.getContainerHeight()
                },
                content: {
                    width: this.getContentWidth(),
                    height: this.getContentHeight()
                },
                scrollable: {
                    width: this.getScrollableWidth(),
                    height: this.getScrollableHeight()
                },
                trigger: {
                    width: this.getTriggerWidth(),
                    height: this.getTriggerHeight()
                },
                moveArea: {
                    width: this.getTriggerWidth() - this.settings.mousePadding * 2,
                    height: this.getTriggerHeight() - this.settings.mousePadding * 2
                },
                scrollbars: {
                    horizontal: this.settings.showScrollbars && this.scrollbars.horizontal ? this.scrollbars.horizontal.getBoundingClientRect() : null,
                    vertical: this.settings.showScrollbars && this.scrollbars.vertical ? this.scrollbars.vertical.getBoundingClientRect() : null
                }
            };
        };

        /**
         * Updates the size of the content element according the the calculated
         * width and height.
         *
         * @public
         */
        this.updateContentSize = function updateContentSize() {

            // any smart sizes requested?
            if (this.settings.smartWidth && smartSize.indexOf(this.settings.smartWidth) >= 0) {
                this.content.style.width = this.getSmartWidth()[this.settings.smartWidth] + 'px';
            }

            if (this.settings.smartHeight && smartSize.indexOf(this.settings.smartHeight) >= 0) {
                this.content.style.height = this.getSmartHeight()[this.settings.smartHeight] + 'px';
            }

            // cache all sizes
            this.cacheSizes();

            // run important calculations
            this.defineRatios();

            if (this.settings.triggerDirection.indexOf('x') >= 0) {
                this.content.style.width = (this.ratios.containerToContent.width * 100 + 0.001).toFixed(maxDecimalPlaces) + '%';
            }

            if (this.settings.triggerDirection.indexOf('y') >= 0) {
                this.content.style.height = (this.ratios.containerToContent.height * 100 + 0.001).toFixed(maxDecimalPlaces) + '%';
            }

            // check if mouse position needs to be adjusted
            if (screenSize.x !== window.innerWidth || screenSize.y !== window.innerHeight) {
                this.mouse.real = {
                    x: this.mouse.real.x * (window.innerWidth / screenSize.x),
                    y: this.mouse.real.y * (window.innerHeight / screenSize.y)
                };

                screenSize = {
                    x: window.innerWidth,
                    y: window.innerHeight
                };

                this.mouse.fake = this.getFakeMousePosition();
            }
        };

        /**
         * Scrolls the content to the given position according to the trigger
         * dimension set.
         *
         * @public
         */
        this.updateContentPosition = function updateContentPosition() {

            // by default
            var x = 0,
                y = 0;

            if (this.settings.triggerDirection.indexOf('x') >= 0) {
                x = (this.mouse.last.x / this.sizes.scrollable.width * this.ratios.contentToScrollableArea.width * 100).toFixed(maxDecimalPlaces);
            }

            if (this.settings.triggerDirection.indexOf('y') >= 0) {
                y = (this.mouse.last.y / this.sizes.scrollable.height * this.ratios.contentToScrollableArea.height * 100).toFixed(maxDecimalPlaces);
            }

            this.content.style[shiftProperty] = 'translate(-' + x + '%, -' + y + '%)';
        };

        /**
         * Updates the position of the scrollbar relative to the current
         * scrolled position within the content area.
         *
         * @public
         */
        this.updateScrollbarPosition = function updateScrollbarPosition() {

            if (!this.settings.showScrollbars) {
                return;
            }

            if (this.settings.triggerDirection.indexOf('x') >= 0) {
                this.scrollbars.horizontal.style.left = (this.mouse.last.x / this.sizes.scrollable.width * this.ratios.containerToScrollbarArea.width * 100).toFixed(maxDecimalPlaces) + '%';
            }

            if (this.settings.triggerDirection.indexOf('y') >= 0) {
                this.scrollbars.vertical.style.top = (this.mouse.last.y / this.sizes.scrollable.height * this.ratios.containerToScrollbarArea.height * 100).toFixed(maxDecimalPlaces) + '%';
            }
        };

        /**
         * Define several ratios needed for proper calculations.
         *
         * @public
         */
        this.defineRatios = function defineRatios() {

            // moving area to scrollable area
            this.ratios.moveAreaToContent = {
                width: this.sizes.scrollable.width / this.sizes.moveArea.width,
                height: this.sizes.scrollable.height / this.sizes.moveArea.height
            };

            // content to scrollable area
            this.ratios.contentToScrollableArea = {
                width: this.sizes.scrollable.width / this.sizes.content.width,
                height: this.sizes.scrollable.height / this.sizes.content.height
            };

            // container to content
            this.ratios.containerToContent = {
                width: this.sizes.content.width / this.sizes.container.width,
                height: this.sizes.content.height / this.sizes.container.height
            };

            // scrollbar to container
            this.ratios.containerToScrollbarArea = {
                width: this.sizes.scrollbars.horizontal ? (this.sizes.container.width - this.sizes.scrollbars.horizontal.width) / this.sizes.container.width : 0,
                height: this.sizes.scrollbars.vertical ? (this.sizes.container.height - this.sizes.scrollbars.vertical.height) / this.sizes.container.height : 0
            };
        };

        /**
         * Registers all listeners needed in order to track mouse positioning,
         * window resizing and scrolling calculations.
         *
         * @public
         */
        this.registerEventListeners = function registerEventListeners() {

            // Fluffy is ready
            if (this.container) {
                this.container.classList.add('is-ready');
            }

            // update content sizes
            this.updateContentSize();

            // stop right here if touch device!
            if (isTouch) {
                return;
            }

            this.trigger.addEventListener('mousemove', function onMouseMove(e) {

                // start mouse observer if not already started
                if (this.mouse.observer.status() === false) {
                    this.mouse.observer.start();
                }

                // get real mouse position in trigger area
                this.mouse.real = this.getMousePosition(e);

                // get fake mouse position (adjusted to set padding, mapped
                // to content position)
                this.mouse.fake = this.getFakeMousePosition();
            }.bind(this));
        };

        /**
         * That's the closure that is handling all the constructor logic and
         * builds up all available properties.
         */
        (function construct() {
            var contentNode = containerNode.querySelector('[data-fluffy-content]');

            // container has no content, that's not good!
            if (contentNode === null) {
                _(containerNode, 'warn');
                _('↳ Has no [data-fluffy-content] element and therefore will be ignored.', 'warn');
                return;
            }

            // prepare settings for this object
            var settings = {};

            // custom settings provided
            if (containerNode.hasAttribute('data-fluffy-options')) {

                // try to read the custom settings
                try {
                    var options = JSON.parse(containerNode.getAttribute('data-fluffy-options'));

                    // parsed options are in a wrong format
                    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
                        _(containerNode, 'warn');
                        _('↳ Fluffy options need to be of type object. Skipping for container above. Using defaults instead.', 'warn');

                        // use given options
                    } else {
                        settings = options;
                    }
                } catch (e) {
                    _(containerNode, 'warn');
                    _('↳ Trying to parse options for container above has failed. Using defaults instead.', 'warn');
                }

                // integrity checks for several options
                if ('mousePadding' in settings && settings.mousePadding < 0) {
                    settings.mousePadding = defaults.mousePadding;
                }

                if ('mouseDamp' in settings && settings.mouseDamp <= 0) {
                    settings.mouseDamp = defaults.mouseDamp;
                }
            }

            // fill up missing settings with its default values
            for (var key in defaults) {
                if (!(key in settings)) {
                    settings[key] = defaults[key];
                }
            }

            // fill properties
            this.container = containerNode;
            this.content = contentNode;
            this.items = contentNode.childNodes;
            this.settings = settings;
            this.trigger = containerNode;

            if (settings.triggerSelector) {
                var triggerNode = document.querySelector(settings.triggerSelector);

                if (triggerNode !== null) {
                    this.trigger = triggerNode;
                }
            }

            // time for last preparations
            this.prepare();

            // register final event listeners when document has been loaded
            switch (document.readyState) {
                case 'loading':
                case 'interactive':
                    document.onreadystatechange = function onReadyStateChange() {
                        if (document.readyState == 'complete') {
                            this.registerEventListeners();
                        }
                    }.bind(this);
                    break;
                case 'complete':
                    this.registerEventListeners();
                    break;
            }
        }).call(this);
    };

    /**
     * The MouseObserver is an object which provides functionality to start,
     * stop and get the current status of the observer. The observer itself is
     * an interval in where several calculations regarding the mouse are
     * happening and other parts are getting updated.
     *
     * @param {Object} fluffyObject A Fluffy object.
     */
    function MouseObserver(fluffyObject) {
        if (fluffyObject instanceof FluffyObject === false) {
            throw Error('MouseObserver expects first parameter to be an instance of FluffyObject. Instead ' + fluffyObject.constructor.name + ' was given.');
        }

        /**
         * Behaves the same as setInterval except uses requestAnimationFrame()
         * where possible for better performance.
         *
         * @private
         * @param {function} fn The callback function.
         * @param {int} delay The delay in milliseconds.
         */
        function _requestInterval(fn, delay) {
            var start = Date.now();
            var handle = {};

            function loop() {
                handle.value = window.requestAnimationFrame(loop);

                var current = Date.now();
                var delta = current - start;

                if (delta >= delay) {
                    fn.call();
                    start = Date.now();
                }
            }

            handle.value = window.requestAnimationFrame(loop);

            return handle;
        }

        /**
         * Behaves the same as clearInterval except uses
         * cancelRequestAnimationFrame() where possible for better performance.
         *
         * @private
         * @param {int|object} fn The callback function.
         */
        function _clearInterval(handle) {
            window.cancelAnimationFrame(handle.value);
        }

        /**
         * Starts the interval which runs last calculations on the mouse
         * position and updates other relevant parts of Fluffy.
         */
        this.start = function start() {

            // add modifier to container that it's moving
            fluffyObject.container.classList.add('is-moving');

            this.id = _requestInterval(function () {

                // make mouse move triggering more lazy
                var add = {
                    x: (fluffyObject.mouse.fake.x - fluffyObject.mouse.last.x) / fluffyObject.settings.mouseDamp,
                    y: (fluffyObject.mouse.fake.y - fluffyObject.mouse.last.y) / fluffyObject.settings.mouseDamp
                };

                // stop observing as no movement is going on
                if (Math.abs(add.x) < 0.001 && Math.abs(add.y) < 0.001) {

                    // stop observing
                    this.stop();

                    // remove modifier
                    fluffyObject.container.classList.remove('is-moving');
                }

                // update last mouse position
                fluffyObject.mouse.last.x += add.x;
                fluffyObject.mouse.last.y += add.y;

                // scroll content to last position
                fluffyObject.updateContentPosition();

                // update scrollbar positions
                fluffyObject.updateScrollbarPosition();
            }.bind(this), 10);
        };

        /**
         * Stops the interval and clears any status set.
         */
        this.stop = function stop() {
            this.id = _clearInterval(this.id);
        };

        /**
         * Returns a boolean value indicating whether the observer is running
         * or not.
         *
         * @return {Boolean}
         */
        this.status = function status() {
            return _typeof(this.id) === 'object';
        };
    };

    /**
     * Creates a Fluffy instance.
     *
     * @param {string|HTMLElement} reference
     */
    function create(reference) {
        var container = reference;

        if (typeof reference === 'string') {
            container = document.querySelector(reference);
        }

        // quit early if nothing found
        if (container === null) {
            return;
        }

        // check if there is already a Fluffy object with the given container
        for (var i = 0; i < fluffyObjects.length; i++) {
            if (fluffyObjects[i].container === container) {
                return;
            }
        }

        fluffyObjects.push(new FluffyObject(container));
    };

    /**
     * Automatically detects any Fluffy markup and creates according instances.
     */
    function detect() {

        // get all defined containers
        var containers = document.querySelectorAll('[data-fluffy-container]');

        // quit early if nothing found
        if (containers.length === 0) {
            return;
        }

        // fill our stack
        for (var i = 0; i < containers.length; i++) {
            create(containers[i]);
        }
    };

    /**
     * Build and check lifetime relevant things.
     */
    (function construct() {

        // lacking features?
        if (!featureSupport) {
            throw Error('Browser is lacking support for several requirements like: \'querySelector\', \'addEventListener\' or \'requestAnimationFrame\'.');
        }

        // since we're using CSS transforming to simulate the scrolling we need
        // to get the supported (vendor prefixed) CSS property for it
        shiftProperty = function getShiftProperty(prefixes) {
            var tmp = document.createElement('div');

            for (var i = 0; i < prefixes.length; i++) {
                if (prefixes[i] in tmp.style) {
                    return prefixes[i];
                }
            }

            throw Error('Browser doesn\'t support CSS3 transforms.');
        }(['transform', 'msTransform', 'MozTransform', 'WebkitTransform', 'OTransform']);

        // add global touch state modifier
        if (isTouch) {
            document.documentElement.classList.add('is-touch');
        }

        _registerResizeListener();
    })();

    return {
        create: create,
        detect: detect,
        version: version
    };
});
'use strict';

/* http://prismjs.com/download.html?themes=prism-okaidia&languages=clike+c+cpp&plugins=line-numbers+toolbar+copy-to-clipboard */
var _self = 'undefined' != typeof window ? window : 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function () {
  var e = /\blang(?:uage)?-(\w+)\b/i,
      t = 0,
      n = _self.Prism = { manual: _self.Prism && _self.Prism.manual, util: { encode: function encode(e) {
        return e instanceof a ? new a(e.type, n.util.encode(e.content), e.alias) : 'Array' === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
      }, type: function type(e) {
        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
      }, objId: function objId(e) {
        return e.__id || Object.defineProperty(e, '__id', { value: ++t }), e.__id;
      }, clone: function clone(e) {
        var t = n.util.type(e);switch (t) {case 'Object':
            var a = {};for (var r in e) {
              e.hasOwnProperty(r) && (a[r] = n.util.clone(e[r]));
            }return a;case 'Array':
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
          e.hasOwnProperty(l) && (t.call(e, l, e[l], a || l), 'Object' !== n.util.type(e[l]) || r[n.util.objId(e[l])] ? 'Array' !== n.util.type(e[l]) || r[n.util.objId(e[l])] || (r[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, l, r)) : (r[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, null, r)));
        }
      } }, plugins: {}, highlightAll: function highlightAll(e, t) {
      var a = { callback: t, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' };n.hooks.run('before-highlightall', a);for (var r, l = a.elements || document.querySelectorAll(a.selector), i = 0; r = l[i++];) {
        n.highlightElement(r, e === !0, a.callback);
      }
    }, highlightElement: function highlightElement(t, a, r) {
      for (var l, i, o = t; o && !e.test(o.className);) {
        o = o.parentNode;
      }o && (l = (o.className.match(e) || [, ''])[1].toLowerCase(), i = n.languages[l]), t.className = t.className.replace(e, '').replace(/\s+/g, ' ') + ' language-' + l, o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, '').replace(/\s+/g, ' ') + ' language-' + l);var s = t.textContent,
          u = { element: t, language: l, grammar: i, code: s };if (n.hooks.run('before-sanity-check', u), !u.code || !u.grammar) return u.code && (u.element.textContent = u.code), n.hooks.run('complete', u), void 0;if (n.hooks.run('before-highlight', u), a && _self.Worker) {
        var g = new Worker(n.filename);g.onmessage = function (e) {
          u.highlightedCode = e.data, n.hooks.run('before-insert', u), u.element.innerHTML = u.highlightedCode, r && r.call(u.element), n.hooks.run('after-highlight', u), n.hooks.run('complete', u);
        }, g.postMessage(JSON.stringify({ language: u.language, code: u.code, immediateClose: !0 }));
      } else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run('before-insert', u), u.element.innerHTML = u.highlightedCode, r && r.call(t), n.hooks.run('after-highlight', u), n.hooks.run('complete', u);
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
          var o = t[i];o = 'Array' === n.util.type(o) ? o : [o];for (var s = 0; s < o.length; ++s) {
            var u = o[s],
                g = u.inside,
                c = !!u.lookbehind,
                h = !!u.greedy,
                f = 0,
                d = u.alias;if (h && !u.pattern.global) {
              var p = u.pattern.toString().match(/[imuy]*$/)[0];u.pattern = RegExp(u.pattern.source, p + 'g');
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
    this.type = e, this.content = t, this.alias = n, this.length = 0 | (a || '').length, this.greedy = !!r;
  };if (a.stringify = function (e, t, r) {
    if ('string' == typeof e) return e;if ('Array' === n.util.type(e)) return e.map(function (n) {
      return a.stringify(n, t, e);
    }).join('');var l = { type: e.type, content: a.stringify(e.content, t, r), tag: 'span', classes: ['token', e.type], attributes: {}, language: t, parent: r };if ('comment' == l.type && (l.attributes.spellcheck = 'true'), e.alias) {
      var i = 'Array' === n.util.type(e.alias) ? e.alias : [e.alias];Array.prototype.push.apply(l.classes, i);
    }n.hooks.run('wrap', l);var o = Object.keys(l.attributes).map(function (e) {
      return e + '="' + (l.attributes[e] || '').replace(/"/g, '&quot;') + '"';
    }).join(' ');return '<' + l.tag + ' class="' + l.classes.join(' ') + '"' + (o ? ' ' + o : '') + '>' + l.content + '</' + l.tag + '>';
  }, !_self.document) return _self.addEventListener ? (_self.addEventListener('message', function (e) {
    var t = JSON.parse(e.data),
        a = t.language,
        r = t.code,
        l = t.immediateClose;_self.postMessage(n.highlight(r, n.languages[a], a)), l && _self.close();
  }, !1), _self.Prism) : _self.Prism;var r = document.currentScript || [].slice.call(document.getElementsByTagName('script')).pop();return r && (n.filename = r.src, !document.addEventListener || n.manual || r.hasAttribute('data-manual') || ('loading' !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(n.highlightAll) : window.setTimeout(n.highlightAll, 16) : document.addEventListener('DOMContentLoaded', n.highlightAll))), _self.Prism;
}();'undefined' != typeof module && module.exports && (module.exports = Prism), 'undefined' != typeof global && (global.Prism = Prism);
Prism.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\w\W]*?\*\//, lookbehind: !0 }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 }], string: { pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 }, 'class-name': { pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i, lookbehind: !0, inside: { punctuation: /(\.|\\)/ } }, keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/, 'boolean': /\b(true|false)\b/, 'function': /[a-z0-9_]+(?=\()/i, number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i, operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/, punctuation: /[{}[\];(),.:]/ };
Prism.languages.c = Prism.languages.extend('clike', { keyword: /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/, operator: /\-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|?\||[~^%?*\/]/, number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)[ful]*\b/i }), Prism.languages.insertBefore('c', 'string', { macro: { pattern: /(^\s*)#\s*[a-z]+([^\r\n\\]|\\.|\\(?:\r\n?|\n))*/im, lookbehind: !0, alias: 'property', inside: { string: { pattern: /(#\s*include\s*)(<.+?>|("|')(\\?.)+?\3)/, lookbehind: !0 }, directive: { pattern: /(#\s*)\b(define|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/, lookbehind: !0, alias: 'keyword' } } }, constant: /\b(__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|stdin|stdout|stderr)\b/ }), delete Prism.languages.c['class-name'], delete Prism.languages.c['boolean'];
Prism.languages.cpp = Prism.languages.extend('c', { keyword: /\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/, 'boolean': /\b(true|false)\b/, operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\/|\b(and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/ }), Prism.languages.insertBefore('cpp', 'keyword', { 'class-name': { pattern: /(class\s+)[a-z0-9_]+/i, lookbehind: !0 } });
!function () {
  'undefined' != typeof self && self.Prism && self.document && Prism.hooks.add('complete', function (e) {
    if (e.code) {
      var t = e.element.parentNode,
          s = /\s*\bline-numbers\b\s*/;if (t && /pre/i.test(t.nodeName) && (s.test(t.className) || s.test(e.element.className)) && !e.element.querySelector('.line-numbers-rows')) {
        s.test(e.element.className) && (e.element.className = e.element.className.replace(s, '')), s.test(t.className) || (t.className += ' line-numbers');var n,
            a = e.code.match(/\n(?!$)/g),
            l = a ? a.length + 1 : 1,
            r = new Array(l + 1);r = r.join('<span></span>'), n = document.createElement('span'), n.setAttribute('aria-hidden', 'true'), n.className = 'line-numbers-rows', n.innerHTML = r, t.hasAttribute('data-start') && (t.style.counterReset = 'linenumber ' + (parseInt(t.getAttribute('data-start'), 10) - 1)), e.element.appendChild(n);
      }
    }
  });
}();
!function () {
  if ('undefined' != typeof self && self.Prism && self.document) {
    var t = [],
        e = {},
        n = function n() {};Prism.plugins.toolbar = {};var a = Prism.plugins.toolbar.registerButton = function (n, a) {
      var o;o = 'function' == typeof a ? a : function (t) {
        var e;return 'function' == typeof a.onClick ? (e = document.createElement('button'), e.type = 'button', e.addEventListener('click', function () {
          a.onClick.call(this, t);
        })) : 'string' == typeof a.url ? (e = document.createElement('a'), e.href = a.url) : e = document.createElement('span'), e.textContent = a.text, e;
      }, t.push(e[n] = o);
    },
        o = Prism.plugins.toolbar.hook = function (a) {
      var o = a.element.parentNode;if (o && /pre/i.test(o.nodeName) && !o.classList.contains('code-toolbar')) {
        o.classList.add('code-toolbar');var r = document.createElement('div');r.classList.add('toolbar'), document.body.hasAttribute('data-toolbar-order') && (t = document.body.getAttribute('data-toolbar-order').split(',').map(function (t) {
          return e[t] || n;
        })), t.forEach(function (t) {
          var e = t(a);if (e) {
            var n = document.createElement('div');n.classList.add('toolbar-item'), n.appendChild(e), r.appendChild(n);
          }
        }), o.appendChild(r);
      }
    };a('label', function (t) {
      var e = t.element.parentNode;if (e && /pre/i.test(e.nodeName) && e.hasAttribute('data-label')) {
        var n,
            a,
            o = e.getAttribute('data-label');try {
          a = document.querySelector('template#' + o);
        } catch (r) {}return a ? n = a.content : (e.hasAttribute('data-url') ? (n = document.createElement('a'), n.href = e.getAttribute('data-url')) : n = document.createElement('span'), n.textContent = o), n;
      }
    }), Prism.hooks.add('complete', o);
  }
}();
!function () {
  if ('undefined' != typeof self && self.Prism && self.document) {
    if (!Prism.plugins.toolbar) return console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.'), void 0;var o = window.Clipboard || void 0;o || 'function' != typeof require || (o = require('clipboard'));var e = [];if (!o) {
      var t = document.createElement('script'),
          n = document.querySelector('head');t.onload = function () {
        if (o = window.Clipboard) for (; e.length;) {
          e.pop()();
        }
      }, t.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.8/clipboard.min.js', n.appendChild(t);
    }Prism.plugins.toolbar.registerButton('copy-to-clipboard', function (t) {
      function n() {
        var e = new o(i, { text: function text() {
            return t.code;
          } });e.on('success', function () {
          i.textContent = 'Copied!', r();
        }), e.on('error', function () {
          i.textContent = 'Press Ctrl+C to copy', r();
        });
      }function r() {
        setTimeout(function () {
          i.textContent = 'Copy';
        }, 5e3);
      }var i = document.createElement('a');return i.textContent = 'Copy', o ? n() : e.push(n), i;
    });
  }
}();
'use strict';

$(function () {
  var base = 'https://raw.githubusercontent.com/petr-lee/petr-lee.github.io/master/code/';
  var editor = $('#editor');

  $.get(base + 'main_lite.cpp', function (data) {
    editor.html(Prism.highlight(data, Prism.languages.cpp));
  });

  $('li').click(function () {
    if (!$(this).hasClass('selected')) {
      $('li.selected').removeClass('selected');
      $(this).addClass('selected');
      $.get(base + $(this).attr('file'), function (data) {
        editor.html(Prism.highlight(data, Prism.languages.cpp));
      });
    }
  });
});
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

    var options = [{ selector: '#sherlock-video',
      offset: 100,
      callback: function callback() {
        $('#sherlock-video').addClass('animated fadeInLeft');
      }
    }, { selector: '#sherlock-desc',
      offset: 100,
      callback: function callback() {
        $('#sherlock-desc').addClass('animated fadeInRight');
      }
    }, { selector: '#openark-preview',
      offset: 100,
      callback: function callback() {
        $('#openark-preview').addClass('animated fadeInLeft');
      }
    }, { selector: '#openark-desc',
      offset: 100,
      callback: function callback() {
        $('#openark-desc').addClass('animated fadeInRight');
      }
    }];

    Materialize.scrollFire(options);
  };

  /*** WEB MODAL ***/
  var webModal = function webModal() {
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
        'desc': 'At the European Innovation Academy, a 4-week extreme startup accelerator, I founded this tech startup along with a small team of software developers and business specialists. Hack In is a platform that facilitates the recruitment process of software develoepers through customizable and comprehensive software development assessments. Our platform uses Meteor as the web framework. To demo, a sample login is "sample@company.io" and the password is "12345678".',
        'link': 'http://hackin.io/'
      },

      'alary': {
        'title': 'Alary Language',
        'desc': 'I was requested to make this website for an official club at UC Berkeley. Alary Language focuses on connecting students who are passionate about learning and teaching languages. The club provides a more personal language learning experience with companionship. This website was made in a single day.',
        'link': 'http://alarylanguage.club/'
      },

      'csm': {
        'title': 'Computer Science Mentors',
        'desc': 'After becoming a member of CSM and visiting the official website, I was inspired to recreate it using a modern material theme. Leading a group of students was fulfilling for me knowing that I could be a role model for others.',
        'link': 'http://csmberkeley.github.io/#/'
      },

      'launchpad': {
        'title': 'Launchpad',
        'desc': 'After attending a tech talk by the founders of Box, I was inspired to gather the most passionate and intelligent students at UC Berkeley to solve real-world problems with artificial intelligence, machine learning, and data science.',
        'link': 'https://callaunchpad.org/#/'
      }
    };

    var changeWebModal = function changeWebModal(webID) {
      $('#website-modal h3').text(webInfo[webID]['title']);
      $('#website-modal p').text(webInfo[webID]['desc']);
      $('#website-modal a').attr('href', webInfo[webID]['link']);
      $('#website-modal img').attr('src', 'images/websites/' + webID + '.png');
    };

    $('.launchpad-btn').hover(function () {
      changeWebModal('launchpad');
    });

    $('.csm-btn').hover(function () {
      changeWebModal('csm');
    });

    $('.hackin-btn').hover(function () {
      changeWebModal('hackin');
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
  };

  init();
  links();
  scrolling();
  webModal();
});