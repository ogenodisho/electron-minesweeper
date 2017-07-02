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
        let currCell;
        let mineProximityNumber = (this.props.board.mineField[coord].mineProximityNumber === 0 && "&zwnj;") || this.props.board.mineField[coord].mineProximityNumber;
        if (this.props.board.mineField[coord].isFlagged) {
          currCell = <button className="fa fa-flag" onClick={(e) => this.handleClick(e, coord)} onContextMenu={(e) => this.handleClick(e, coord)} defaultChecked></button>;
        } else if (!this.props.board.mineField[coord].isSweeped) {
          currCell = <button onClick={(e) => this.handleClick(e, coord)} onContextMenu={(e) => this.handleClick(e, coord)}>&zwnj;</button>;
        } else if (this.props.board.mineField[coord].isMine) { // TODO take this out
          currCell = <button className="fa fa-bomb sweeped"></button>;
        } else {
          currCell = <button className="sweeped">{mineProximityNumber}</button>;
        }

        if (this.props.isGameOver) {
          currCell.props.className = (currCell.props.className && currCell.props.className + " disabled") || "disabled";
        }

        currRow.push(<td key={coord}>{currCell}</td>);
      }

      table.push(<tr key={i}>{currRow}</tr>);
      currRow = [];
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
  isGameOver: PropTypes.bool.isRequired,
  statusMessage: PropTypes.string.isRequired
}

export default MinesweeperComponent
