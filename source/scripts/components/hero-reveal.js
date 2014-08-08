var _ = require('./../../bower_components/underscore/underscore'), 
    utils = require('./utils'),
    transitionend = utils.getTransitionEnd();

/**
 *  Defines a hero reveal object
 *
 *  @class HeroReveal
 */
function HeroReveal () {

  this.heroEl;
  this.revealEl;
  this.hideEl;
  this.offset;
}


/**
 *  Kicks off the hero reveal element
 * 
 *  @method init
 *  @return {Void}
 */
HeroReveal.prototype.init = function () {

  var self = this,
      checkPosition;

  self.heroEl = document.querySelector('.Chrome-intro');
  self.revealEl = document.querySelector('.Chrome-introBanner');
  self.hideEl = document.querySelector('.Carousel-readMore');

  if ( !self.heroEl || !self.revealEl ) return;
  // ------------------------------------------

  _bindRevealClick = function (ev) {
    utils.preventDefault(ev);
    self.reveal();
  };

  _bindHideClick = function (ev) {
    utils.preventDefault(ev);
    self.hide();
  };

  self.revealEl.onclick = _bindRevealClick;
  self.hideEl.onclick = _bindHideClick;

  self._calcOffset();
};




HeroReveal.prototype._calcOffset = function () {

  var self = this;

  self.offset = self.heroEl.offsetHeight;
};



HeroReveal.prototype._checkPosition = function () {

  var self = this;

  if ( window.pageYOffset >= self.offset ) {

    self.hide();
  }
};



HeroReveal.prototype.reveal = function () {

  this.heroEl.addClass('is-active');
  this.revealEl.removeClass('is-active');
};



HeroReveal.prototype.hide = function () {

  var self = this;

  if ( !self.offset ) return;

  // Get height
  self.heroEl.removeClass('is-active');
  self.heroEl.style.height = self.offset + "px";
  self.heroEl.addClass('is-animating');
  self.heroEl.style.height = "0px";

  function _handleTransitionEnd (ev) {
    
    self.heroEl.removeClass('is-animating');
    self.heroEl.style.height = "";

    // Add reveal button but scroll past it
    self.revealEl.addClass('is-active');
    window.scrollTo(0, self.revealEl.offsetHeight);
  }

  self.heroEl.addEventListener( transitionend, _handleTransitionEnd );

  // Start animating

  // Callback and remove classes

  this.heroEl.removeClass('is-active');
};




module.exports = HeroReveal;