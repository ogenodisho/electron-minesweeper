import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {sweepSquare , toggleSquareFlag} from '../actionCreators.js'
import MinesweeperComponent from './MinesweeperComponent.jsx'

const mapStateToProps = (state) => {
  // determine the current status of the game
  var numberOfFlaggedMines = 0;
  var numberOfSweepedSquares = 0;
  Object.keys(state.game.board.mineField).forEach(function (key) {
    if (state.game.board.mineField[key].isFlagged && numberOfFlaggedMines < state.game.board.numberOfMines) {
      numberOfFlaggedMines++;
    }
    if (state.game.board.mineField[key].isSweeped) {
      numberOfSweepedSquares++;
    }
  });

  if (state.game.isGameOver) {
    var statusMessage = "Game over! You hit a mine!";
  } else if (numberOfSweepedSquares === (state.game.board.numberOfRows * state.game.board.numberOfCols) - state.game.board.numberOfMines) {
    var statusMessage = "Congratulations! You win!";
  } else {
    var statusMessage = "Mines left: " + (state.game.board.numberOfMines - numberOfFlaggedMines);
  }

  return {
    board: state.game.board,
    statusMessage: statusMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ sweepSquare, toggleSquareFlag }, dispatch);
}

const MinesweeperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MinesweeperComponent)

export default MinesweeperContainer;
