import * as t from './actionTypes';
import type {
  State
} from './model';

const initialState: State = [{
  text: 'Use Redux',
  completed: false,
  id: 0
}];

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case t.REVEAL_SQUARE:
      return [
        // ...
      ];
    case t.FLAG_SQUARE:
      return [
        // ...
      ];
    default:
      return state;
  }
};

export default reducer;
