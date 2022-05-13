import { gameField } from "./variables.js"

class GameField {
    constructor(cellTemplateSelector) {
        this._cellTemplateSelector = cellTemplateSelector;
    }

    _getCellTemplate() {
        const cellTemplate = document.querySelector(this._cellTemplateSelector).content.cloneNode(true);
        return cellTemplate;
    }

    _getCell(x, y) {
        this._cell = this._getCellTemplate();

        const cell = this._cell.querySelector(".game-area__cell");
        cell.id = `${x},${y}`;

        this._setEventListeners(cell);

        return this._cell;
    }

    createGameField() {
        for (let y = 1; y <= 10; y++) {
                for (let x = 1; x <= 10; x++) {
                const newCell = this._getCell(x, y);
                this.renderCell(newCell);
            }
        }
    }

    renderCell(cellElement) {
        gameField.append(cellElement);
    }
}

export { GameField }