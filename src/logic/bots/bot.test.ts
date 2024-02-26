import { winningMove, blockMove, Field } from './bot';

// Describe block for winningMove function
describe('winningMove', () => {
  test('returns winning move for Player1', () => {
    const board = [
      Field.Player1, Field.Player1, Field.Empty,
      Field.Player2, Field.Player2, Field.Empty,
      Field.Empty, Field.Empty, Field.Empty
    ];
    expect(winningMove(board, Field.Player1)).toBe(2);
  });

  test('returns -1 when no winning move exists', () => {
    const board = [
      Field.Player1, Field.Player2, Field.Player1,
      Field.Player2, Field.Player2, Field.Player1,
      Field.Player1, Field.Player1, Field.Player2
    ];
    expect(winningMove(board, Field.Player1)).toBe(-1);
  });
});

// Describe block for blockMove function
describe('blockMove', () => {
  test('returns block move to prevent Player2 win', () => {
    const board = [
      Field.Player1, Field.Player2, Field.Player2,
      Field.Empty, Field.Player1, Field.Empty,
      Field.Empty, Field.Empty, Field.Empty
    ];
    expect(blockMove(board, Field.Player1)).toBe(5);
  });

  test('returns -1 when no block move is necessary', () => {
    const board = [
      Field.Player1, Field.Player2, Field.Player1,
      Field.Player2, Field.Player1, Field.Player2,
      Field.Player2, Field.Player1, Field.Player2
    ];
    expect(blockMove(board, Field.Player1)).toBe(-1);
  });
});