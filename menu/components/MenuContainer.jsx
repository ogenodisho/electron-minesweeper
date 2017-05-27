import { connect } from 'react-redux'
import { changeDifficulty, restart } from '../actions.js'
import MenuComponent from './MenuComponent.jsx'

const mapStateToProps = (state) => {
  return {
    difficulty: state.menu.difficulty
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleDifficultyChanged: function(e, difficulty) {
      dispatch(changeDifficulty(difficulty));
    },
    handleRestart: function(e, difficulty) {
      dispatch(restart(difficulty));
    }
  }
}

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuComponent)

export default MenuContainer;
