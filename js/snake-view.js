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
    }, 300);
  };

  View.prototype.handleKeyEvent = function (event) {
    if (event.keyCode === 40) {
      this.board.snake.turn("S");
    } else if (event.keyCode === 39) {
      this.board.snake.turn("E");
    } else if (event.keyCode === 38) {
      this.board.snake.turn("N");
    } else if (event.keyCode === 37) {
      this.board.snake.turn("W");
    }
  };

  View.prototype.step = function () {
    this.board.snake.move();
    if (this.board.isOver()) {
      alert("Game Over!");
      clearInterval(this.intervalId);
    }
    this.$el.empty();
    this.board.render(this.$el);
  };

})();
