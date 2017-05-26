import * as t from './actionTypes';

export function changeDifficulty(difficulty) {
  return {
    type: t.CHANGE_DIFFICULTY,
    difficulty: difficulty
  }
}
