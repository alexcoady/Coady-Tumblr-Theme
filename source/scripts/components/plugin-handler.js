var utils             = require('./utils'),
    MenuToggle        = require('./menu-toggle'),
    SearchToggle      = require('./search-toggle'),
    CinemaCarousel    = require('./cinema-carousel'),
    ThumbHandler      = require('./thumb-handler'),
    PjaxHijack        = require('./pjax-hijack'),
    IntroEffect       = require('./intro-effect'),
    InfiniteScroll    = require('./infinite-scroll'),
    PageHandler       = require('./page-handler'),
    GridHandler       = require('./grid-handler'), // masonry-handler
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
  
  // self.tagMenuToggle  = new MenuToggle( self );

  // self.searchToggle   = new SearchToggle( self );
  
  // self.cinemaCarousel = new CinemaCarousel( self );
  
  // self.thumbHandler   = new ThumbHandler( self );
  
  // self.pjaxHijack     = new PjaxHijack( self );
  
  // self.introEffect    = new IntroEffect( self );
  
  // self.infiniteScroll = new InfiniteScroll( self );

  // self.gridHandler    = new GridHandler( self );

  // self.tagHandler     = new TagHandler( self );

  // self.closeHandler   = new CloseHandler( self );

  // self.postHandler    = new PostHandler( self );
  
  // self.loadingHandler = new LoadingHandler( self );
};


PluginHandler.prototype.beforePageEnter = function ( page ) {
   
  var self = this;

  // self.loadingHandler.init();
  
  // // self.loadingHandler.start();

  // // Initialise tag handler
  // self.tagHandler.init( null, page.el );

  // // Initialise grid
  // self.gridHandler.init( null, page.el );

  // // Intialise thumb hover 
  // self.thumbHandler.init( null, page.el );

  // // Bind a post
  // self.postHandler.init( null, page.el );
}


PluginHandler.prototype.afterPageEnter = function ( page ) {
  
  var self = this;

  // console.log( '> PluginHandler: afterPageEnter', page.prevURL );

  // self.loadingHandler.finish();

  // initialise menu toggle
  self.menuToggle.init( '.Menu', '.Hamburger');

  // initialise menu toggle
  // self.tagMenuToggle.init( '#TagMenu', '.TagMenuToggle');

  // // initialise search toggle
  // self.searchToggle.init( null, page.el );

  // // initialise cinema carousel
  // self.cinemaCarousel.init( null, page.el );

  // // Intiialise pjax hijack
  // self.pjaxHijack.init( null, page.el, self.isFirst );

  // // Initialise intro effect
  // self.introEffect.init( null, page.el, self.isFirst );

  // // Initialise infinite scroll
  // self.infiniteScroll.init( null, page.el );

  // // Bind any close buttons
  // self.closeHandler.init( null, page.el, page.prevURL );

  // // Bind a post
  // self.postHandler.init( null, page.el );

  // // Bind APIs
  // self.bindAPIs();

  if ( self.isFirst ) self.isFirst = false;
};


PluginHandler.prototype.beforePageLeave = function () {
   
  var self = this;

  self.introEffect.destroy();
}


PluginHandler.prototype.afterInfiniteScroll = function ( html, isFixed ) {
  
  var self = this,
      newItems,
      isFixed = isFixed || false;

  function _afterGrid ( items ) {

    // Reintialise thumb hover 
    self.thumbHandler.addItems( items );

    // Reintialise pjax hijack
    self.pjaxHijack.addItems( items );
  }

  if ( isFixed ) {

    self.thumbHandler.init(  );
    self.pjaxHijack.init(  );

  } else {

    self.gridHandler.addMore( html, _afterGrid );
  }
};

PluginHandler.prototype.beforeHeaderShow = function () {
  
};

PluginHandler.prototype.beforeHeaderHide = function () {
  
};



PluginHandler.prototype.bindAPIs = function () {
  
  var self = this,
      postId;
  
  try {

    FB.XFBML.parse(); 
    twttr.widgets.load();

    postId = utils.getPostId( window.location.pathname );

    if ( postId ) {

      Tumblr.LikeButton.get_status_by_post_ids([postId]);
    }
  
  } catch (ex) {}
};



PluginHandler._instance = undefined;

PluginHandler.getInstance = function () {

  if ( !PluginHandler._instance ) PluginHandler._instance = new PluginHandler();

  return PluginHandler._instance;
};


module.exports = PluginHandler;
