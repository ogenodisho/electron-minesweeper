import * as t from './actionTypes';
import update from 'immutability-helper';

const initialState = {
  difficulty: "beginner" // TODO turn this into a constant in the model dir of menu?
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case t.CHANGE_DIFFICULTY:
        return update(state, { difficulty: { $set: action.difficulty } });
    default:
      return state;
  }
};

export default reducer;
