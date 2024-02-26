import { Field, getBlanks, isPlayer, Mode, won } from "../game";
import { easyMove } from "./easy";
import { hardMove } from "./hard";
import { mediumMove, pettyMove } from "./medium";

export interface BotMove {
  (board: Field[], own: Field): number;
}

export function moveWithMode(mode: Mode): BotMove | undefined {
  switch (mode) {
    case Mode.EASY:
      return easyMove;
    case Mode.PETTY:
      return pettyMove;
    case Mode.MEDIUM:
      return mediumMove;
    case Mode.HARD:
      return hardMove;
    case Mode.HUMAN || Mode.ONLINE:
      return undefined;
    default:
      return undefined;
  }
}

// winningMove returns a move player can play to win
// if there is no winning move, it returns -1
export function winningMove(board: Field[], player: Field): number {
  if(won(board) !== Field.EMPTY){
    return -1;
  }

  for (let index = 0; index < board.length; index++) {
     if (board[index] !== Field.EMPTY) {
        continue;
     }

     board[index] = player;
     let hasWon = won(board) === player;
     board[index] = Field.EMPTY;

     if (hasWon) {
        return index;
     }
  }
  
  return -1
}

export function randomMove(bounds: number): number {
  return Math.floor(Math.random() * bounds);
}
