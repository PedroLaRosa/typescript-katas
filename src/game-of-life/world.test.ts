import { describe, expect, it } from "vitest";
import { CellStatus } from "./cell-status.js";
import { Cell } from "./cell.js";
import { World } from "./world.js";

const { Dead, Alive } = CellStatus;
/**
 * Creation method
 * Next generation
 * Number of neighbors for each coordinate
 * [[Dead]] in coordinate (0,0) -> 0
 * [[Alive, Dead]] in coordinate (0,1) -> 1
 * [[Dead, Dead]] in coordinate (0,1) -> 1
 * [[Alive, Dead, Alive]] in coordinate (0,1) -> 2
 * [[Alive, Dead, Alive]]
 * [[Alive, Alive, Alive]] in coordinate (0,1) -> 5
 * [[Alive, Dead, Alive]]
 * [[Alive, Dead, Alive]]
 * [[Alive, Alive, Alive]] in coordinate (1,1) -> 8
 * */

describe("The World", () => {
  it("Should create a cell matrix for a given cell status", () => {
    const initialStatus = [
      [Dead, Dead],
      [Dead, Alive],
    ];

    const world = World.createFrom(initialStatus);

    expect(world.cellMatrix).toEqual([
      [Cell.create(Dead), Cell.create(Dead)],
      [Cell.create(Dead), Cell.create(Alive)],
    ]);
  });
  it("Should get alive neighbors for a given coordinates", () => {
    expect(World.createFrom([[Dead]]).aliveNeighborsFor(0, 0)).toBe(0);
    expect(World.createFrom([[Alive, Dead]]).aliveNeighborsFor(0, 1)).toBe(1);
    expect(World.createFrom([[Dead, Dead]]).aliveNeighborsFor(0, 1)).toBe(0);
    expect(
      World.createFrom([[Alive, Dead, Alive]]).aliveNeighborsFor(0, 1),
    ).toBe(2);
    expect(
      World.createFrom([
        [Alive, Dead, Alive],
        [Alive, Alive, Alive],
      ]).aliveNeighborsFor(0, 1),
    ).toBe(5);
    expect(
      World.createFrom([
        [Alive, Alive, Alive],
        [Alive, Dead, Alive],
        [Alive, Alive, Alive],
      ]).aliveNeighborsFor(1, 1),
    ).toBe(8);
  });

  it("Should generates the next state of the game", () => {
    const world = World.createFrom([
      [Dead, Alive, Dead],
      [Dead, Alive, Dead],
      [Dead, Alive, Dead],
    ]);

    const nextState = world.nextGeneration().cellMatrix;

    expect(nextState).toEqual([
      [Cell.create(Dead), Cell.create(Dead), Cell.create(Dead)],
      [Cell.create(Alive), Cell.create(Alive), Cell.create(Alive)],
      [Cell.create(Dead), Cell.create(Dead), Cell.create(Dead)],
    ]);
  });

  it("Should never changes for a given initial block pattern", () => {
    const world = World.createFrom([
      [Alive, Alive, Dead],
      [Alive, Alive, Dead],
      [Dead, Dead, Dead],
    ]);

    const nextWorld = world.nextGeneration().nextGeneration().nextGeneration();

    expect(nextWorld).toEqual(world);
  });

  it("Should reestablishes the same state after two generation when a given oscillator pattern is provided", () => {
    const world = World.createFrom([
      [Dead, Alive, Dead],
      [Dead, Alive, Dead],
      [Dead, Alive, Dead],
    ]);

    const nextWorld = world.nextGeneration().nextGeneration();

    expect(nextWorld).toEqual(world);
  });
});
