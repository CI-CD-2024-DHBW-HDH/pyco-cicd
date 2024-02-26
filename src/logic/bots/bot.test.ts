import { Field, getBlanks, isPlayer, Mode, won } from "../game";
import { winningMove, blockMove } from './bot';

// Describe block for winningMove function
describe('winningMove', () => {
  test('returns winning move for PLAYER1', () => {
    const board = [
      Field.PLAYER1, Field.PLAYER1, Field.EMPTY,
      Field.PLAYER2, Field.PLAYER2, Field.EMPTY,
      Field.EMPTY, Field.EMPTY, Field.EMPTY
    ];
    expect(winningMove(board, Field.PLAYER1)).toBe(2);
  });

  test('returns -1 when no winning move exists', () => {
    const board = [
      Field.PLAYER1, Field.PLAYER2, Field.PLAYER1,
      Field.PLAYER2, Field.PLAYER2, Field.PLAYER1,
      Field.PLAYER1, Field.PLAYER1, Field.PLAYER2
    ];
    expect(winningMove(board, Field.PLAYER1)).toBe(-1);
  });
});

// Describe block for blockMove function
describe('blockMove', () => {
  test('returns -1 when no block move is necessary', () => {
    const board = [
      Field.PLAYER1, Field.PLAYER2, Field.PLAYER1,
      Field.PLAYER2, Field.PLAYER1, Field.PLAYER2,
      Field.PLAYER2, Field.PLAYER1, Field.PLAYER2
    ];
    expect(blockMove(board, Field.PLAYER1)).toBe(-1);
  });
});