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
    // for (var i = 0; i < this.snake.segments.length; i++) {
    //   var segment = this.snake.segments[i];
    //   if (segment.pos[0] < 0 || segment.pos[1] < 0 || segment.pos[0] >= Board.size || segment.pos[1] >= Board.size) {
    //     return true;
    //   }
    // }

    var head = this.snake.segments[this.snake.segments.length - 1];
    if (head.pos[0] < 0 || head.pos[1] < 0 || head.pos[0] >= Board.size || head.pos[1] >= Board.size) {
      return true;
    }
    for (var i = 0; i < this.snake.segments.length - 2; i++) {
      var segment = this.snake.segments[i];
      if (head.pos[0] === segment.pos[0] && head.pos[1] === segment.pos[1]) {
        return true;
      }
    }
    return false;
  }

  Board.prototype.ensureApple = function () {
    var board = this;
    while (this.applePos === undefined) {
      var pos = [Math.floor(Math.random() * Board.size), Math.floor(Math.random() * Board.size)];
      var open = true;
      board.snake.segments.forEach(function (segment) {
        if (segment.pos[0] === pos[0] && segment.pos[1] === pos[1]) {
          open = false;
        }
      })

      if (open) {
        this.applePos = pos;
      }
    }
  }

  Board.prototype.eatApple = function () {
    for (var i = 0; i < this.snake.segments.length; i++) {
      var segment = this.snake.segments[i];
      if (segment.pos[0] === this.applePos[0] && segment.pos[1] === this.applePos[1]) {
        this.applePos = undefined;
        this.snake.length += 3;
      }
    }
  }

  Board.prototype.render = function ($el) {
    for (var i = 0; i < this.grid.length; i++) {
      var $row = $("<ul></ul>");
      $row.addClass("row");
      for (var j = 0; j < this.grid[i].length; j++) {
        var isSnake = false;
        for (var k = 0; k < this.snake.segments.length; k++) {
          var segment = this.snake.segments[k];
          if (segment.pos[0] === i && segment.pos[1] === j) {
            var $snakeSeg = $("<li></li>");
            $snakeSeg.addClass("snake-seg");
            $row.append($snakeSeg);
            isSnake = true;
          }
        }
        if (isSnake !== true) {
          if (this.applePos[0] === i && this.applePos[1] === j) {
            var $apple = $("<li></li>");
            $apple.addClass("apple");
            $row.append($apple);
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
