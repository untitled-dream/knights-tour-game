import { gameField, resetButton } from "./constants.js"

class GameField {
    constructor(cellTemplateSelector) {
        this._cellTemplateSelector = cellTemplateSelector;
    }

    _getElementTemplate() {
        return document.querySelector(this._cellTemplateSelector).content.cloneNode(true);;
    }

    _getElement(x,y) {
        this._element = this._getCellTemplate();

        const cell = this._element.querySelector(".game-area__cell");
        
        cell.id = `${x},${y}`;
        cell.classList.add("game-area__cell_highlight");
        this._setEventListener(cell);

        return this._element;
    }

    createGameField() {
        for (let y = 1; y <= 10; y++) {
            for (let x = 1; x <= 10; x++) {
                const gameElement = this._getElement(x,y);
                this._renderElement(gameElement);
            }
        }
    }

    _renderElement(gameElement) {
        gameField.append(gameElement);
    }

    _setEventListener = (cell) => {
        cell.addEventListener("click", (evt) => {
            this._handleClick(evt);
        });
    }

    _handleClick(evt) {
        evt.preventDefault();

        const currentCell = evt.target;

        setDisabled();
        checkCells(currentCell.id);

        currentCell.textContent = moveCounter;
        currentCell.classList.add("game-area__cell_active");

        moveCounter++;
    }
}

export { GameField }