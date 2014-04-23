var MovingDancer = function(top, left, timeBetweenSteps, speed, direction) {
  this._oldStep = Dancer.prototype.step; // function that sets up the
  Dancer.call(this, top, left, timeBetweenSteps);
  this._speed = speed;
  this._direction = direction;
};

MovingDancer.prototype = Object.create(Dancer.prototype);
MovingDancer.prototype.constructor = MovingDancer;

MovingDancer.prototype.move = function(){
  var margin = 25;
  var screenWidth = $('body').width();
  var screenHeight = $('body').height();
  var objWidth = this._$node.css('width');
  var objHeight = this._$node.css('height');
  var newTop;
  var newLeft;

  // convert objWidth and objHeight to numbers, so that we can use
  // them in calculating whether object is moving offscreen
  objWidth = Number.parseInt(objWidth.substr(0, objWidth.length-2));
  objHeight = Number.parseInt(objHeight.substr(0, objHeight.length-2));

  // dancers mostly travel in the direction they were going
  // but sometimes they change
  this._direction = Math.random() < 0.90 ? this._direction : Math.random() * 2 * Math.PI;

  newLeft = this._left + this._speed * Math.cos(this._direction);
  newTop = this._top + this._speed * Math.sin(this._direction);

  // Make sure moving dancers do not leave the screen
  if (newLeft <= margin || newLeft >= (screenWidth - objWidth - margin) ||
      newTop <= margin || newTop >= (screenHeight - objHeight - margin)) {

    // Change direction
    this._direction = this._direction + Math.PI/2 * Math.random();

    // Set position so dancer will not leave screen
    newLeft = Math.max(margin, newLeft);
    newLeft = Math.min(screenWidth - objWidth - margin, newLeft);
    newTop = Math.max(margin, newTop);
    newTop = Math.min(screenHeight - objHeight - margin, newTop);
  }

  // Flip graphic to point the direction the dancer is travelling
  if (this._direction > 3*Math.PI/2 || this._direction < Math.PI/2) {
    this._$node.css({
      '-webkit-transform': 'scaleX(1)',
      '-moz-transform':'scaleX(1)',
      '-ms-transform': 'scaleX(1)',
      '-o-transform': 'scaleX(1)',
      'transform': 'scaleX(1)'
    });
  } else {
    this._$node.css({
      '-webkit-transform': 'scaleX(-1)',
      '-moz-transform':'scaleX(-1)',
      '-ms-transform': 'scaleX(-1)',
      '-o-transform': 'scaleX(-1)',
      'transform': 'scaleX(-1)'
    });
  }

  // move to the new position
  this.setPosition(newTop, newLeft);
};

MovingDancer.prototype.step = function() {
  this._oldStep(); // ensure that the next step is loaded
  this.move(); // move the dancer
};
