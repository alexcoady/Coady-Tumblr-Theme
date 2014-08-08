var _ = require('./../../bower_components/underscore/underscore');


/**
 *  Defines a sticky menu object
 *
 *  @class StickyMenu
 */
function StickyMenu () {

  this.el;
  this.navEl;
  this.contentEl;
  this.bodyEl;
  this.offset;
}


/**
 *  Kicks off the sticky menu element
 * 
 *  @method init
 *  @param {String} [selector] DOM Element selector
 *  @param {String} [navSelector] DOM Element selector for nav
 *  @return {Void}
 */
StickyMenu.prototype.init = function ( selector, navSelector ) {

  var self = this,
      checkPosition;

  self.el         = document.querySelector( selector || '#MenuBanner' );
  self.navEl      = document.querySelector( navSelector || '#nav' );
  self.contentEl  = document.querySelector( '.Chrome-main' );
  self.bodyEl     = document.querySelector('body');

  if ( !self.el || !self.navEl || !self.bodyEl ) return;
  // ---------------------------------------------------

  self._calcOffset();
};


/**
 *  Calculates the Y offset of the menu in the DOM
 * 
 *  @private
 *  @method _calcOffset
 *  @return {Void} Saves instance variable
 */
StickyMenu.prototype._calcOffset = function () {

  var self = this,
      bannerRect = self.el.getBoundingClientRect(),
      bodyRect   = self.bodyEl.getBoundingClientRect();

  self.offset = bannerRect.top - bodyRect.top;
};


/**
 *  Checks position of menu to see if it should be locked
 *  or unlocked
 * 
 *  @private
 *  @method _checkPosition
 *  @return {Void}
 */
StickyMenu.prototype._checkPosition = function () {

  var self = this;

  if ( window.pageYOffset < self.offset ) {
      
    self.el.removeClass('is-locked');
    self.navEl.removeClass('is-locked');
    self.contentEl.removeClass('is-pushed');

    // Re-calculates the offset incase the viewport has changed
    self._calcOffset();

  } else {
      
    self.el.addClass('is-locked');
    self.navEl.addClass('is-locked');
    self.contentEl.addClass('is-pushed');
  }
};


module.exports = StickyMenu;