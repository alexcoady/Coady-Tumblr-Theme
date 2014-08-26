var utils = require('./utils');

function ColorFun ( pluginHandler ) {

  var self = this;

  self.pluginHandler = pluginHandler;

  self._handleMouseover = function ( ev ) {

    self.updateColor( ev.x, ev.y );
  };
}

ColorFun.prototype.init = function ( selector, container ) {

  var self        = this,
      container   = container && container instanceof Element ? container : document.body,
      selector    = selector || '.ColorFun',
      bgSelector  = '.ColorFun-background',
      width, height;

  console.log('> ColorFun: init');

  self.el   = container.querySelector( selector );
  self.bgEl = container.querySelector( bgSelector );

  if ( !self.el || !self.bgEl ) return;
  // ----------------------------------

  self._bindMouseover( true );

  width = self.el.offsetWidth;
  height = self.el.offsetHeight;

  self.rangeR = utils.rangeFunc( 0, width, 0, 230 );
  self.rangeG = utils.rangeFunc( 0, width, 100, 0 );
  self.rangeB = utils.rangeFunc( 0, height, 0, 230 );
  self.rangeA = utils.rangeFunc( 0, height, 0, 1 );
};

ColorFun.prototype._bindMouseover = function ( bind ) {

  var self = this;

  if ( bind ) self.el.addEventListener( 'mousemove', self._handleMouseover );
}

ColorFun.prototype.updateColor = function ( x, y ) {

  var self = this,
      r,g,b,a,offset;

  offset = utils.getOffset( self.el );

  r = self.rangeR( x - offset.left ).toFixed(0);
  g = self.rangeG( x - offset.left ).toFixed(0);
  b = self.rangeB( y - offset.top ).toFixed(0);
  a = self.rangeA( y - offset.top ).toFixed(2);
  a = 1;

  self.bgEl.style.backgroundColor = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
}


module.exports = ColorFun;
