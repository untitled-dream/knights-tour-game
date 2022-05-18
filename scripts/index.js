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
            const gameElement = getElement(x, y);
            renderElement(gameElement);
        }
    }
}

function getElement(axisX, axisY) {
    const elementTemplate = document.querySelector("#cell-template").content.cloneNode(true);
    
    const cell = elementTemplate.querySelector(".game-area__cell");

    cell.id = `${axisX}${cellIDSeparator}${axisY}`;
    cell.classList.add("game-area__cell_highlight")
    
    cell.addEventListener("click", handleClick);

    return elementTemplate;
}

function renderElement(gameElement) {
    gameFieldSet.append(gameElement);
}

function handleClick(evt) {
    evt.preventDefault();

    const currentCell = evt.target;

    setDisabled();
    checkCells(currentCell.id);

    currentCell.textContent = moveCounter;
    currentCell.classList.add("game-area__cell_active");

    moveCounter++;
}

function setDisabled() {
    const activeCells = document.querySelectorAll(".game-area__cell");
    activeCells.forEach(function(cell) {
        cell.classList.remove("game-area__cell_highlight");
        cell.disabled = true;
    });
}

function clearGameField() {
    const fieldsetCells = document.querySelectorAll(".game-area__cell");
    fieldsetCells.forEach((cell) => cell.remove());
}

function checkCells(id) {
    let countPossibleMoves = 0;

    const column = parseInt(id.split(cellIDSeparator)[0]);
    const row = parseInt(id.split(cellIDSeparator)[1]);

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

    moveOptionArray.forEach((offset) => {

        const id = `${column + offset.column}${cellIDSeparator}${row + offset.row}`;
        const moveOption = document.getElementById(id);
        
        if (moveOption && moveOption.classList.contains("game-area__cell_active") && moveOption.textContent == moveCounter - 1) {
            moveOption.classList.add("game-area__cell_select");
            moveOption.classList.remove("game-area__cell_active");
        } 

        if (moveOption && !moveOption.classList.contains("game-area__cell_select"))  {
            countPossibleMoves++;
            moveOption.disabled = false;
            moveOption.classList.add("game-area__cell_highlight");
        }
    })
    checkGameState(countPossibleMoves, moveCounter);
}

function checkGameState(countPossibleMoves, moveCounter) {
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