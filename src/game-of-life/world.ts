import type { CellStatus } from "./cell-status.js";
import { Cell } from "./cell.js";

class World {
  private constructor(readonly cellMatrix: Cell[][]) {}

  static createFrom(initialStatus: CellStatus[][]) {
    const cellMatrix = initialStatus.map((row) =>
      row.map((status) => Cell.create(status)),
    );

    return new World(cellMatrix);
  }

  nextGeneration() {
    const nextCellMatrix = this.cellMatrix.map((row, rowIndex) =>
      row.map((cell, columnIndex) =>
        cell.regenerateNew(this.aliveNeighborsFor(rowIndex, columnIndex)),
      ),
    );
    return new World(nextCellMatrix);
  }

  aliveNeighborsFor(row: number, column: number) {
    return (
      this.aliveColumnNeighbors(row, column) +
      this.aliveNeighborsInPreviousRow(row, column) +
      this.aliveNeighborsInNextRow(row, column)
    );
  }

  private isCellAliveAt(row: number, column: number) {
    const rowCells = this.cellMatrix[row];
    if (rowCells === undefined) {
      return false;
    }
    const cell = rowCells[column];
    if (cell === undefined) {
      return false;
    }
    return cell.isAlive();
  }

  private aliveColumnNeighbors(row: number, column: number) {
    let aliveNeighbors = 0;
    const previousColumn = column - 1;
    if (previousColumn >= 0 && this.isCellAliveAt(row, previousColumn)) {
      aliveNeighbors++;
    }
    const nextColumn = column + 1;
    const rowLength = this.cellMatrix[row]?.length ?? 0;
    if (nextColumn < rowLength && this.isCellAliveAt(row, nextColumn)) {
      aliveNeighbors++;
    }
    return aliveNeighbors;
  }

  private aliveNeighborsInNextRow(row: number, column: number) {
    let aliveNeighbors = 0;
    const nextRow = row + 1;

    if (nextRow < this.cellMatrix.length) {
      if (this.isCellAliveAt(nextRow, column)) {
        aliveNeighbors++;
      }
      aliveNeighbors += this.aliveColumnNeighbors(nextRow, column);
    }
    return aliveNeighbors;
  }
  private aliveNeighborsInPreviousRow(row: number, column: number) {
    let aliveNeighbors = 0;
    const previousRow = row - 1;

    if (previousRow >= 0) {
      if (this.isCellAliveAt(previousRow, column)) {
        aliveNeighbors++;
      }
      aliveNeighbors += this.aliveColumnNeighbors(previousRow, column);
    }
    return aliveNeighbors;
  }
}

export { World };
