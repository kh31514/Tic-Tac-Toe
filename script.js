var p1 = $(`.p1`);
var p2 = $(`.p2`);

p1.toggleClass("select");

var currentTurn = 1;
var winner = false;
var emptySpaces = true;

var boxes = [ "zero", "one", "two",
              "three", "four", "five",
              "six", "seven", "eight" ];

var elements = [];

var grid = [ "", "", "",
             "", "", "",
             "", "", "" ];

// add all boxes to array
for (var i = 0; i < 9; i++) {
  elements.push($(`.${boxes[i]}`));
}

for (var i = 0; i < boxes.length; i++) {
  elements[i].on("click", clicked);
}


function clicked() {
  if (winner === false && emptySpaces === true) {
    var indWord = event.target.className.substr(4);
    var indNum = boxes.indexOf(indWord);
    if (grid[indNum] === "") {
      if (currentTurn === 1) {
        elements[indNum].append(`<img src="x.png"> </img>`);
        grid[indNum] = "x";
        p1.toggleClass("select");
        p2.toggleClass("select");
        currentTurn = 0;
      }
      else {
        elements[indNum].append(`<img src="o.png"> </img>`);
        grid[indNum] = "o";
        p1.toggleClass("select");
        p2.toggleClass("select");
        currentTurn = 1;
      }
      checkSpaces();
      checkWinner();
    }
    else {
      alert("choose a different box");
    }
  }
}

function checkSpaces() {
  if (grid.indexOf("") === -1) {
    emptySpaces = false;
    alert("It's a tie! Game over");
  }
}

function checkWinner() {
  
  // check rows
  for (var i = 0; i < 9; i+=3) {
    if (grid[i].length > 0) {
       if (grid[i] === grid[i+1] && grid[i+1] === grid[i+2]) {
         winner = true;
       }
    }
  }

  // check columns
  for (var i = 0; i < 3; i++) {
    if (grid[i].length > 0) {
       if (grid[i] === grid[i+3] && grid[i+3] === grid[i+6]) {
        winner = true;
       }
    }
  }

  // check diagnals
  if (grid[4].length > 0) {
    if (grid[0] === grid[4] && grid[4] === grid[8]) {
      winner = true;
    }
    else if (grid[2] === grid[4] && grid[4] === grid[6]) {
      winner = true;
    }
  }

  if (winner === true) {
    if (currentTurn === 1) {
      alert("Congrats player 2!");
    }
    else {
      alert("Congrats player 1!");
    }
  }

}