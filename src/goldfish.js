var Goldfish = function(top, left, timeBetweenSteps){
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  var direction = 2*Math.PI*Math.random();
  var speed = 20;

  MovingDancer.call(this, top, left, timeBetweenSteps, speed, direction);
  this._$node.css('background-image', 'url(images/goldfish.png)');
  this._$node.css('background-size', '100%');
  this._$node.css('width', '100px');
  this._$node.css('height', '60px');
  this._$node.css('border', '0');
};

Goldfish.prototype = Object.create(MovingDancer.prototype);
Goldfish.prototype.constructor = Goldfish;

// Goldfish.prototype.step = function(){
//   // call the old version of step at the beginning of any call to this new version of step
//   this._oldStep();
//   // toggle() is a jQuery method to show/hide the <span> tag.
//   // See http://api.jquery.com/category/effects/ for this and
//   // other effects you can use on a jQuery-wrapped html tag.
//   //this._$node.fadeToggle();
// };


