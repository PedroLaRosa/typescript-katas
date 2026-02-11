// 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// 2. Any live cell with more than three live neighbours dies, as if by overcrowding.
// 3. Any live cell with two or three live neighbours lives on to the next generation.
// 4. Any dead cell with exactly three live neighbours becomes a live cell.

import { describe, expect, it } from "vitest";
import { Cell } from "./cell.js";
import { CellStatus } from "./cell-status.js";

describe("Testing the game of life", () => {
  it("Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.", () => {
    expect(Cell.create(CellStatus.Alive).regenerateNew(1).isAlive()).toBe(
      false,
    );
    expect(Cell.create(CellStatus.Alive).regenerateNew(0).isAlive()).toBe(
      false,
    );
  });

  it("Any live cell with more than three live neighbours dies, as if by overcrowding.", () => {
    expect(Cell.create(CellStatus.Alive).regenerateNew(4).isAlive()).toBe(
      false,
    );
    expect(Cell.create(CellStatus.Alive).regenerateNew(6).isAlive()).toBe(
      false,
    );
  });

  it("Any live cell with two or three live neighbours lives on to the next generation.", () => {
    expect(Cell.create(CellStatus.Alive).regenerateNew(2).isAlive()).toBe(true);
    expect(Cell.create(CellStatus.Alive).regenerateNew(3).isAlive()).toBe(true);
  });

  it("Any dead cell with exactly three live neighbours becomes a live cell.", () => {
    expect(Cell.create(CellStatus.Dead).regenerateNew(2).isAlive()).toBe(false);
    expect(Cell.create(CellStatus.Dead).regenerateNew(3).isAlive()).toBe(true);
  });

  it("Should not allow cells with null or underfined as initial state", () => {
    expect(() => {
      // @ts-expect-error
      Cell.create(null);
    }).toThrowError();

    expect(() => {
      // @ts-expect-error
      Cell.create(undefined);
    }).toThrow();
  });
});
