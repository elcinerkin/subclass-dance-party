var Goldfish = function(top, left, timeBetweenSteps){
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  var _oldStep = MovingDancer.prototype.step;
  var direction = 2*Math.PI*Math.random();
  var speed = 20;

  MovingDancer.call(this, top, left, timeBetweenSteps, speed, direction);

  // Fish appearance
  this._$node.css('background-image', 'url(images/goldfish.png)');
  this._$node.css('background-size', '100%');
  this._$node.css('width', '100px');
  this._$node.css('height', '60px');
  this._$node.css('border', '0');

  // Fish behavior
  var self = this;
  this._$node.on('mouseover', function(){
    self.spreadOut();
  });

};

Goldfish.prototype = Object.create(MovingDancer.prototype);
Goldfish.prototype.constructor = Goldfish;

// Goldfish want to move towards other goldfish
Goldfish.prototype._findDirection = function() {
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

Goldfish.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  // this moves the goldfish in its current direction
  this._oldStep();
  // have goldfish change its direction to move towards center of mass
  // of all goldfish
  this._findDirection();
  this.move();

  // is fish intersecting with a shark? then get out
  // get all sharks
  var sharks = [];
  for(var i=0; i<window.dancers.length; i++) {
    if(window.dancers[i] instanceof Shark) {
      sharks.push(window.dancers[i]);
    }
  }

  var thisTop = this._$node.css('top');
  var thisLeft = this._$node.css('left');
  thisTop = Number.parseFloat(thisTop.substr(0, thisTop.length-2));
  thisLeft = Number.parseFloat(thisLeft.substr(0, thisLeft.length-2));

  // for each shark
    // test if fish is intersecting with shark
      // if fish.top >= shark.top && fish.top <= shark.top+shark.height &&
      // if fish.left >= shark.left && fish.left <= shark.left+shark.width
        // spreadOut()
  for(var i=0; i<sharks.length; i++) {
    var sharkTop = sharks[i]._$node.css('top');
    var sharkLeft = sharks[i]._$node.css('left');
    sharkTop = Number.parseFloat(sharkTop.substr(0, sharkTop.length-2));
    sharkLeft = Number.parseFloat(sharkLeft.substr(0, sharkLeft.length-2));

    var sharkHeight = sharks[i]._$node.css('height');
    var sharkWidth = sharks[i]._$node.css('width');
    sharkHeight = Number.parseFloat(sharkHeight.substr(0, sharkHeight.length-2));
    sharkWidth = Number.parseFloat(sharkWidth.substr(0, sharkWidth.length-2));

    if(thisTop >= sharkTop && thisTop <= sharkTop + sharkHeight) {
      if(thisLeft >= sharkLeft && thisLeft <= sharkLeft + sharkWidth) {
        this.spreadOut();
      }
    }
  }

};


