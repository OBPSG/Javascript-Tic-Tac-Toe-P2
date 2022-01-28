//Array to hold the cell elements
var cells = document.querySelectorAll(".row > div");
//Boolean value to determine whose turn it is. True value indicates that it's X's turn, O's for false
var xToMove = true;

//Connect event listners to each of the cell divs
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", CellClicked);
}

function CellClicked(event) {
  console.log(event.target);
  PlaceSymbol(event.target);
}

//Function that attempts to place an X or and O in a cell
function PlaceSymbol(cell) {
  let symbol;
  let styleString;
  if (xToMove) {
    symbol = "X";
  } else {
    symbol = "O";
  }
  //Make sure cell is empty before placing a symbol in it
  if (cell.textContent == "") {
    cell.textContent = symbol;
    xToMove = !xToMove;
    checkVictory(symbol);
  }
}

function checkVictory(xOrO) {
  let symbol = xOrO;
  let hasWon = false;
  //Check each row
  for (let i = 0; i < 8; i += 3) {
    if (
      cells[i].textContent == symbol &&
      cells[i + 1].textContent == symbol &&
      cells[i + 2].textContent == symbol
    ) {
      hasWon = true;
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
    }
  }

  //Check the diagonals
  if (
    (cells[0].textContent == symbol &&
      cells[4].textContent == symbol &&
      cells[8].textContent == symbol) ||
    (cells[2].textContent == symbol &&
      cells[4].textContent == symbol &&
      cells[6].textContent == symbol)
  ) {
    hasWon = true;
  }

  if (hasWon) {
    console.log(symbol + " has won!!!");
  }
}

function victoryFinalization(winningPlayer) {
  //Change the color of the three symbols (X's or O's) in the winning move?
  //Add an h2 element to indicate which player has won?
  //Remove the event handlers for every cell, effectively locking the board?
}
