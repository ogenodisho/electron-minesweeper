import React, { PropTypes } from 'react';

const MinesweeperComponent = ({ onLeftClick, onRightClick, boardState }) => {
  var table = [];
  var currRow = []
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      var coord = i + "" + j;
      var mineProximityNumber = boardState[coord].mineProximityNumber;
      if (boardState[coord].isMine) {
        currRow.push(<td className="fa fa-bomb" key={coord}></td>);
      } else if (boardState[coord].isFlagged) {
        currRow.push(<td className="fa fa-flag" key={coord}></td>);
      } else {
        currRow.push(<td key={coord}>{mineProximityNumber}</td>);
      }
    }
    table.push(<tr>{currRow}</tr>);
    currRow = []
  }
  return (
    <div>
      <button onClick={onLeftClick}>Left Click</button>
      <button onClick={onRightClick}>Right Click</button>
      <div id="wrapper">
        <table>
          <tbody>
            {table}
          </tbody>
        </table>
      </div>
    </div>
  )
}

MinesweeperComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired
}

export default MinesweeperComponent
