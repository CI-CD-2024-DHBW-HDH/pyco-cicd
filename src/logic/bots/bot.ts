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

export function blockMove(board: Field[], player: Field): number{
  const opponent = player === Field.PLAYER1 ? Field.PLAYER2 : Field.PLAYER1;

  const winConditions = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
  ];

  for (const condition of winConditions) {
    let opponentCount = 0;
    let emptyCount = 0;
    let blockIndex = 0;

    for (let index = 0; index < condition.length; index++) {
      const element = condition[index];
      
      if (board[element] === Field.EMPTY){
        emptyCount++;
        blockIndex = element;
      } else if (board[element] === opponent){
        opponentCount++;
      }

    }

    if (opponentCount === 2 && emptyCount === 1) {
        return blockIndex;
    }
  }

  return -1;
}

export function randomMove(bounds: number): number {
  return Math.floor(Math.random() * bounds);
}
