class Transaction {
  private constructor(
    public timestamp: number,
    public amount: number,
    public totalSnapshot: number,
  ) {}

  static create(amount: number, totalSnapshot: number) {
    return new Transaction(Date.now(), amount, totalSnapshot);
  }
}

export { Transaction };
