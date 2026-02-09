import { describe, expect, it } from "vitest";
import { Game } from "./bowling.js";

const testCases = [
  { input: "-- -- -- -- -- -- -- -- -- --", expected: 0 },
  { input: "11 11 11 11 11 11 11 11 11 11", expected: 20 },
  { input: "5/ 5- -- -- -- -- -- -- -- --", expected: 20 },
  { input: "X 23 -- -- -- -- -- -- -- --", expected: 20 },
  { input: "X X X X X X X X X X X X", expected: 300 },
  { input: "5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/", expected: 150 },
  { input: "8/ 8/ 8/ 8/ 8/ 8/ 8/ 8/ 8/ 8/8", expected: 180 },
];

describe("The bowling game", () => {
  it.each<{ input: string; expected: number }>(testCases)(
    `Should return $expected points when the game is $input`,
    ({ input, expected }) => {
      const bowlingScore = new Game();

      processGame(bowlingScore, input);

      expect(bowlingScore.score()).toBe(expected);
    },
  );
});

const isEmpty = (char: string) => char === "-";
const isStrike = (char: string) => char === "X";
const isSpare = (char: string) => char === "/";

function scoreRoll(char: string, previousFrame: string): number {
  if (isEmpty(char)) return 0;
  if (isStrike(char)) return 10;
  if (isSpare(char)) return 10 - Number(previousFrame);
  return Number(char);
}

function processGame(game: Game, board: string) {
  let previousFrame = "";
  board
    .split("")
    .filter((value) => value !== " ")
    .forEach((value) => {
      game.roll(scoreRoll(value, previousFrame));
      previousFrame = value;
    });
}
