import { connect } from 'react-redux'
import {sweepSquare , toggleSquareFlag} from '../actions.js'
import MinesweeperComponent from './MinesweeperComponent.jsx'

const mapStateToProps = (state) => {
  return {
    minefield: state.minefield,
    board: state.board
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: function(e, coord) {
      e.preventDefault();
      if (e.nativeEvent.which === 1) {
        dispatch(sweepSquare(coord));
      } else if (e.nativeEvent.which === 3) {
        dispatch(toggleSquareFlag(coord));
      } else {
        console.log("Unknown click");
      }
    }
  }
}

const MinesweeperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MinesweeperComponent)

export default MinesweeperContainer;
