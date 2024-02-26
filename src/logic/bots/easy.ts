import { Field } from "../game";
import { randomMove, winningMove } from "./bot";

// the easy bot plays a winning move, if it can
// otherwise, it plays a random move
export function easyMove(board: Field[], own: Field): number {
  if (winningMove(board, own) !== -1){
    return winningMove(board, own);
  }
  return randomMove(Math.random());
}
