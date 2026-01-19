import type { TransactionRepository } from "./TransactionRepository.js";

class Account {
  header = "Date | Amount | Balance";
  constructor(private transactionRepository: TransactionRepository) {}
  deposit(amount: number) {
    this.transactionRepository.addTransaction(amount);
  }

  withdraw(amount: number) {
    const amountToSubtract = amount * -1;
    this.transactionRepository.addTransaction(amountToSubtract);
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
    const formattedStatement = this.transactionRepository
      .getAllTransactions()
      .map(
        (t) =>
          `${this.#formatDate(t.timestamp)} | ${this.#formatDecimal(t.amount, { hasPositiveSign: true })} | ${this.#formatDecimal(t.totalSnapshot)}`,
      )
      .toReversed();

    console.log([this.header, ...formattedStatement].join("\n"));
  }
}

export { Account };
