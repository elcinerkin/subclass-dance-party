var Shark = function(top, left, timeBetweenSteps){
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  //this._oldStep = MovingDancer.prototype.step;
  var speed = 10;
  var direction = 2*Math.PI*Math.random();

  MovingDancer.call(this, top, left, timeBetweenSteps, speed, direction);
  this._$node.css('background-image', 'url("images/shark.png")');
  this._$node.css('background-size', '100%');
  this._$node.css('width', '200px');
  this._$node.css('height', '120px');
  this._$node.css('border', '0');
};

Shark.prototype = Object.create(MovingDancer.prototype);
Shark.prototype.constructor = Shark;

// Shark.prototype.step = function(){
//   // call the old version of step at the beginning of any call to this new version of step
//   this._oldStep();
//   this.move();
//   // toggle() is a jQuery method to show/hide the <span> tag.
//   // See http://api.jquery.com/category/effects/ for this and
//   // other effects you can use on a jQuery-wrapped html tag.
//   //this._$node.fadeToggle();
// };
