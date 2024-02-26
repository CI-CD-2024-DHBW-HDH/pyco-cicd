import { Field, getBlanks } from "../game";
import { randomMove, winningMove } from "./bot";

// the easy bot plays a winning move, if it can
// otherwise, it plays a random move
export function easyMove(board: Field[], own: Field): number {
  const blanks = getBlanks(board);

  if (winningMove(board, own) !== -1){
    return winningMove(board, own);
  }
  return randomMove(blanks.length);
}
