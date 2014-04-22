// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps){

  // use jQuery to create an HTML <span> tag
  this._$node = $('<span class="dancer"></span>');
  this._timeBetweenSteps = timeBetweenSteps;
  this._top = top;
  this._left = left;
  this.step();
  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(top, left);

};

Dancer.prototype.lineUp = function() {
  this._$node.stop().animate({'left':'0'}, 150);
  this.setPosition(this._top, 0);
};

Dancer.prototype.step = function(){
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  var self = this;
  setTimeout(function() {
    self.step();
  }, this._timeBetweenSteps);
};

Dancer.prototype.spreadOut = function() {
  var newLeft = Math.random() * $('body').width();
  var newTop = Math.random() * $('body').height();
  this._$node.stop().animate({'left' : newLeft, 'top' : newTop}, 150);
  this.setPosition(newTop, newLeft);
};


Dancer.prototype.setPosition = function(top, left){
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  var styleSettings = {
    top: top,
    left: left
  };
  this._$node.css(styleSettings);
  this._top = top;
  this._left = left;
};
