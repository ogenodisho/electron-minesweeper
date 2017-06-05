import React from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'

// Just inline the component inside the container for the undo redo
let UndoRedoComponent = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <p>
    <button onClick={onUndo} disabled={!canUndo}>
      Undo
    </button>
    <button onClick={onRedo} disabled={!canRedo}>
      Redo
    </button>
  </p>
)

const mapStateToProps = (state) => {
  return {
    canUndo: state.game.past.length > 0,
    canRedo: state.game.future.length > 0
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
  }
}

const UndoRedo = connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedoComponent)

export default UndoRedo
