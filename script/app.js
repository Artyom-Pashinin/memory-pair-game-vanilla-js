document.addEventListener("DOMContentLoaded", function() {
  const settings = new Settings(configurations);
  const board = new Board(configurations);
  const stats = new Statistics();
  const game = new Game(board, stats);
  game.newGame(settings.currentLayout);

  document.querySelector("[data-new-game-btn]").addEventListener("click", () => {
    game.newGame(settings.currentLayout);
  });
});