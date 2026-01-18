class Transaction {
  /** Timestamp representing the date this transaction occurred */
  date: number;
  amount: number;
  balance: number;

  private constructor(data: { amount: number; balance: number }) {
    const { amount, balance } = data;
    this.date = Date.now();
    this.amount = amount;
    this.balance = balance;
  }

  static create(data: { amount: number; balance: number }): Transaction {
    return new Transaction(data);
  }

  getCurrentBalance() {
    return this.balance;
  }
}

export { Transaction };
