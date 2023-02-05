class Tile {
  constructor(id, imageID, imageURL, config) {
    this.id = id;
    this.imageID = imageID;
    this.imageURL = imageURL;
    this.isGuessed = false;
    this.isOpened = false;
    this.tileHTML = document.createElement("div");
    this.tileHTML.classList.add("tile", "tile--closed");
    this.tileHTML.setAttribute("data-tile", "");
    this.tileHTML.setAttribute("data-tile-id", id);

    this.tileInner = document.createElement("div");
    this.tileInner.classList.add("tile-inner");

    this.tileFront = document.createElement("div");
    this.tileFront.classList.add("tile-front");
    this.tileFront.style.backgroundImage = `url("${config.backgroundImageUrl}")`;
    this.tileBack = document.createElement("div");
    this.tileBack.classList.add("tile-back");

    this.tileInner.appendChild(this.tileFront);
    this.tileInner.appendChild(this.tileBack);

    this.tileHTML.appendChild(this.tileInner);
  }


  open() {
    this.isOpened = true;
    this.tileHTML.classList.remove("tile--closed");
    this.tileHTML.classList.add("tile--opened");
    this.tileBack.style.backgroundImage = `url("${this.imageURL}")`;
  }

  close() {
    this.isOpened = false;
    this.tileHTML.classList.remove("tile--opened");
    this.tileHTML.classList.add("tile--closed");
  }

  guess() {
    this.isOpened = true;
    this.isGuessed = true;
    this.tileHTML.classList.remove("tile--closed");
    this.tileHTML.classList.remove("tile--opened");
    this.tileHTML.classList.add("tile--guessed");
    this.tileBack.style.backgroundImage = `url("${this.imageURL}")`;
  }

}
