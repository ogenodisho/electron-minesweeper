import * as gameActions from './actionTypes';
import * as menuActions from '../menu/actionTypes';
import cloneDeep from 'lodash/cloneDeep';
import Square from '../game/models/square.js';
import { Board, BEGINNER } from '../game/models/board.js';

const initialState = {
  board: new Board(BEGINNER),
  isGameOver: false
};

// TODO remove from board.js
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
  state.board.mineField[location].isSweeped = true
  state.board.mineField[location].isFlagged = false

  visited.push(location);

  if (state.board.mineField[location].mineProximityNumber === 0) {
    getSurroundingCoords(location, state.board.numberOfRows, state.board.numberOfCols).forEach(function(coord) {
      if (state.board.mineField[coord].isSweeped || state.board.mineField[coord].isMine || visited.indexOf(coord) >= 0) {
        return;
      }
      state = recursivelySweepSquares(state, coord, visited);
    });
  }

  return state;
}

const reducer = (state = initialState, action: any) => {
  var clone = cloneDeep(state)

  if (action.type === menuActions.RESTART) {
    clone.board = new Board(action.difficulty)
    clone.isGameOver = false;
    return clone
  }
  if (state.isGameOver) {
    return state;
  }
  switch (action.type) {
    case gameActions.SWEEP_SQUARE:
      if (state.board.mineField[action.coord].isMine) {
        clone.isGameOver = true
        state.board.mineLocations.forEach(function(mineLocation) {
          clone.board.mineField[mineLocation].isSweeped = true
          clone.board.mineField[mineLocation].isFlagged = false
        })
        return clone
      }
      return recursivelySweepSquares(clone, action.coord, []);
    case gameActions.TOGGLE_SQUARE_FLAG:
      clone.board.mineField[action.coord].isFlagged = !clone.board.mineField[action.coord].isFlagged
      return clone
    default:
      return state;
  }
};

export default reducer;
