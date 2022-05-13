let moveCounter = 1;

const gameFieldForm = document.forms["game-feild"];
const gameFieldSet = document.querySelector(".game-area__fieldset");
const resetGameFieldButton = document.querySelector("#reset");

function fillGameField() {
    for (y = 1; y <= 10; y++) {
        for (x = 1; x <= 10; x++) {
            const cellElement = getCell(axisX = x, axisY = y);
            renderCells(cellElement);
        }
    }
}

function getCell(axisX, axisY) {
    const cellElement = document.querySelector("#cell-template").content.cloneNode(true);
    
    const cell = cellElement.querySelector(".game-area__cell");

    cell.id = `${axisX},${axisY}`;
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
    currentCell.disabled = true;
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

function checkCells(currentCell) {
    let countPossibleMoves = 0;

    let currentRow = parseInt(currentCell.id.split(",")[1]);
    let currentColumn = parseInt(currentCell.id.split(",")[0]);

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

    moveOption.forEach(function (cell) {

        const cellID = `${cell.column},${cell.row}`;
        let cellArray = document.getElementById(cellID);

        if (cellArray && !cellArray.classList.contains("game-area__cell_select")) {
            cellArray.disabled = false;
            cellArray.classList.add("game-area__cell_highlight");
            countPossibleMoves++;
        } 
        
        if (cellArray && cellArray.classList.contains("game-area__cell_active") && cellArray.textContent == moveCounter -1){
            cellArray.classList.remove("game-area__cell_active");
            cellArray.classList.add("game-area__cell_select")
        }
    })

    checkState(countPossibleMoves);
}

function checkState(countPossibleMoves) {

    if (countPossibleMoves === 0) {
        alert("Вы проиграли");
    } else if (moveCounter === 100) {
        alert("Вы победили!")
    }
}

resetGameFieldButton.addEventListener("click", () => {
    moveCounter = 1;

    clearGameField();
    fillGameField();
});

function clearGameField() {
    const fieldsetCells = document.querySelectorAll(".game-area__cell");
    fieldsetCells.forEach((e) => e.remove())
}

fillGameField();