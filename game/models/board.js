// TODO every board should have a function to init itself randomly
// then in the menu container when the difficulty changes, you cahnge the board

const Board = {
  beginner: {
    numberOfRows: 8,
    numberOfCols: 8,
    numberOfMines: 10
  },
  intermediate: {
    numberOfRows: 16,
    numberOfCols: 16,
    numberOfMines: 40
  },
  expert: {
    numberOfRows: 16,
    numberOfCols: 30,
    numberOfMines: 99
  }
}

export default Board;
