import React, { PropTypes } from 'react';

const MinesweeperComponent = ({ handleClick, minefield, board }) => {
  var table = [];
  var currRow = [];
  for (var i = 0; i < board.numberOfRows; i++) {
    for (var j = 0; j < board.numberOfCols; j++) {
      // Using 'let' solves the common problem of
      // having closures (handleClick) in for loops
      // using the latest values of the 'var' variable
      let coord = i + "_" + j;
      var mineProximityNumber = minefield[coord].mineProximityNumber;
      if (minefield[coord].isFlagged) {
        currRow.push(<td><button key={coord} className="fa fa-flag" onClick={(e) => handleClick(e, coord)} onContextMenu={(e) => handleClick(e, coord)}></button></td>);
      } else if (!minefield[coord].isSweeped) {
        currRow.push(<td><button key={coord} onClick={(e) => handleClick(e, coord)} onContextMenu={(e) => handleClick(e, coord)}></button></td>);
      } else if (minefield[coord].isMine) { // TODO take this out
        currRow.push(<td className="fa fa-bomb" key={coord}></td>);
      } else {
        if (mineProximityNumber === 0) {
          currRow.push(<td key={coord}>0</td>);
        } else {
          currRow.push(<td key={coord}>{mineProximityNumber}</td>);
        }
      }
    }
    table.push(<tr>{currRow}</tr>);
    currRow = []
  }
  return (
    <div id="wrapper">
      <table>
        <tbody>
          {table}
        </tbody>
      </table>
    </div>
  )
}

MinesweeperComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired
}

export default MinesweeperComponent
