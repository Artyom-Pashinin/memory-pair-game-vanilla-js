class Game {
  constructor(board, stats) {
    this.board = board;
    this.stats = stats;
    this.selectedTile = undefined;

    this.board.board.addEventListener('tileClick', (event) => {
      const tile = event.detail.tile;
      this.handleTileClick(tile);
    });

    document.querySelector("[data-side-menu]").addEventListener('layoutChangeEvent', (event) => {
      const layout = event.detail.layout;
      this.newGame(layout);
    });
  }

  newGame(layout) {
    this.selectedTile = undefined;
    this.board.clearBoard();
    this.board.fillBoardWithTiles(layout);
    this.stats.resetStats();
  }

  handleTileClick(tile) {
    this.stats.increaseMoveCounter();

    if(this.board.countOpenedTiles() > 2) {
      this.board.unselectAllExcept(tile);
      this.selectedTile = tile;
      return;
    } 
    if(!this.selectedTile) {
      this.selectedTile = tile;
      return;
    }
    if(this.selectedTile.imageID === tile.imageID) {
      this.selectedTile = undefined;
      this.board.rightGuessed(tile.imageID);
      this.checkGameStatus();
      return;
    } 
  }

  checkGameStatus() {
    if(this.board.isAllTilesGuessed()) this.stats.increasePointsCounter();
  }
  
}