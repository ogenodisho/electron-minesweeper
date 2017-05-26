import { connect } from 'react-redux'
import { changeDifficulty } from '../actions.js'
import MenuComponent from './MenuComponent.jsx'

const mapStateToProps = (state) => {
  return {
    difficulty: state.menu.difficulty
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: function(e, difficulty) {
      dispatch(changeDifficulty(difficulty));
    }
  }
}

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuComponent)

export default MenuContainer;
