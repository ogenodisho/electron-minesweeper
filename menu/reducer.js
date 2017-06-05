import * as t from './actionTypes';
import cloneDeep from 'lodash/cloneDeep'

const initialState = {
  difficulty: "beginner"
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case t.CHANGE_DIFFICULTY:
      var clone = cloneDeep(state)
      clone.difficulty = action.difficulty
      return clone
    case t.RESTART:
      return state;
    default:
      return state;
  }
};

export default reducer;
