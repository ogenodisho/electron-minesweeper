import * as t from './actionTypes';
import Square from './models/square.js';
import Board from './models/board.js';
import update from 'immutability-helper';

const initialState = {
  board: Board.beginner,
  minefield: {},
  isGameOver: false
};

// INIT STATE HERE
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function getSurroundingCoords(location, numberOfRows, numberOfCols, level) {
  var surroundingCoords = []
  var originRowNumber = parseInt(location[0]);
  var originColNumber = parseInt(location[1]);
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue
      }
      var currRowNumber = originRowNumber + (i * level);
      var currColNumber = originColNumber + (j * level);
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
function recursivelySweepSquares(state, location, visited) {
  // ES6 computed property names with immutability helper!!
  state = update(state, {
    minefield: {
      [location]: {
        isSweeped: {
          $set: true
        },
        isFlagged: {
          $set: false
        }
      }
    }
  });

  visited.push(location);

  if (state.minefield[location].mineProximityNumber === 0) {
    getSurroundingCoords(location, state.board.numberOfRows, state.board.numberOfCols, 1).forEach(function(coord) {
      if (state.minefield[coord].isSweeped || state.minefield[coord].isMine || visited.indexOf(coord) >= 0) {
        return;
      }
      state = recursivelySweepSquares(state, coord, visited);
    });
  }

  return state;
}

const mineLocations = [];

function initState(board) {
  // generate mine locations
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
    getSurroundingCoords(mineLocation, board.numberOfRows, board.numberOfCols, 1).forEach(function(coord) {
      initialState.minefield[coord].mineProximityNumber++;
    });
  });
}

initState(initialState.board)

const reducer = (state = initialState, action: any) => {
  if (state.isGameOver) {
    return state;
  }
  switch (action.type) {
    case t.SWEEP_SQUARE:
      if (state.minefield[action.coord].isMine) {
        state = update(state, {
          isGameOver: {
            $set: true
          }
        });
        mineLocations.forEach(function(mineLocation) {
          state = update(state, {
            minefield: {
              [mineLocation]: {
                isSweeped: {
                  $set: true
                },
                isFlagged: {
                  $set: false
                }
              }
            }
          });
        })
        return state
      }
      return recursivelySweepSquares(state, action.coord, []);
    case t.TOGGLE_SQUARE_FLAG:
      return update(state, {
        minefield: {
          [action.coord]: {
            isFlagged: {
              $apply: (isFlagged) => {
                return !isFlagged;
              }
            }
          }
        }
      });
    default:
      return state;
  }
};

export default reducer;
