import { connect } from 'react-redux'
import {revealSquare , flagSquare} from '../actions.js'
import MinesweeperComponent from './MinesweeperComponent.jsx'

const mapStateToProps = (state) => {
  return {
    boardState: state.state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLeftClick: () => {
      dispatch(revealSquare())
    },
    onRightClick: () => {
      dispatch(flagSquare())
    }
  }
}

const MinesweeperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MinesweeperComponent)

export default MinesweeperContainer;
