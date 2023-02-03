class Statistics {
  constructor() {
    this.movesCounterHtmlElement = document.querySelector("[data-moves-counter]");
    this.remainingTimeHtmlElement = document.querySelector("[data-time]");
    this.pointsHtmlElement = document.querySelector("[data-points]");
    this.movesCounter = 0;
    this.remainingTime = 0;
    this.points = 0;

    this.updateAllHtmlElements();
  }

  resetStats() {
    this.movesCounter = 0;
    this.remainingTime = 0;
    // this.points = 0;
    this.updateAllHtmlElements();
  }

  updateHtmlElementText(htmlElement, value) {
    htmlElement.textContent = value;
  }

  updateAllHtmlElements() {
    this.movesCounterHtmlElement.textContent = this.movesCounter;
    this.remainingTimeHtmlElement.textContent = this.remainingTime;
    this.pointsHtmlElement.textContent = this.points;
  }

  increaseMoveCounter() {
    this.movesCounter += 1;
    this.updateHtmlElementText(this.movesCounterHtmlElement, this.movesCounter);
  }

  increasePointsCounter() {
    this.points += 1;
    this.updateHtmlElementText(this.pointsHtmlElement, this.points);
  }
}