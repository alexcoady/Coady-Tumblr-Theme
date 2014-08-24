var utils             = require('./utils'),
    MenuToggle        = require('./menu-toggle'),
    SearchToggle      = require('./search-toggle'),
    CinemaCarousel    = require('./cinema-carousel'),
    ThumbHandler      = require('./thumb-handler'),
    PjaxHijack        = require('./pjax-hijack'),
    PageHandler       = require('./page-handler'),
    TagHandler        = require('./tag-handler'),
    CloseHandler      = require('./close-handler'),
    PostHandler       = require('./post-handler'),
    LoadingHandler    = require('./loading-handler');


function PluginHandler () {

  var self = this;

  self.isFirst = true;
}



PluginHandler.prototype.init = function () {
  
  var self = this;

  console.log( '> PluginHandler: init' );
  
  self.menuToggle     = new MenuToggle( self );
        
  self.pjaxHijack     = new PjaxHijack( self );
    
  self.postHandler    = new PostHandler( self );
  
  self.loadingHandler = new LoadingHandler( self );
};


PluginHandler.prototype.beforePageEnter = function ( page ) {
   
  var self = this;

  self.loadingHandler.init();
  
  self.loadingHandler.start();

  // Bind a post
  self.postHandler.init( null, page.el );
}


PluginHandler.prototype.afterPageEnter = function ( page ) {
  
  var self = this;

  console.log( '> PluginHandler: afterPageEnter', page.prevURL );

  self.loadingHandler.finish();

  // initialise menu toggle
  self.menuToggle.init( '.Menu', '.Hamburger');

  // Intiialise pjax hijack
  self.pjaxHijack.init( null, page.el, self.isFirst );

  // Bind a post
  self.postHandler.init( null, page.el );

  if ( self.isFirst ) self.isFirst = false;
};


PluginHandler.prototype.beforePageLeave = function () {
   
  var self = this;

  self.introEffect.destroy();
}


PluginHandler._instance = undefined;

PluginHandler.getInstance = function () {

  if ( !PluginHandler._instance ) PluginHandler._instance = new PluginHandler();

  return PluginHandler._instance;
};


module.exports = PluginHandler;
