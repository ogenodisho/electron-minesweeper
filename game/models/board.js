import Square from './square.js';

// TODO every board should have a function to init itself randomly
// then in the menu container when the difficulty changes, you change the board

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

// TODO remove from reducer.js
function getSurroundingCoords(location, numberOfRows, numberOfCols) {
  var surroundingCoords = []
  // var unpacking - more es6 magic!
  var [originRowNumber, originColNumber] = location.split("_").map((i) => parseInt(i));
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue
      }
      var currRowNumber = originRowNumber + i;
      var currColNumber = originColNumber + j;
      if (currRowNumber >= 0 && currRowNumber < numberOfRows) {
        if (currColNumber >= 0 && currColNumber < numberOfCols) {
          surroundingCoords.push(currRowNumber + "_" + currColNumber)
        }
      }
    }
  }
  return surroundingCoords;
}

export function Board(difficulty) {
  switch(difficulty) {
    case BEGINNER:
      this.numberOfRows = 8
      this.numberOfCols = 8
      this.numberOfMines = 10
      break;
    case INTERMEDIATE:
      this.numberOfRows = 16
      this.numberOfCols = 16
      this.numberOfMines = 40
      break;
    case EXPERT:
      this.numberOfRows = 16
      this.numberOfCols = 30
      this.numberOfMines = 99
      break;
    default:
      throw "Invalid difficulty!"
  }
  this.generateMineField();
}

Board.prototype.generateMineField = function() {
  this.mineLocations = []
  this.mineField = {}

  // generate mine locations
  var minesPlaced = 0;
  while (minesPlaced < this.numberOfMines) {
    var randomMineLocation = rand(0, this.numberOfRows) + "_" + rand(0, this.numberOfCols);
    if (this.mineLocations.indexOf(randomMineLocation) >= 0) {
      continue // mine location already exists
    } else {
      this.mineLocations.push(randomMineLocation)
      minesPlaced++;
    }
  }

  // init the squares
  for (var i = 0; i < this.numberOfRows; i++) {
    for (var j = 0; j < this.numberOfCols; j++) {
      this.mineField[i + "_" + j] = Object.assign({}, Square);
    }
  }

  // place mines and increment proximity numbers
  var _this = this;
  this.mineLocations.forEach(function(mineLocation) {
    // increment surrounding proximity numbers
    _this.mineField[mineLocation].isMine = true;
    getSurroundingCoords(mineLocation, _this.numberOfRows, _this.numberOfCols).forEach(function(coord) {
      _this.mineField[coord].mineProximityNumber++;
    });
  });
}

export const BEGINNER = "beginner"
export const INTERMEDIATE = "intermediate"
export const EXPERT = "expert"
