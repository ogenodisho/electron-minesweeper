import * as t from './actionTypes';

export function sweepSquare(coord) {
  return {
    type: t.SWEEP_SQUARE,
    coord: coord
  }
}

export function toggleSquareFlag(coord) {
  return {
    type: t.TOGGLE_SQUARE_FLAG,
    coord: coord
  }
}
