import { Field, getBlanks, invertPlayer, isPlayer, Player, Outcome, isFull, won } from "./game";

describe("invert player", () => {
    it("invert player1 to player2", () => {
      const result: Field = invertPlayer(Field.PLAYER1);
      expect(result).toBe(Field.PLAYER2);
    });
    it("invert player2 to player1", () => {
      const result: Field = invertPlayer(Field.PLAYER2);
      expect(result).toBe(Field.PLAYER1);
    });
    it("return empty field as empty", () => {
      const result: Field = invertPlayer(Field.EMPTY);
      expect(result).toBe(Field.EMPTY);
    });
  });

  //test isPlayer()
  describe("is player", () => {
    it("confirm player1", () => {
        const result: Boolean = isPlayer(Field.PLAYER1);
        expect(result).toBe(true);
    });
    it("confirm player1", () => {
        const result: Boolean = isPlayer(Field.PLAYER2);
        expect(result).toBe(true);
    });
    it("confirm player1", () => {
        const result: Boolean = isPlayer(Field.EMPTY);
        expect(result).toBe(false);
    });
  })

  //test getBlanks()
  describe("get Blanks", () => {
    it("get blanks from empty field", () => {
        const board = new Array<Field>(9);
        board.fill(Field.EMPTY);
        const result: number[] = getBlanks(board);
        expect(result.length).toBe(9);
    });
    it("get blanks from custom field", () => {
        const board = new Array<Field>(9);
        board.fill(Field.EMPTY);
        board[1] = Field.PLAYER1;
        board[6] = Field.PLAYER2;
        const result: number[] = getBlanks(board);
        expect(result.length).toBe(7);
    });

  
  })

  describe('Player Class', () => {
    describe('Initialization and Basic Properties', () => {
      const player = new Player(Field.PLAYER1);
  
      it('should have the correct initial field', () => {
        expect(player.field).toBe(Field.PLAYER1);
      });
  
      it('should start with a score of 0', () => {
        expect(player.score).toBe(0);
      });
  
      it('should be considered a human player initially', () => {
        expect(player.isHuman()).toBe(true);
      });
    });
  
    describe('Winning a Game', () => {
      const player = new Player(Field.PLAYER2);
  
      it('should increment score by 1 after a win', () => {
        player.addWin();
        expect(player.score).toBe(1);
      });
  
      it('should correctly increment score after multiple wins', () => {
        player.addWin();
        player.addWin();
        expect(player.score).toBe(3); // Assuming the player already won once in the previous test
      });
    });
  
    describe('Bot Moves', () => {
      let player: Player;
      const mockBotMove = jest.fn();
  
      beforeEach(() => {
        player = new Player(Field.PLAYER1);
        mockBotMove.mockReset();
      });
  
      it('should execute a bot move if botMove is defined', () => {
        const board = [Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY];
        mockBotMove.mockReturnValue(0); // Mock bot move returns the first index for simplicity
        player.botMove = mockBotMove;
  
        const moveIndex = player.move(board);
        expect(moveIndex).toBe(0);
        expect(mockBotMove).toHaveBeenCalledWith(board, player.field);
      });
  
      it('should return -1 for a human player (no botMove defined)', () => {
        const board = [Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY];
        const moveIndex = player.move(board);
        expect(moveIndex).toBe(-1);
        expect(mockBotMove).not.toHaveBeenCalled();
      });
  
      it('should correctly switch from human to bot', () => {
        // Initially, the player is human
        expect(player.isHuman()).toBe(true);
  
        // Assign a bot move function and verify the change
        player.botMove = mockBotMove;
        expect(player.isHuman()).toBe(false);
      });
    });
  });

  describe('Player Class', () => {
    describe('Initialization and Basic Properties', () => {
      const player = new Player(Field.PLAYER1);
  
      it('should have the correct initial field', () => {
        expect(player.field).toBe(Field.PLAYER1);
      });
  
      it('should start with a score of 0', () => {
        expect(player.score).toBe(0);
      });
  
      it('should be considered a human player initially', () => {
        expect(player.isHuman()).toBe(true);
      });
    });
  
    describe('Winning a Game', () => {
      const player = new Player(Field.PLAYER2);
  
      it('should increment score by 1 after a win', () => {
        player.addWin();
        expect(player.score).toBe(1);
      });
  
      it('should correctly increment score after multiple wins', () => {
        player.addWin();
        player.addWin();
        expect(player.score).toBe(3); // Assuming the player already won once in the previous test
      });
    });
  
    describe('Bot Moves', () => {
      let player: Player;
      const mockBotMove = jest.fn();
  
      beforeEach(() => {
        player = new Player(Field.PLAYER1);
        mockBotMove.mockReset();
      });
  
      it('should execute a bot move if botMove is defined', () => {
        const board = [Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY];
        mockBotMove.mockReturnValue(0); // Mock bot move returns the first index for simplicity
        player.botMove = mockBotMove;
  
        const moveIndex = player.move(board);
        expect(moveIndex).toBe(0);
        expect(mockBotMove).toHaveBeenCalledWith(board, player.field);
      });
  
      it('should return -1 for a human player (no botMove defined)', () => {
        const board = [Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY, Field.EMPTY];
        const moveIndex = player.move(board);
        expect(moveIndex).toBe(-1);
        expect(mockBotMove).not.toHaveBeenCalled();
      });
  
      it('should correctly switch from human to bot', () => {
        // Initially, the player is human
        expect(player.isHuman()).toBe(true);
  
        // Assign a bot move function and verify the change
        player.botMove = mockBotMove;
        expect(player.isHuman()).toBe(false);
      });
    });
  });

  describe('Outcome Class', () => {
    describe('Win Conditions', () => {
      it('should correctly identify a win for Player1 horizontally', () => {
        const board = [
          Field.PLAYER1, Field.PLAYER1, Field.PLAYER1,
          Field.EMPTY, Field.EMPTY, Field.EMPTY,
          Field.EMPTY, Field.EMPTY, Field.EMPTY,
        ];
        const outcome = new Outcome(board);
        expect(outcome.winner).toBe(Field.PLAYER1);
        expect(outcome.finished).toBe(true);
      });
  
      it('should correctly identify a win for Player2 vertically', () => {
        const board = [
          Field.PLAYER2, Field.EMPTY, Field.EMPTY,
          Field.PLAYER2, Field.EMPTY, Field.EMPTY,
          Field.PLAYER2, Field.EMPTY, Field.EMPTY,
        ];
        const outcome = new Outcome(board);
        expect(outcome.winner).toBe(Field.PLAYER2);
        expect(outcome.finished).toBe(true);
      });
  
      it('should correctly identify a diagonal win', () => {
        const board = [
          Field.PLAYER1, Field.EMPTY, Field.EMPTY,
          Field.EMPTY, Field.PLAYER1, Field.EMPTY,
          Field.EMPTY, Field.EMPTY, Field.PLAYER1,
        ];
        const outcome = new Outcome(board);
        expect(outcome.winner).toBe(Field.PLAYER1);
        expect(outcome.finished).toBe(true);
      });
    });
  
    describe('Game Not Finished', () => {
      it('should not mark the game as finished if there are empty fields and no winner', () => {
        const board = [
          Field.EMPTY, Field.EMPTY, Field.EMPTY,
          Field.EMPTY, Field.PLAYER1, Field.EMPTY,
          Field.EMPTY, Field.EMPTY, Field.EMPTY,
        ];
        const outcome = new Outcome(board);
        expect(outcome.finished).toBe(false);
      });
    });
  });

  //test won()
  describe("won", () => {
    it("player1 won with horizontal line", () => {
        let board = new Array<Field>(9);
        board.fill(Field.EMPTY);
        board[0] = Field.PLAYER1;
        board[1] = Field.PLAYER1;
        board[2] = Field.PLAYER1;
        const result: Field = won(board);
        expect(result).toBe(Field.PLAYER1);
    });
    it("player2 won with diagonal line", () => {
        let board = new Array<Field>(9);
        board.fill(Field.EMPTY);
        board[0] = Field.PLAYER2;
        board[1] = Field.PLAYER1;
        board[4] = Field.PLAYER2;
        board[8] = Field.PLAYER2;
        const result: Field = won(board);
        expect(result).toBe(Field.PLAYER2);
    });
    it("player2 won with vertival line", () => {
        let board = new Array<Field>(9);
        board.fill(Field.EMPTY);
        board[0] = Field.PLAYER2;
        board[1] = Field.PLAYER1;
        board[3] = Field.PLAYER2;
        board[6] = Field.PLAYER2;
        const result: Field = won(board);
        expect(result).toBe(Field.PLAYER2);
    });
    it("no winner", () => {
        let board = new Array<Field>(9);
        board.fill(Field.EMPTY);
        board[0] = Field.PLAYER2;
        board[1] = Field.PLAYER1;
        const result: Field = won(board);
        expect(result).toBe(Field.EMPTY);
    });
  })

  //test isFull()
  describe("is full", () => {
    it("field is full", () => {
        const board = new Array<Field>(9);
        board.fill(Field.PLAYER1);
        const result: Boolean = isFull(board);
        expect(result).toBe(true);
    });
    it("get blanks from custom field", () => {
        const board = new Array<Field>(9);
        board.fill(Field.EMPTY);
        board[1] = Field.PLAYER1;
        board[6] = Field.PLAYER2;
        const result: Boolean = isFull(board);
        expect(result).toBe(false);
    });
  })