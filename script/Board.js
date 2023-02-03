class Board {
  constructor(configurations) {
    this.configurations = configurations;
    this.board = document.querySelector("[data-board]");
    this.board.addEventListener("click", this.clickHandler.bind(this));
    this.numberOfTiles = undefined;
    this.allImages = [...this.configurations.imageSets.imageSetIT];
    this.imagesFolderUrl = this.configurations.imagesFolderUrl;
    this.images = [];
    this.tiles = [];
  }

  clickHandler(event) {
    if(!event.target.hasAttribute("data-tile")) return;
    const tile = this.tiles.find(tile => {
      return tile.id == event.target.getAttribute("data-tile-id");
    });
    if(tile.isGuessed || tile.isOpened) return;
    if(!tile.isOpened) tile.open();
    let clickEvent = new CustomEvent('tileClick', {
      bubbles: true,
      detail: {
        tile: tile
      }
    });
    this.board.dispatchEvent(clickEvent);
  }

  generateListOfImages() {
    let shuffledArr = [...shuffleArrayRandomly(this.allImages)];
    shuffledArr.splice(0, shuffledArr.length - this.numberOfTiles/2);
    return shuffledArr;
  }

  generateTiles() {
    let result = [];
    let images = this.generateListOfImages();
    for (let i = 0, id = 100; i < this.numberOfTiles/2; i++) {
      for (let j = 0; j < 2; j++) {
        result.push(new Tile(id, i, this.imagesFolderUrl + images[i], this.configurations));
        id +=1;
      }
    }
    return result;
  }

  clearBoard() {
    this.tiles = [];
  }

  fillBoardWithTiles(layout) {
    // set board size
    this.board.style.gridTemplateColumns = `repeat(${layout.y}, var(${layout.tileWidth}))`;
    this.board.style.gridTemplateRows = `repeat(${layout.x}, var(${layout.tileHeight}))`;
    // generate tiles
    this.numberOfTiles = layout.x * layout.y;
    this.tiles = shuffleArrayRandomly(this.generateTiles());
    // clear the board
    this.board.innerHTML = "";
    // fill board with tiles
    for (let i = 0; i < this.tiles.length; i++) {
      this.board.appendChild(this.tiles[i].tileHTML);
    }
  }

  unselectAllExcept(selectedTile) {
    this.tiles.map(tile => {
      if(tile.id != selectedTile.id && tile.isOpened && !tile.isGuessed) tile.close()
    });
  }

  rightGuessed(imageID) {
    this.tiles.map(tile => {
      if(tile.imageID === imageID) tile.guess()
    });
  }

  isAllTilesGuessed() {
    let closedTilesCount = this.tiles.reduce((acc, tile) => {
      if(!tile.isGuessed) acc += 1;
      return acc;
    }, 0);
    if(closedTilesCount) return false;
    return true;
  }

  countOpenedTiles() {
    return this.tiles.reduce((accumulator, tile) => {
      if(tile.isOpened && !tile.isGuessed) accumulator += 1;
      return accumulator
    }, 0)
  }
}