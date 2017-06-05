import React from 'react';
import PropTypes from 'prop-types';

class MinesweeperComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e, coord) {
    e.preventDefault()
    if (e.nativeEvent.which === 1) { // left click
      this.props.sweepSquare(coord);
    } else if (e.nativeEvent.which === 3) {
      this.props.toggleSquareFlag(coord) // right click
    } else {
      throw "Unknown click";
    }
  }

  render() {
    // determine the table
    var table = [];
    var currRow = [];
    for (var i = 0; i < this.props.board.numberOfRows; i++) {
      for (var j = 0; j < this.props.board.numberOfCols; j++) {
        // Using 'let' solves the common problem of
        // having closures (handleClick) in for loops
        // using the latest values of the 'var' variable
        let coord = i + "_" + j;
        var mineProximityNumber = this.props.board.mineField[coord].mineProximityNumber;
        if (this.props.board.mineField[coord].isFlagged) {
          currRow.push(<td key={coord}><button className="fa fa-flag" onClick={(e) => this.handleClick(e, coord)} onContextMenu={(e) => this.handleClick(e, coord)} defaultChecked></button></td>);
        } else if (this.props.board.mineField[coord].isSweeped === false) {
          currRow.push(<td key={coord}><button onClick={(e) => this.handleClick(e, coord)} onContextMenu={(e) => this.handleClick(e, coord)}>&zwnj;</button></td>);
        } else if (this.props.board.mineField[coord].isMine) { // TODO take this out
          currRow.push(<td key={coord}><button className="fa fa-bomb sweeped"/></td>);
        } else {
          if (mineProximityNumber === 0) {
            currRow.push(<td key={coord}><button className="sweeped">&zwnj;</button></td>);
          } else {
            currRow.push(<td key={coord}><button className="sweeped">{mineProximityNumber}</button></td>);
          }
        }
      }
      table.push(<tr key={i}>{currRow}</tr>);
      currRow = []
    }

    return (
      <div id="wrapper" className="minesweeper-table">
        <table>
          <tbody>
            {table}
          </tbody>
        </table>
        <span>{this.props.statusMessage}</span>
      </div>
    )
  }
}

MinesweeperComponent.propTypes = {
  board: PropTypes.object.isRequired,
  statusMessage: PropTypes.string.isRequired
}

export default MinesweeperComponent
