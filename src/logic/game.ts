import { moveWithMode, type BotMove } from "./bots/bot";

export enum Mode {
  EASY = 0,
  PETTY,
  MEDIUM,
  HARD,
  HUMAN,
  ONLINE,
}

export enum Field {
  EMPTY = 0,
  PLAYER1,
  PLAYER2,
}

export class Player {
  score = 0;
  field: Field.PLAYER1 | Field.PLAYER2;
  botMove: BotMove | undefined = undefined;

  constructor(f: Field.PLAYER1 | Field.PLAYER2) {
    this.field = f;
  }

  addWin() {
    this.score++;
  }
  isHuman(): boolean {
    return this.botMove === undefined;
  }
  move(board: Field[]): number {
    if (this.botMove !== undefined) return this.botMove(board, this.field);
    return -1;
  }
}

export class Game {
  player: Player;
  enemy: Player;
  mode: Mode;

  constructor(
    player: Player = new Player(Field.PLAYER1),
    enemy: Player = new Player(Field.PLAYER2),
    mode: Mode = Mode.EASY
  ) {
    player.score = 0;
    enemy.score = 0;
    this.mode = mode;
    this.player = player;
    this.enemy = enemy;
    this.enemy.botMove = moveWithMode(this.mode);
  }

  addWin(player: Field) {
    switch (player) {
      case Field.PLAYER1:
        this.player.addWin();
        break;
      case Field.PLAYER2:
        this.enemy.addWin();
        break;
    }
  }
  switchSides() {
    const botMove = this.player.botMove;
    this.player.botMove = this.enemy.botMove;
    this.enemy.botMove = botMove;
    const score = this.player.score;
    this.player.score = this.enemy.score;
    this.enemy.score = score;
  }
  updateMode(mode: Mode) {
    this.mode = mode;
    if (this.player.isHuman() && this.enemy.isHuman() && mode != Mode.HUMAN) {
      this.enemy.botMove = moveWithMode(this.mode);
      return;
    }
    if (!this.player.isHuman()) this.player.botMove = moveWithMode(this.mode);
    if (!this.enemy.isHuman()) this.enemy.botMove = moveWithMode(this.mode);
  }
}

export class Outcome {
  finished: boolean;
  winner: Field = Field.EMPTY;

  constructor(board: Field[]) {
    this.winner = won(board);
    this.finished = isFull(board) || this.winner !== Field.EMPTY;
  }

  isDraw(): boolean {
    return this.finished === true && this.winner === Field.EMPTY;
  }
}

export function isFull(board: Field[]): boolean {
  return !board.some((field) => field === Field.EMPTY);
}

export function won(board: Field[]): Field {
  console.log('inside won');
  var p1Symbols: number = 0;
  var p2Symbols: number = 0;

  
  //check horizontal lines
  for(let i = 0; i<3; i++){
    if(board[i * 3] !== Field.EMPTY &&
      board[i * 3] === board[i * 3 + 1] && board[i * 3 +2]){
        return board[i * 3];
      }
  }
  //check vertical lines
  for(let i = 0; i<3; i++){

    if(board[i * 3] !== Field.EMPTY &&
      board[i * 3] === board[i * 3 + 3] && board[i * 3 + 6]){
        return board[i * 3];
      }
  }

  //check diagonal lines
  if((board[0] !== Field.EMPTY && board[0] === board[4] && board[4] == board[8]) || (board[2] !== Field.EMPTY && board[2] === board[4] && board[4] === board[6])){
   return board[4]
  }
  return Field.EMPTY
}

export function newBoard(): Field[] {
  const board = new Array<Field>(9);
  board.fill(Field.EMPTY);
  return board;
}

export function getBlanks(board: Field[]): number[] {
  return board
    .map<number>((field, index) => {
      if (field !== Field.EMPTY) return -1;
      return index;
    })
    .filter((value) => {
      return value >= 0;
    });
}

export function invertPlayer(player: Field): Field {
  if (!isPlayer(player)) return Field.EMPTY;
  return 3 - player;
}

export function isPlayer(player: Field): boolean {
  return player === Field.PLAYER1 || player === Field.PLAYER2;
}
