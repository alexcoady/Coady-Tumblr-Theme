var _             = require('./../../bower_components/underscore/underscore');


function GridHandler ( pluginHandler ) {

  var self = this;

  self.pluginHandler = pluginHandler;

  self.gutter = 8;
  self.imgWidth = 500;
  self.singleColMaxWidth = 600;

  _.bindAll( self, '_handleResize' );

};


GridHandler.prototype.init = function ( selector, containerEl ) {

  var self = this,
      selector = selector || '.ThumbCollection',
      containerEl = containerEl && containerEl instanceof Element ? containerEl : document;

  console.log('> GridHandler: init');

  self._tearDown();

  self.gridEl = containerEl.querySelector( selector );

  if ( !self.gridEl ) return;
  // ---------------------------------------

  // Don't want this on modal windows (fixed height elements)
  self.isFixed = self.gridEl.hasClass('ThumbCollection--fixed');
  if ( self.isFixed ) return;
  // -------------------------------------------------------------

  self.gridEl.addClass('ThumbCollection--dynamic');
  
  var startItemsEl = Array.prototype.slice.call( self.gridEl.children );
  self.items = self._createItems( startItemsEl );
  self.cols = [];
  self.isSingleCol = undefined;
  self._bindEvents( true );
  self._handleResize();

};


GridHandler.prototype._createItems = function ( itemsEl ) {
  
  var self = this,
      items = [],
      item, 
      el, 
      imgEl, 
      imgWidth, 
      imgHeight, 
      aspectRatio;

  for(var i = 0, l = itemsEl.length; i < l; i++){
    el = itemsEl[ i ];

    // set aspect ratio
    imgEl = el.querySelector('.Thumb-photo img');
    imgWidth = parseInt( imgEl.getAttribute('width') );
    imgHeight = parseInt( imgEl.getAttribute('height') );
    if( isNaN( imgWidth ) || imgWidth === 1 ) imgWidth = self.imgWidth;
    if( isNaN( imgHeight ) || imgHeight === 1 ) imgHeight = self.imgWidth * 0.6;
    aspectRatio = ( imgHeight / imgWidth );
    el.querySelector('.Thumb-photo').style['paddingBottom'] = (aspectRatio * 100) + '%';
    
    // set dynamic class
    el.querySelector('.Thumb').addClass('Thumb--dynamic');

    // remove img if without a src
    if( imgEl.getAttribute('src') === '' ){
      imgEl.parentNode.removeChild( imgEl );
    }

    // create and store item
    item = {
      el          : el,
      aspectRatio : aspectRatio
    }
    items.push( item );
  }

  return items;

};


GridHandler.prototype.addMore = function ( html, cb ) {

  var self = this,
      tempContainer,
      newItemsEl,
      newItems;

  if ( !self.gridEl ) return;
  // ------------------------------------------

  // Get elements from HTML string
  tempContainer = document.createElement( 'tempEl' );

  tempContainer.innerHTML = html;
  newItemsEl = Array.prototype.slice.call( tempContainer.children );
  newItems = self._createItems( newItemsEl );

  self._placeItems( newItems );

  self.items = self.items.concat( newItems );

  if ( _.isFunction(cb) ) cb( newItemsEl );

};


GridHandler.prototype._tearDown = function () {

  var self = this;

  self._bindEvents( false );

};


GridHandler.prototype._bindEvents = function ( bind ) {
  
  var self = this;

  if ( bind ) {
    window.addEventListener( 'resize', self._handleResize );
  } else {
    window.removeEventListener( 'resize', self._handleResize );
  }

};


GridHandler.prototype._handleResize = function () {

  var self = this,
    isSingleCol = ( window.innerWidth < self.singleColMaxWidth );

  // if different number of columns, re create them
  if( self.isSingleCol !== isSingleCol ){
    self.isSingleCol = isSingleCol;
    self._createCols();
    self._placeItems( self.items );
  }

};


GridHandler.prototype._removeAllChildren = function ( el ) {

  if( !el || !el['children'] ) return;

  var i = 0,
      l = el.children.length;
  for(; i < l; i++){
    el.removeChild( el.children[ 0 ] );
  }

};

GridHandler.prototype._createCols = function () {

  var self = this,
      i, l;

  // empty grid
  self._removeAllChildren( self.gridEl );

  // create columns
  self.cols = [];
  i = 0;
  l = self.isSingleCol ? 1 : 2;
  for(; i < l; i++){
    var colEl = document.createElement( 'div' );

    if( !self.isSingleCol ){
      colEl.style['width'] = 'calc(50% - '+(self.gutter * 0.5)+'px)';
      if( i === 0 ){
        colEl.style['marginRight'] = self.gutter+'px';
      }
      colEl.style['display'] = 'inline-block';
      colEl.style['verticalAlign'] = 'top';
    }

    self.gridEl.appendChild( colEl );

    var col = {
      el      : colEl,
      height  : 0, 
      addItem : function( item ){
        this.height += item.aspectRatio * self.imgWidth;
        this.el.appendChild( item.el );
      }
    };
    self.cols.push( col );
  }

};


GridHandler.prototype._placeItems = function ( items ) {

  var self = this,
      i, l;

  // place items in correct column
  i = 0;
  l = items.length;
  for(; i < l; i++){
    var item = items[ i ];

    var colIndex = 0;
    if( !self.isSingleCol ){
      if( self.cols[ 1 ].height < self.cols[ 0 ].height ){
          colIndex = 1;
      }
    }

    self.cols[ colIndex ].addItem( item );
  }

  // dispatch event
  self.pluginHandler.thumbHandler.onGridUpdated();

};


module.exports = GridHandler;