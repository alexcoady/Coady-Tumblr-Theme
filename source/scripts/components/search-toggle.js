var utils     = require('./utils'),
    PjaxLink  = require('./pjax-link');


/**
 *  Defines a search object
 *
 *  @class Search
 */
function Search ( pluginHandler ) {

  var self = this;

  self.el;
  self.inputEl;
  self.toggleItems = [];
  self.bodyEl;

  self.pluginHandler = pluginHandler;

  self._handleBodyClick = function ( ev ) {

    // console.log('> Search: Body click');
    self._makeInactive(ev);
  }

  self._handleToggleClick = function ( ev ) {

    // console.log('> Search: Toggle click');
    ev.stopPropagation();
    self._makeActive();
  }

  self._handleSelfClick = function ( ev ) {

    ev.stopPropagation();
  }

  self._handleSelfKeypress = function ( ev ) {

    if ( ev.keyCode !== 13 ) return true;
    // ----------------------------------

    utils.preventDefault( ev );
    self._loadResult();
  }
}


/**
 *  Kicks off the togglable-search element by binding
 *  DOM elements to events and running methods
 *
 *  @method init
 *  @param {String} [selector] DOM element selector
 */
Search.prototype.init = function ( selector, containerEl ) {

  var self = this,
      selector = selector || '.Search',
      containerEl = containerEl && containerEl instanceof Element ? containerEl : document;

  // If already bound, wipe all bindings
  if ( self.el ) self._tearDown();

  self.el = containerEl.querySelector( selector );

  if ( !self.el ) return;
  // --------------------

  self.inputEl = self.el.querySelector('.Search-input');
  
  self._bindSelf( true );
  self._bindToggle( true );
};


Search.prototype._tearDown = function () {

  var self = this;

  self._bindSelf( false );
  self._bindBody( false );
  self._bindToggle( false );
};


Search.prototype._bindSelf = function ( bind ) {

  var self = this,
      tempItem;

  if ( bind ) {

    self.el.addEventListener( 'click', self._handleSelfClick );
    self.el.addEventListener( 'keypress', self._handleSelfKeypress );

  } else {

    self.el.removeEventListener( 'click', self._handleSelfClick );
    self.el.removeEventListener( 'click', self._handleSelfKeypress );
  }
};

/**
 *
 *  @private
 *  @method _bindBody
 */
Search.prototype._bindBody = function ( bind ) {

  var self = this,
      tempItem;

  self.bodyEl = document.body;

  if ( !self.bodyEl ) return;
  // --------------------------

  if ( bind ) {

    self.bodyEl.addEventListener( 'click', self._handleBodyClick );

  } else {

    self.bodyEl.removeEventListener( 'click', self._handleBodyClick );
  }
};


/**
 *
 *  @private
 *  @method _bindToggle
 */
Search.prototype._bindToggle = function ( bind, selector ) {

  var self = this,
      selector = selector || '.Search-toggle',
      tempItem;

  self.toggleEl = self.el.querySelector( selector );

  if ( !self.toggleEl ) return;
  // --------------------------

  if ( bind ) {

    self.toggleEl.addEventListener( 'click', self._handleToggleClick );

  } else {

    self.toggleEl.removeEventListener( 'click', self._handleToggleClick );
  }
};


Search.prototype._loadResult = function () {

  var self = this,
      pjaxLink,
      term,
      tempEl;

  if ( !self.el || !self.inputEl ) return;

  term = self.inputEl.value;
  term = '/search/' + term;

  tempEl = document.createElement('a');
  tempEl.href = term;

  pjaxLink = new PjaxLink( tempEl, self.pluginHandler.pjaxHijack );
  pjaxLink.init();
  pjaxLink.loadContent( true );
  pjaxLink._tearDown();
};


/**
 *  Toggles the active state of the search element
 *
 *  @method toggle
 */
Search.prototype.toggle = function () {

  var self = this;

  self.el.hasClass('is-active') ? self._makeInactive() : self._makeActive();
};


/**
 *  Activates the search element
 *
 *  @method _makeActive
 */
Search.prototype._makeActive = function () {

  var self = this;

  self.el.addClass('is-active');
  self.inputEl.focus();
  
  self._bindBody( true );
  self._bindSelf( true );
};


/**
 *  Deactivates the search element
 *
 *  @method _makeInactive
 */
Search.prototype._makeInactive = function () {

  var self = this;

  if ( self.el ) self.el.removeClass('is-active');

  self._bindBody( false );
  self._bindSelf( false );
};

module.exports = Search;