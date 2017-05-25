import * as t from './actionTypes';
import Square from './models/square.js';
import Board from './models/board.js';
import update from 'immutability-helper';

const initialState = {
  board: Board.beginner,
  minefield: {}
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

// TODO do this method
function recursivelySweepSquares(state, location, numberOfRows, numberOfCols) {
  getSurroundingCoords(location, numberOfRows, numberOfCols).forEach(function (coord) {
    if (state.minefield[coord].mineProximityNumber > 0) {
      return;
    }
    recursivelySweepSquares(state, coord, numberOfRows, numberOfCols);
  });
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
      initialState.minefield[i + "" + j] = Object.assign({}, Square);
    }
  }

  // place mines and increment proximity numbers
  mineLocations.forEach(function(mineLocation) {
    // increment surrounding proximity numbers
    initialState.minefield[mineLocation].isMine = true;
    getSurroundingCoords(mineLocation, board.numberOfRows, board.numberOfCols).forEach(function(coord) {
      initialState.minefield[coord].mineProximityNumber++;
    });
  });
}

initState(initialState.board)

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case t.SWEEP_SQUARE:
      if (state.minefield[action.coord].isMine) {
        console.log("GAME OVER! YOU SWEEPED A MINE!");
      }
      // ES6 computed property names!!
      return update(state, {minefield: {[action.coord]: {isSweeped: {$set: true}, isFlagged: {$set: false}}}});
    case t.TOGGLE_SQUARE_FLAG:
      return update(state, {minefield: {[action.coord]: {isFlagged: {$apply: (isFlagged) => { return !isFlagged; }}}}});
    default:
      return state;
  }
};

export default reducer;
