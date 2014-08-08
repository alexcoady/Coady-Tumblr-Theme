

function TagHandler ( pluginHandler ) {

  var self = this;

  self.pluginHandler = pluginHandler;
}


TagHandler.prototype.init = function ( selector, containerEl ) {
  
  var self = this,
      selector = selector || '.TagCollection',
      containerEl = containerEl && containerEl instanceof Element ? containerEl : document;

  console.log('> TagHandler: init');

  self.el = containerEl.querySelector( selector );

  if ( !self.el ) return;
  // --------------------

  self.checkLength();
};


TagHandler.prototype.checkLength = function () {
  
  var self = this,
      tags;

  tags = self.el.querySelectorAll('.Tag');

  if ( tags.length === 1 ) {

    self.el.addClass('has-single');
    tags[0].addClass('Tag--single');
  
  } else {

    self.el.removeClass('has-single');
    tags[0].removeClass('Tag--single');
  }
};

module.exports = TagHandler;