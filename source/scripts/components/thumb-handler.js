var _     = require('./../../bower_components/underscore/underscore'),
    utils = require('./utils');

/**
 *  Defines a thumb object
 *
 *  @private
 *  @class _Thumb
 *  @param {DOMElement} el The DOM element
 */
function _Thumb ( el ) {

  var self = this;

  self.el = el;
  self.isActive = false;

  // self.mouseenterDelay = 1000;

  // self._handleMouseenter = function ( ev ) {

  //   self.enterTimeout = setTimeout(function () {

  //     self._muteOthers( true );
    
  //   }, self.mouseenterDelay);
  // };

  // self._handleMouseleave = function ( ev ) {

  //   if ( self.enterTimeout ) clearTimeout( self.enterTimeout );

  //   self._muteOthers( false );
  // };
}


// Static property others defines all the other thumb items
_Thumb.others = [];


/**
 *  Kicks off the thumb element
 * 
 *  @method init
 *  @return {Void}
 */
_Thumb.prototype.init = function () {

  var self = this;

  self._parseTitle();
  // self._bind( true );

};


// _Thumb.prototype._tearDown = function ( bind ) {

//   var self = this;

//   self._bind( false );
// };



// _Thumb.prototype._bind = function ( bind ) {

//   var self = this;

//   if ( !self.el ) return;
//   // --------------------

//   if ( bind ) {

//     self.el.addEventListener( 'mouseenter', self._handleMouseenter );
//     self.el.addEventListener( 'mouseleave', self._handleMouseleave );

//   } else {

//     self.el.removeEventListener( 'mouseenter', self._handleMouseenter );
//     self.el.removeEventListener( 'mouseleave', self._handleMouseleave );
//   }
// };


_Thumb.prototype._parseTitle = function () {

  var self = this,
      titleEl,
      tempTitle;

  titleEl = self.el.querySelector('.Thumb-title');

  if ( !titleEl || !titleEl.innerHTML ) return;
  // ------------------------------------------

  titleEl.innerHTML = utils.getFirstLine( titleEl );
};


_Thumb.prototype.checkPosition = function ( rangeTop, rangeBottom, noTrans ) {

  var self = this,
      rect;

  if ( self.isActive ) return;
  // -------------------------

  rect = self.el.getBoundingClientRect();
  
  if ( rect.top >= rangeTop && rect.top <= rangeBottom ) {

    if ( noTrans ) self.el.addClass('no-trans');

    self.el.addClass('is-active');
    self.isActive = true;
    
    return true;
  }
  
  return false;
};


/**
 *  Mute or unmute every thumb except for this one
 * 
 *  @private
 *  @method _muteOthers
 *  @param {Boolean} mute Flag as whether to mute or not
 *  @return {Void}
 */
// _Thumb.prototype._muteOthers = function ( mute ) {

//   var self = this,
//       items = _Thumb.others.slice(),
//       index = items.indexOf(self);

//   if ( index < 0 ) return;
//   // ----------------------

//   items.splice( index, 1 );
//   _Thumb._mute( items, mute );
// };


/**
 *  Mute or unmute this thumb
 * 
 *  @private
 *  @method _mute
 *  @param {Boolean} mute Flag as whether to mute or not
 *  @return {Void}
 */
// _Thumb.prototype._mute = function ( mute ) {

//   mute ? this.el.addClass('is-muted') : this.el.removeClass('is-muted');
// };


/**
 *  Mute or unmute a collection of thumb items
 * 
 *  @private
 *  @static
 *  @method _mute
 *  @param {Array} items Items to mute or unmute
 *  @param {Boolean} mute Flag as whether to mute or not
 *  @return {Void}
 */
// _Thumb._mute = function ( items, mute ) {

//   var count = items.length;
//   while ( count-- ) {

//     items[count]._mute( mute );
//   }
// };































/**
 *  Defines a thumb hover object
 *
 *  @class ThumbHandler
 */
function ThumbHandler ( pluginHandler ) {

  var self = this;

  self.pluginHandler = pluginHandler;
  self.items = [];
  self.inactiveItems = [];
  self.bottomOffset = -200; // 0

  function _handleScroll ( ev ) {

    self._scrollPage( ev );
  }

  self._handleScroll = _.throttle( _handleScroll, 500 );
  // self._handleScroll = _handleScroll;
}


/**
 *  Kicks off the thumb hover object
 * 
 *  @method init
 *  @return {Void}
 */
ThumbHandler.prototype.init = function ( selector, containerEl ) {

  var self = this;

  console.log('> ThumbHandler: init');

  self._tearDown();

  self.pageEl = document.querySelector( '.Page-inner' );
  self.el = containerEl && containerEl instanceof Element ? containerEl : document;

  self._setItems( selector );
  self._bindScroll( true );
  self.onGridUpdated();
};


ThumbHandler.prototype._bindScroll = function ( bind ) {

  var self = this;

  if ( bind && self.pageEl ) {

    window.addEventListener( 'scroll', self._handleScroll );

  } else {

    window.removeEventListener( 'scroll', self._handleScroll );
  }
  
};


ThumbHandler.prototype._scrollPage = function ( ev ) {

  var self = this,
      rangeTop,
      rangeBottom;

  rangeTop = 0 + self.bottomOffset;
  rangeBottom = window.innerHeight + self.bottomOffset;

  self._checkItemsPositions( rangeTop, rangeBottom, false );
};


ThumbHandler.prototype._checkItemsPositions = function ( rangeTop, rangeBottom, noTrans ) {

  var self = this,
      count = self.inactiveItems.length,
      rangeTop = rangeTop || 0 + self.bottomOffset,
      rangeBottom = rangeBottom || window.innerHeight + self.bottomOffset;

  if ( noTrans ) {
    rangeTop -= self.bottomOffset;
    rangeBottom -= self.bottomOffset;
  }

  while ( count-- ) {

    if (self.inactiveItems[count].checkPosition( rangeTop, rangeBottom, noTrans )) {
      self.inactiveItems.splice( count, 1 );
    }
  }
}


ThumbHandler.prototype._tearDown = function () {

  var self = this;

  self.items = [];
  self.inactiveItems = [];
  self._bindScroll( false );
};


ThumbHandler.prototype.addItems = function ( wrappedItems ) {

  var self = this,
      count = wrappedItems.length,
      tempEl,
      tempThumb;

  while ( count-- ) {

    tempEl = wrappedItems[count].querySelector('.Thumb');

    if ( !tempEl ) continue;
    // ---------------------

    tempThumb = new _Thumb( tempEl );
    tempThumb.init();
    self.items.push( tempThumb );
    self.inactiveItems.push( tempThumb );
  }

  _Thumb.others = self.items;
};


ThumbHandler.prototype.onGridUpdated = function () {

  var self = this;

  self._checkItemsPositions( null, null, false );
};


/**
 *  Populates the thumb items based on a selector query
 *
 *  @private
 *  @method _setItems
 *  @param {String} [selector] DOM element selector for items
 *  @return {Void}
 */
ThumbHandler.prototype._setItems = function ( selector ) {

  var self = this,
      els = self.el.querySelectorAll( selector || '.Thumb' ),
      count = els.length,
      tempThumb;

  while ( count-- ) {

    tempThumb = new _Thumb( els[count] );
    tempThumb.init();
    self.items.push( tempThumb );
    self.inactiveItems.push( tempThumb );
  }

  _Thumb.others = self.items;
};


module.exports = ThumbHandler;