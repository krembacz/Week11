//targeting elements from HTML to assign functionality 
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartButton = document.querySelector("#restartButton");

//assigning win conditions correlating to three in a row on 3x3 grid/board
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

//array with placeholders for each cell, starting player "X" and game not running
let placeHolders = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameRunning = false;

//initialize game 
runGame();

//foreach loop through each cell and applying event listener and cellClicked function
function runGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    //applied event listener and restartGame function to HTML restart button
    restartButton.addEventListener("click", restartGame);
    //targeting HTML alert banner to show whose turn it is
    statusText.textContent = `${currentPlayer}'s turn`;
    //sets the game to running
    gameRunning = true;
}

//function that occurs when a cell is clicked
function cellClicked() {
    //targets HTML cellIndex and obtains assigned index
    const cellIndex = this.getAttribute("cellIndex");

    //will not do anything if space is 'empty' or game is not running
    if (placeHolders[cellIndex] != "" || !gameRunning) {
        return;
    }

    //function that takes two perameters- 'this' is based on context of function
    updateCell(this, cellIndex);
    checkWinner();
    console.log(`${currentPlayer} was placed`);
}

//when clicked, cell updates the placeholder "" with current player symbol (X or O)
function updateCell(cell, index) {
    placeHolders[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

//ternary (?)- currentPlayer is X, then change currentPlayer to O, otherwise to X
function switchPlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

//round is assumed false until certain conditions are met 
function checkWinner() {
    let roundWon = false;

    //looping through winConditions array and adding one to i each iteration
    for (let i = 0; i < winConditions.length; i++) {
        //variable with stored winConditions arrays 
        const condition = winConditions[i];
        //assigning variables for rows to check winConditions
        const cellA = placeHolders[condition[0]];
        const cellB = placeHolders[condition[1]];
        const cellC = placeHolders[condition[2]];

        //if any cells are rows are blank, continue game 
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        //if all three assigned variables have the same symbol (X or O), then round is won
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    //updates status text with who wins, and stops the game
    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`
        running = false;
    }
    //if there are no "" left, then the game is a draw and is stopped
    else if (!placeHolders.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    }
    //if none of the above conditions are met, switch player 
    else {
        switchPlayer();
    }
}

//assigned HTML button on click, set currentPlayer to X, reassign placeholders with ""
//reset alert for starting player's turn, clear and replace cell content with ""
//set the game to running
function restartGame() {
    currentPlayer = "X";
    placeHolders = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}