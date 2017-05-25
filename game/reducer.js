import * as t from './actionTypes';
import Square from './models/square.js';
import Board from './models/board.js';

const initialState = {
  board: Board.beginner,
  state: {}
};

// INIT STATE HERE
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function getSurroundingCoords(location, numberOfRows, numberOfCols) {
  var surroundingCoords = []
  var originRowNumber = parseInt(location[0]);
  var originColNumber = parseInt(location[1]);
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue
      }
      var currRowNumber = originRowNumber + i;
      var currColNumber = originColNumber + j;
      if (currRowNumber >= 0 && currRowNumber < numberOfRows) {
        if (currColNumber >= 0 && currColNumber < numberOfCols) {
          surroundingCoords.push(currRowNumber + "" + currColNumber)
        }
      }
    }
  }
  return surroundingCoords;
}

function initState(board) {
  // generate mine locations
  const mineLocations = [];
  var minesPlaced = 0;
  while (minesPlaced < board.numberOfMines) {
    var randomMineLocation = rand(0, board.numberOfRows) + "" + rand(0, board.numberOfCols);
    if (mineLocations.indexOf(randomMineLocation) >= 0) {
      continue // mine location already exists
    } else {
      mineLocations.push(randomMineLocation)
      minesPlaced++;
    }
  }

  // init the squares
  for (var i = 0; i < board.numberOfRows; i++) {
    for (var j = 0; j < board.numberOfCols; j++) {
      initialState.state[i + "" + j] = Object.assign({}, Square);
    }
  }

  // place mines and increment proximity numbers
  mineLocations.forEach(function(mineLocation) {
    // increment surrounding proximity numbers
    initialState.state[mineLocation].isMine = true;
    getSurroundingCoords(mineLocation, board.numberOfRows, board.numberOfCols).forEach(function(coord) {
      initialState.state[coord].mineProximityNumber++;
    });
  });
}

initState(initialState.board)

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case t.REVEAL_SQUARE:
      return {
        ...state
      };
    case t.FLAG_SQUARE:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default reducer;
