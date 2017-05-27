import React, { PropTypes } from 'react';

const MinesweeperComponent = ({ handleClick, mineField, board, isGameOver }) => {
  var table = [];
  var currRow = [];
  for (var i = 0; i < board.numberOfRows; i++) {
    for (var j = 0; j < board.numberOfCols; j++) {
      // Using 'let' solves the common problem of
      // having closures (handleClick) in for loops
      // using the latest values of the 'var' variable
      let coord = i + "_" + j;
      var mineProximityNumber = mineField[coord].mineProximityNumber;
      if (mineField[coord].isFlagged) {
        currRow.push(<td key={coord}><button className="fa fa-flag" onClick={(e) => handleClick(e, coord)} onContextMenu={(e) => handleClick(e, coord)} defaultChecked></button></td>);
      } else if (!mineField[coord].isSweeped) {
        currRow.push(<td key={coord}><button onClick={(e) => handleClick(e, coord)} onContextMenu={(e) => handleClick(e, coord)}>&zwnj;</button></td>);
      } else if (mineField[coord].isMine) { // TODO take this out
        currRow.push(<td key={coord}><button className="fa fa-bomb"/></td>);
      } else {
        if (mineProximityNumber === 0) {
          currRow.push(<td key={coord}><button className="sweeped">&zwnj;</button></td>);
        } else {
          currRow.push(<td key={coord}><button className="sweeped">{mineProximityNumber}</button></td>);
        }
      }
    }
    table.push(<tr>{currRow}</tr>);
    currRow = []
  }

  // TODO this computation should be in the reducer
  var numberOfFlaggedMines = 0;
  var numberOfSweepedSquares = 0;
  Object.keys(mineField).forEach(function (key) {
    if (mineField[key].isFlagged && numberOfFlaggedMines < board.numberOfMines) {
      numberOfFlaggedMines++;
    }
    if (mineField[key].isSweeped) {
      numberOfSweepedSquares++;
    }
  });

  if (isGameOver) {
    var statusMessage = "Game over! You hit a mine!";
  } else if (numberOfSweepedSquares === (board.numberOfRows * board.numberOfCols) - board.numberOfMines) {
    var statusMessage = "Congratulations! You win!";
  } else {
    var statusMessage = "Mines left: " + (board.numberOfMines - numberOfFlaggedMines);
  }

  return (
    <div id="wrapper">
      <table>
        <tbody>
          {table}
        </tbody>
      </table>
      <span>{statusMessage}</span>
    </div>
  )
}

MinesweeperComponent.propTypes = {
  mineField: PropTypes.object.isRequired,
  board: PropTypes.object.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default MinesweeperComponent
