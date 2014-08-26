var utils = require('./utils');

function ColorFun ( pluginHandler ) {

  var self = this;

  self.pluginHandler = pluginHandler;

  self._handleMouseover = function ( ev ) {

    self.updateColor( ev.x, ev.y );
  };
}

ColorFun.prototype.init = function ( container, selector ) {

  var self      = this,
      container = container && container instanceof Element || document.body,
      selector  = selector || '.ColorFun';

  self.el = container.querySelector( selector );

  if ( !self.el ) return;
  // --------------------
};

ColorFun.prototype.updateColor = function ( x, y ) {
}


module.exports = ColorFun;
