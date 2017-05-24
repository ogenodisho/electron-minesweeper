import * as t from './actionTypes';
import Square from './model.js';

const initialState: State = [{
  text: 'Use Redux',
  completed: false,
  id: 0,
  s: Square
}];

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case t.REVEAL_SQUARE:
      return {
        ...state
      };
    case t.FLAG_SQUARE:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default reducer;
