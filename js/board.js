(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function () {
    this.snake = new SnakeGame.Snake();
    this.grid = this.createGrid();
  };

  Board.prototype.createGrid = function () {
    var result = [];
    for (var i = 0; i < Board.size; i++) {
      result.push(new Array(Board.size));
    }

    return result;
  };

  Board.prototype.isOver = function () {
    for (var i = 0; i < this.snake.segments.length; i++) {
      var segment = this.snake.segments[i];
      if (segment.pos[0] < 0 || segment.pos[1] < 0 || segment.pos[0] >= Board.size || segment.pos[1] >= Board.size) {
        return true;
      }
    }

    return false;
  }

  Board.prototype.render = function ($el) {
    for (var i = 0; i < this.grid.length; i++) {
      var $row = $("<ul></ul>");
      $row.addClass("row");
      for (var j = 0; j < this.grid[i].length; j++) {
        for (var k = 0; k < this.snake.segments.length; k++) {
          var segment = this.snake.segments[k];
          if (segment.pos[0] === i && segment.pos[1] === j) {
            var $snakeSeg = $("<li></li>");
            $snakeSeg.addClass("snake-seg");
            $row.append($snakeSeg);
          } else {
            var $tile = $("<li></li>");
            $tile.addClass("tile");
            $row.append($tile);
          }
        }
      }
      $el.append($row);
    }
  };

  Board.size = 20;

})();
