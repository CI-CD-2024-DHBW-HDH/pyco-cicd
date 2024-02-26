import { Field, getBlanks, invertPlayer, isPlayer } from "./game";

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