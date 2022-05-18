import { openGameResultPopup } from "./utils.js" 

let moveCounter = 1;
const cellIDSeparator = ",";

const messageText = { 
    winMessage: "Congrats! You Won!", loseMessage: "Sorry! You Lose!"
}

const gameFieldSet = document.querySelector(".game-area__fieldset");
const resetGameFieldButton = document.querySelector("#reset");

function fillGameField() {
    for (let y = 1; y <= 10; y++) {
        for (let x = 1; x <= 10; x++) {
            const cellElement = getCell(x, y);
            renderCells(cellElement);
        }
    }
}

function getCell(axisX, axisY) {
    const cellElement = document.querySelector("#cell-template").content.cloneNode(true);
    
    const cell = cellElement.querySelector(".game-area__cell");

    cell.id = `${axisX}${cellIDSeparator}${axisY}`;
    cell.classList.add("game-area__cell_highlight")
    
    cell.addEventListener("click", handleClick);

    return cellElement;
}

function renderCells(cellElement) {
    gameFieldSet.append(cellElement);
}

function handleClick(evt) {
    evt.preventDefault();

    const currentCell = evt.target;

    setDisabled();
    checkCells(currentCell);

    currentCell.textContent = moveCounter;
    currentCell.classList.add("game-area__cell_active");

    moveCounter++;
}

function setDisabled() {
    const activeCells = document.querySelectorAll(".game-area__cell");
    activeCells.forEach(function(cell) {
        cell.classList.remove("game-area__cell_highlight");
        cell.disabled = true;
    })
}

function clearGameField() {
    const fieldsetCells = document.querySelectorAll(".game-area__cell");
    fieldsetCells.forEach((cell) => cell.remove());
}

function checkCells(currentCell) {
    let countPossibleMoves = 0;

    let currentRow = parseInt(currentCell.id.split(cellIDSeparator)[1]);
    let currentColumn = parseInt(currentCell.id.split(cellIDSeparator)[0]);

    const moveOption = [
        { row: currentRow + 1, column: currentColumn - 2 },
        { row: currentRow + 2, column: currentColumn - 1 },
        { row: currentRow + 2, column: currentColumn + 1 },
        { row: currentRow + 1, column: currentColumn + 2 },
        { row: currentRow - 1, column: currentColumn + 2 },
        { row: currentRow - 2, column: currentColumn + 1 },
        { row: currentRow - 2, column: currentColumn - 1 },
        { row: currentRow - 1, column: currentColumn - 2 },
    ]

    moveOption.forEach((cell) => {
 
        let cellArray = document.getElementById(`${cell.column}${cellIDSeparator}${cell.row}`);

        if (cellArray && !cellArray.classList.contains("game-area__cell_active") && !cellArray.classList.contains("game-area__cell_select"))  {
            cellArray.disabled = false;
            cellArray.classList.add("game-area__cell_highlight");
            countPossibleMoves++;
        } 
        
        if (cellArray && cellArray.classList.contains("game-area__cell_active") && cellArray.textContent == moveCounter - 1) {
            cellArray.disabled = true;
            cellArray.classList.add("game-area__cell_select");
            cellArray.classList.remove("game-area__cell_highlight");
            cellArray.classList.remove("game-area__cell_active");
        }
        
    })
    console.log(countPossibleMoves);
    checkState(countPossibleMoves, moveCounter);
}

function checkState(countPossibleMoves, moveCounter) {
    if (countPossibleMoves === 0) {
        openGameResultPopup(messageText.loseMessage);
    } else if (moveCounter === 100) {
        openGameResultPopup(messageText.winMessage);
    }
}

resetGameFieldButton.addEventListener("click", () => {
    moveCounter = 1;

    clearGameField();
    fillGameField();
});

fillGameField();