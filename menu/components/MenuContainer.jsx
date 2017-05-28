import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { restart, changeDifficulty } from '../actionCreators.js'
import MenuComponent from './MenuComponent.jsx'

const mapStateToProps = (state) => {
  return {
    difficulty: state.menu.difficulty
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ restart, changeDifficulty }, dispatch);
}

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuComponent)

export default MenuContainer;
