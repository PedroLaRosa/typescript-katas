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

class Account {
  header = "Date | Amount | Balance";
  transactions: Transaction[] = [];
  deposit(amount: number) {
    const lastTransaction = this.transactions.at(-1);
    this.transactions.push(
      Transaction.create(
        amount,
        (lastTransaction?.totalSnapshot ?? 0) + amount,
      ),
    );
  }

  withdraw(amount: number) {
    const lastTransaction = this.transactions.at(-1);
    this.transactions.push(
      Transaction.create(
        amount * -1,
        (lastTransaction?.totalSnapshot ?? 0) + amount * -1,
      ),
    );
  }

  #formatDate(timestamp: number) {
    const dateTimeOptions = {
      year: "numeric",
      day: "2-digit",
      month: "2-digit",
    } as const;

    return new Intl.DateTimeFormat("es-ES", dateTimeOptions).format(
      new Date(timestamp),
    );
  }

  #formatDecimal(
    amount: number,
    options: { hasPositiveSign: boolean } = { hasPositiveSign: false },
  ) {
    const numberOptions = {
      minimumFractionDigits: 0, // Ensure at least two decimal places
      maximumFractionDigits: 2, // Ensure no more than two decimal places
      signDisplay: options.hasPositiveSign ? "always" : "negative",
    } as const;

    const decimalFormat = new Intl.NumberFormat("es-ES", numberOptions);

    return decimalFormat.format(amount);
  }

  printStatement() {
    const formattedStatement = this.transactions
      .map(
        (t) =>
          `${this.#formatDate(t.timestamp)} | ${this.#formatDecimal(t.amount, { hasPositiveSign: true })} | ${this.#formatDecimal(t.totalSnapshot)}`,
      )
      .toReversed();

    console.log([this.header, ...formattedStatement].join("\n"));
  }
}

export { Account };
