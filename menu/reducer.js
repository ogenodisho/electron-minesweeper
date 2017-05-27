import * as t from './actionTypes';
import update from 'immutability-helper';

const initialState = {
  difficulty: "beginner"
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case t.CHANGE_DIFFICULTY:
      return update(state, {
        difficulty: {
          $set: action.difficulty
        }
      });
    case t.RESTART:
      return state;
    default:
      return state;
  }
};

export default reducer;
