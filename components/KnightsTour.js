import { gameResultsMessage } from '../utils/constants.js'

export default class Game {
  constructor(gameFormSelector, resetButtonSelector) {
    this._gameFieldSet = document.querySelector(gameFormSelector)
    this._resetButton = document.querySelector(resetButtonSelector);
  }

  _getCellTemplate() {
    return document.querySelector('#cell-template').content.querySelector('.game-area__cell').cloneNode(true);
  }

  _getElement(x, y) {
    this._element = this._getCellTemplate();
    this._element.id = `${x},${y}`;

    this._setEventListener(this._element);

    return this._element;
  }

  createGameField() {
    this._moveCounter = 1;
    for (let y = 1; y <= 10; y++) {
      for (let x = 1; x <= 10; x++) {
        const gameElement = this._getElement(x, y);
        this._renderElement(gameElement);
      }
    }
  }

  _renderElement(gameElement) {
    this._gameFieldSet.append(gameElement);
  }

  resetGameField() {
    this._moveCounter = 1;
    document.querySelectorAll('.game-area__cell').forEach(cell => {
      cell.textContent = '';
      cell.disabled = false;
      cell.classList.remove('game-area__cell_select');
      cell.classList.remove('game-area__cell_active');
      cell.classList.remove('game-area__cell_highlight');
    });
  }

  _setEventListener() {
    this._element.addEventListener('click', (evt) => this._handleClick(evt));
  }

  _handleClick(evt) {
    const currentCell = evt.target;

    currentCell.textContent = this._moveCounter;
    currentCell.classList.add('game-area__cell_active');
    
    this._setDisabled();
    this._checkCells(currentCell.id);

    this._moveCounter++;
  }

  _setDisabled() {
    const activeCells = document.querySelectorAll('.game-area__cell');
    activeCells.forEach(cell => {
      cell.classList.remove('game-area__cell_highlight');
      cell.disabled = true;
    });
  }

  _checkCells(id) {
    let countPossibleMoves = 0;

    const column = parseInt(id.split(',')[0]);
    const row = parseInt(id.split(',')[1]);

    const moveOptionArray = [
      { column: +2, row: +1 },
      { column: -2, row: +1 },
      { column: +1, row: +2 },
      { column: -1, row: +2 },
      { column: +2, row: -1 },
      { column: -2, row: -1 },
      { column: +1, row: -2 },
      { column: -1, row: -2 }
    ]

    moveOptionArray.forEach(offset => {
      const moveOption = document.getElementById(`${column + offset.column},${row + offset.row}`);

      if (moveOption && moveOption.classList.contains('game-area__cell_active') && moveOption.textContent == this._moveCounter - 1) {
        moveOption.classList.add('game-area__cell_select');
        moveOption.classList.remove('game-area__cell_active');
      }

      if (moveOption && !moveOption.classList.contains('game-area__cell_select')) {
        countPossibleMoves++;
        moveOption.disabled = false;
        moveOption.classList.add('game-area__cell_highlight');
      }
    })
    this._checkState(countPossibleMoves, this._moveCounter);
  }

  _checkState(countPossibleMoves, movemoveCounter) {
    if (countPossibleMoves === 0) {
      this._displayResult(gameResultsMessage.loseMessage);
    } else if (movemoveCounter === 100) {
      this._displayResult(gameResultsMessage.winMessage)
    }
  }

  _displayResult(message) {
    this.resetGameField();
    const messageCharArray = message.split(' ');

    for (let i = 0; i < messageCharArray.length; i++) {
      const position = this._getRandomRandom(i, messageCharArray[i].length);
      for (let y = 0; y < messageCharArray[i].length; y++) {
        document.getElementById(`${position.x + y},${position.y}`).textContent = messageCharArray[i].charAt(y);
      }
    }
    this._setDisabled();
  }

  _getRandomRandom(elementNumber, elementLenght) {
    return {
      x: Math.floor(1 + Math.random() * (10 - elementLenght + 1)),
      y: Math.floor((elementNumber*2 + 1) + Math.random() * (1 + (elementNumber*2 + 2) - (elementNumber*2 + 1)))
    }
  }
}