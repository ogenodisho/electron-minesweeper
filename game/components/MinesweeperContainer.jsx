import { connect } from 'react-redux'
import {revealSquare , flagSquare} from '../actions.js'
import MinesweeperComponent from './MinesweeperComponent.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    //message: state.helloWorld.message
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(revealSquare())
    }
  }
}

const MinesweeperRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(MinesweeperComponent)

export default MinesweeperRedux;
