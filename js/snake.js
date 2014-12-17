(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function () {
    this.length = 1;
    this.segments = [new SnakeGame.Coord([9,9])];
  };

  Snake.prototype.move = function () {
    var snake = this;
    if (snake.dir !== undefined) {
      var lastSegPos = this.segments[this.segments.length - 1].pos
      var newSegY = lastSegPos[0];
      var newSegX = lastSegPos[1];
      var newSeg = new SnakeGame.Coord([newSegY, newSegX]);
      newSeg.plus(Snake.dirIncrements[snake.dir])
      this.segments.push(newSeg);
      if (this.segments.length - 1 === this.length) {
        this.segments.shift();
      }
    }
  };

  Snake.prototype.turn = function (dir) {
    this.dir = dir;
  };

  Snake.dirIncrements = {"N": [-1, 0], "E": [0, 1], "S": [1, 0], "W": [0, -1]};

})();
