/**
 * Protect window.console method calls, e.g. console is not defined on IE
 * unless dev tools are open, and IE doesn't define console.debug
 */
(function() {
  if (!window.console) {
    window.console = {};
  }
  // union of Chrome, FF, IE, and Safari console methods
  var m = [
    "log", "info", "warn", "error", "debug", "trace", "dir", "group",
    "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
    "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
  ];
  // define undefined methods as noops to prevent errors
  for (var i = 0; i < m.length; i++) {
    if (!window.console[m[i]]) {
      window.console[m[i]] = function() {};
    }    
  } 
})();


// start app
var PageHandler       = require('./components/page-handler'),
    PluginHandler     = require('./components/plugin-handler');

var pluginHandler = new PluginHandler();
pluginHandler.init();

var pageHandler = PageHandler.getInstance();
pageHandler.init( '#Chrome-main', {
  pluginHandler: pluginHandler
});



(function(){

  // Add device class
  var body = document.body,
      html = body.parentNode;

  if( window.isDesktop ) html.addClass('is-desktop');
  if( window.isTablet ) html.addClass('is-tablet');
  if( window.isMobile ) html.addClass('is-mobile');
  if( window.isIE ) html.addClass('is-ie');
  if( window.hasMouseMove ) html.addClass('mousemove');

  if( !window.isDesktop ) return;
  // ----------------------------------

  // Scroll optimization
  // http://www.thecssninja.com/javascript/pointer-events-60fps

  var cover = document.createElement('div'),
      isScrollCovered = false,
      timer;

  cover.setAttribute('class', 'ScrollCover');

  // window.addEventListener('scroll', function() {
  //   if( timer ) clearTimeout( timer );

  //   if( !isScrollCovered ){
  //     isScrollCovered = true;
  //     body.appendChild(cover);
  //   }

  //   timer = setTimeout(function(){
  //     if( isScrollCovered ){
  //       isScrollCovered = false;
  //       body.removeChild( cover );
  //     }
  //   }, 250);
  // }, false);
})();