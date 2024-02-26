import { getBlanks, invertPlayer, Field } from "../game";
import { blockMove, randomMove, winningMove } from "./bot";

// the medium bot plays a wiining move, if it can
// or blocks the opponent from winning
// or plays the center field if it can
// otherwise it plays a random move
export function mediumMove(board: Field[], own: Field): number {
  let move = winningMove(board, own);

  if(move !== -1){
    return move;
  }

  move = blockMove(board, own);

  if(move !== -1){
    return move;
  }

  if (board[4] === Field.EMPTY) {
    return 4;
  }

  do {
    move = randomMove(8);
  } while (board[move] !== Field.EMPTY);

  return move;
}

// this bot just tries to block a win
// otherwise it plays a random move
export function pettyMove(board: Field[], own: Field): number {
  return -1
}
