var MovingDancer = function(top, left, timeBetweenSteps, speed, direction) {
  this._oldStep = Dancer.prototype.step;
  Dancer.call(this, top, left, timeBetweenSteps);
  this._speed = speed;
  this._direction = direction;
};

MovingDancer.prototype = Object.create(Dancer.prototype);
MovingDancer.prototype.constructor = MovingDancer;

MovingDancer.prototype.move = function(){
  var MARGIN = 25;
  var newTop;
  var newLeft;
  var screenWidth = $('body').width();
  var screenHeight = $('body').height();
  var objWidth = this._$node.css('width');
  objWidth = Number.parseInt(objWidth.substr(0, objWidth.length));
  var objHeight = this._$node.css('height');
  objHeight = Number.parseInt(objHeight.substr(0, objHeight.length));

  this._direction = Math.random() < 0.90 ? this._direction : Math.random() * 2 * Math.PI;

  newLeft = this._left + this._speed * Math.cos(this._direction);
  newTop = this._top + this._speed * Math.sin(this._direction);

  if (newLeft <= MARGIN || newLeft >= (screenWidth - objWidth - MARGIN) ||
      newTop <= MARGIN || newTop >= (screenHeight - objHeight - MARGIN)) {
    this._direction = this._direction + Math.PI/2 * Math.random();
    newLeft = Math.max(MARGIN, newLeft);
    newLeft = Math.min(screenWidth - objWidth - MARGIN, newLeft);
    newTop = Math.max(MARGIN, newTop);
    newTop = Math.min(screenHeight - objHeight - MARGIN, newTop);
  }

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


/*  // if(this._direction === 'left'){
  //   newTop = this._top;
  //   newLeft = this._left - this._speed;
  //   if (newLeft < 0) {
  //     this._direction = 'right';
      this._$node.css({
        '-webkit-transform': 'scaleX(1)',
        '-moz-transform':'scaleX(1)',
        '-ms-transform': 'scaleX(1)',
        '-o-transform': 'scaleX(1)',
        'transform': 'scaleX(1)'
      });
  //   }
  // }
  // else if(this._direction === 'right') {
  //   newTop = this._top;
  //   newLeft = this._left + this._speed;
  //   if (newLeft > screenWidth) {
  //     this._direction = 'left';
      this._$node.css({
        '-webkit-transform': 'scaleX(-1)',
        '-moz-transform':'scaleX(-1)',
        '-ms-transform': 'scaleX(-1)',
        '-o-transform': 'scaleX(-1)',
        'transform': 'scaleX(-1)'
      });*/
  //   }
  // }
  // else if(this._direction === 'top') {
  //   newTop = this._top - this._speed;
  //   newLeft = this._left;
  // }
  // else if(this._direction === 'bottom') {
  //   newTop = this._top + this._speed;
  //   newLeft = this._left ;
  // }

  this.setPosition(newTop, newLeft);
};

MovingDancer.prototype.step = function() {
  this._oldStep();
  this.move();
};
