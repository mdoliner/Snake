(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function () {
    this.segments = [new SnakeGame.Coord([9,9])];
  };

  Snake.prototype.move = function () {
    var snake = this;
    if (!(snake.dir === undefined)) {
      snake.segments.forEach(function (segment) {
        segment.plus(Snake.dirIncrements[snake.dir]);
      })
    }
  };

  Snake.prototype.turn = function (dir) {
    this.dir = dir;
  };

  Snake.dirIncrements = {"N": [-1, 0], "E": [0, 1], "S": [1, 0], "W": [0, -1]};

})();
