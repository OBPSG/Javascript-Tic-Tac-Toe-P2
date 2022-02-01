//Array to hold the cell elements
var cells = document.querySelectorAll(".row > div");
//Boolean value to determine whose turn it is. True value indicates that it's X's turn, false for O's
var xToMove = true;
var numMoves = 0;

//Connect event listners to each of the cell divs
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", CellClicked);
}

function CellClicked(event) {
  //console.log(event.target);
  PlaceSymbol(event.target);
}

//Function that attempts to place an X or and O in a cell
function PlaceSymbol(cell) {
  let symbol;
  //String to apply styling to a cell element when an X or O is placed in it
  //X's will be colored blue, O's colored red.
  let styleString;
  if (xToMove) {
    symbol = "X";
    styleString = "color: blue;";
  } else {
    symbol = "O";
    styleString = "color: red;";
  }
  //Make sure cell is empty before placing a symbol in it
  if (cell.textContent == "") {
    cell.textContent = symbol;
    cell.style = styleString;
    xToMove = !xToMove;
    numMoves++;
    checkVictory(symbol);
  }
}

//Function that determines whether the player who has just taken their turn has won
function checkVictory(xOrO) {
  let symbol = xOrO;
  let hasWon = false;
  //Array to keep track of which positions the player has placed a winning set of three symbols
  let winningMoves;

  //Check each row
  for (let i = 0; i < 8; i += 3) {
    if (
      cells[i].textContent == symbol &&
      cells[i + 1].textContent == symbol &&
      cells[i + 2].textContent == symbol
    ) {
      hasWon = true;
      winningMoves = [i, i + 1, i + 2];
    }
  }

  //Check each column
  for (let i = 0; i < 3; i++) {
    if (
      cells[i].textContent == symbol &&
      cells[i + 3].textContent == symbol &&
      cells[i + 6].textContent == symbol
    ) {
      hasWon = true;
      winningMoves = [i, i + 3, i + 6];
    }
  }

  //Check the diagonals
  if (
    cells[0].textContent == symbol &&
    cells[4].textContent == symbol &&
    cells[8].textContent == symbol
  ) {
    hasWon = true;
    winningMoves = [0, 4, 8];
  }
  if (
    cells[2].textContent == symbol &&
    cells[4].textContent == symbol &&
    cells[6].textContent == symbol
  ) {
    hasWon = true;
    winningMoves = [2, 4, 6];
  }

  if (hasWon) {
    console.log(symbol + " has won!!!");
    victoryFinalization(symbol, winningMoves);
  }
  //Check if the maximum number of moves has been reached to determine if the game is a draw
  else if (numMoves == 9) {
    drawFinalization();
  }
}

function victoryFinalization(winningPlayer, winningMoves) {
  //Change the color of the three symbols (X's or O's) in the winning move to green
  for (let i = 0; i < winningMoves.length; i++) {
    cells[winningMoves[i]].style = "color: green;";
  }

  //Add text to the h2 element below the board to indicate which player has won
  let winMessage = document.querySelector(".victory-message > h2");
  winMessage.textContent = winningPlayer + " has won!";

  //Remove the event handlers for every cell, effectively locking the board
  {
    for (let i = 0; i < cells.length; i++) {
      cells[i].removeEventListener("click", CellClicked);
    }
  }
}

function drawFinalization() {
  let winMessage = document.querySelector(".victory-message > h2");
  winMessage.textContent = "It's a draw!";
}
