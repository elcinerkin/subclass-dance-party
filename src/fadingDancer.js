var FadingDancer = function(top, left, timeBetweenSteps){
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  this._oldStep = Dancer.prototype.step;

  Dancer.call(this, top, left, timeBetweenSteps);
};

FadingDancer.prototype = Object.create(Dancer.prototype);
FadingDancer.prototype.constructor = FadingDancer;

FadingDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  console.log("inside blinky's step");
  this._oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this._$node.fadeToggle();
};
