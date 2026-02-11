import { CellStatus } from "./cell-status.js";

class Cell {
  private constructor(private readonly status: CellStatus) {}

  static create(status: CellStatus) {
    if (status === null || status === undefined) {
      throw new Error("Invalid cell status");
    }

    return new Cell(status);
  }

  private statusForAliveCell(numberOfNeighbors: number) {
    const isStablePopulation = numberOfNeighbors < 2 || numberOfNeighbors > 3;

    return isStablePopulation ? CellStatus.Dead : CellStatus.Alive;
  }

  private statusForDeadCell(numberOfNeighbors: number) {
    const isFertilePopulation = numberOfNeighbors === 3;

    return isFertilePopulation ? CellStatus.Alive : CellStatus.Dead;
  }

  regenerate(numberOfNeighbors: number) {
    return this.status === CellStatus.Alive
      ? this.statusForAliveCell(numberOfNeighbors)
      : this.statusForDeadCell(numberOfNeighbors);
  }

  regenerateNew(numberOfNeighbors: number) {
    const nextStatus =
      this.status === CellStatus.Alive
        ? this.statusForAliveCell(numberOfNeighbors)
        : this.statusForDeadCell(numberOfNeighbors);

    return new Cell(nextStatus);
  }

  isAlive() {
    return this.status === CellStatus.Alive;
  }
}

export { Cell };
