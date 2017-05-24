import React, { PropTypes } from 'react';

const MinesweeperComponent = ({ onClick, message }) => {
  return (
    <div>
      <h1>{ message }</h1>
      <button onClick={onClick}>Click</button>
      <div id="wrapper">
        <table>
          <tbody>
            <tr>
              <td className="fa fa-bomb"></td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>2</td>
              <td className="fa fa-flag"></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

MinesweeperComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
}

export default MinesweeperComponent
