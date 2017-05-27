import * as gameActions from './actionTypes';
import * as menuActions from '../menu/actionTypes';
import update from 'immutability-helper';
import Square from '../game/models/square.js';
import Board from '../game/models/board.js';

const initialState = {
  board: Board["beginner"],
  mineField: {},
  isGameOver: false
};
const mineLocations = [];

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

function recursivelySweepSquares(state, location, visited) {
  // ES6 computed property names with immutability helper!!
  state = update(state, {
    mineField: {
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

  if (state.mineField[location].mineProximityNumber === 0) {
    getSurroundingCoords(location, state.board.numberOfRows, state.board.numberOfCols).forEach(function(coord) {
      if (state.mineField[coord].isSweeped || state.mineField[coord].isMine || visited.indexOf(coord) >= 0) {
        return;
      }
      state = recursivelySweepSquares(state, coord, visited);
    });
  }

  return state;
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function generateMineFieldForBoard(board) {
  let mineField = {}
  mineLocations.length = 0 // clear the const

  // generate mine locations
  var minesPlaced = 0;
  while (minesPlaced < board.numberOfMines) {
    var randomMineLocation = rand(0, board.numberOfRows) + "_" + rand(0, board.numberOfCols);
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
      mineField[i + "_" + j] = Object.assign({}, Square);
    }
  }

  // place mines and increment proximity numbers
  mineLocations.forEach(function(mineLocation) {
    // increment surrounding proximity numbers
    mineField[mineLocation].isMine = true;
    getSurroundingCoords(mineLocation, board.numberOfRows, board.numberOfCols).forEach(function(coord) {
      mineField[coord].mineProximityNumber++;
    });
  });

  return mineField;
}

initialState.mineField = generateMineFieldForBoard(initialState.board);

const reducer = (state = initialState, action: any) => {
  if (action.type === menuActions.RESTART) {
    //initialState.board = Board[action.difficulty]
    //initialState.isGameOver = false;
    //initialState.mineField = generateMineFieldForBoard(initialState.board);
    //state = initialState;
    //return state;
    return update(state, {
      board: {
        $set: Board[action.difficulty]
      },
      isGameOver: {
        $set: false
      },
      mineField: {
        $set: generateMineFieldForBoard(Board[action.difficulty])
      }
    });
  }
  if (state.isGameOver) {
    return state;
  }
  switch (action.type) {
    case gameActions.SWEEP_SQUARE:
      if (state.mineField[action.coord].isMine) {
        state = update(state, {
          isGameOver: {
            $set: true
          }
        });
        mineLocations.forEach(function(mineLocation) {
          state = update(state, {
            mineField: {
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
    case gameActions.TOGGLE_SQUARE_FLAG:
      return update(state, {
        mineField: {
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
