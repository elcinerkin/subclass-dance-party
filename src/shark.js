var Shark = function(top, left, timeBetweenSteps){
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  this._oldStep = MovingDancer.prototype.step;
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

Shark.prototype._findDirection = function() {
  // get current fish's position
  var thisTop = this._$node.css('top');
  var thisLeft = this._$node.css('left');
  thisTop = Number.parseFloat(thisTop.substr(0, thisTop.length-2));
  thisLeft = Number.parseFloat(thisLeft.substr(0, thisLeft.length-2));


  // get all other goldfish's positions
  var goldfish = {top: [], left: []};
  for (var i = 0; i < window.dancers.length; i++) {
    if (window.dancers[i] instanceof Goldfish) {
      var fishNode = window.dancers[i]._$node;
      var fishTop = fishNode.css('top');
      var fishLeft = fishNode.css('left');
      fishTop = Number.parseFloat(fishTop.substr(0, fishTop.length-2));
      fishLeft = Number.parseFloat(fishLeft.substr(0, fishLeft.length-2));
      goldfish['top'].push(fishTop);
      goldfish['left'].push(fishLeft);
    }
  }

  // calculate the center of mass of the goldfish
  var average = function(arr) {
    var sum = 0;
    for(var i = 0; i<arr.length; i++) {
      sum += arr[i];
    }
    return sum/arr.length;
  };

  var comTop = average(goldfish['top']);
  var comLeft = average(goldfish['left']);

  var topBias = Math.random()*500;
  topBias = Math.random() > 0.5 ? topBias : -1*topBias;
  var leftBias = Math.random()*500;
  leftBias = Math.random() > 0.5 ? leftBias : -1*leftBias;
  var direction = Math.atan2(comTop - thisTop + topBias, comLeft - thisLeft + leftBias);

  // set direction to point towards center of mass
  this._direction = direction;
};

Shark.prototype.step = function(){
  this._oldStep();
  // have shark change its direction to move towards center of mass
  // of all goldfish
  this._findDirection();
  this.move();
};
