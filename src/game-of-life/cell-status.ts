const CellStatus = {
  Dead: "Dead",
  Alive: "Alive",
} as const;

type CellStatus = keyof typeof CellStatus;

export { CellStatus };
