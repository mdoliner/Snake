(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board();
    var view = this;
    $(window).on("keydown", function (event) { view.handleKeyEvent(event); });

    this.intervalId = window.setInterval(function () {
      view.step();
    }, 85);
  };

  View.prototype.handleKeyEvent = function (event) {
    if (event.keyCode === 40 && (this.board.snake.dir !== "N" || this.board.snake.length === 1)) {
      this.board.snake.turn("S");
    } else if (event.keyCode === 39 && (this.board.snake.dir !== "W" || this.board.snake.length === 1)) {
      this.board.snake.turn("E");
    } else if (event.keyCode === 38 && (this.board.snake.dir !== "S" || this.board.snake.length === 1)) {
      this.board.snake.turn("N");
    } else if (event.keyCode === 37 && (this.board.snake.dir !== "E" || this.board.snake.length === 1)) {
      this.board.snake.turn("W");
    }
  };

  View.prototype.step = function () {
    this.board.ensureApple();
    this.board.snake.move();
    if (this.board.isOver()) {
      alert("Game Over!");
      clearInterval(this.intervalId);
      return;
    }
    this.$el.empty();
    this.board.render(this.$el);
    this.board.eatApple();
  };

})();
