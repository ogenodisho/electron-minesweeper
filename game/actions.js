import * as t from './actionTypes';

export function revealSquare() {
  return {
    type: t.REVEAL_SQUARE
  }
}

export function flagSquare() {
  return {
    type: t.FLAG_SQUARE
  }
}
