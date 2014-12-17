(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Coord = SnakeGame.Coord = function (pos) {
    this.pos = pos;
  };

  Coord.prototype.plus = function (increment) {
    this.pos[0] += increment[0];
    this.pos[1] += increment[1];
  };

})();
