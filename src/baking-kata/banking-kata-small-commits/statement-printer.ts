import type { Transaction } from "./transaction.js";

interface Logger {
  log: (...args: unknown[]) => void;
}

class StatementPrinter {
  private header = "Date | Amount | Balance";

  constructor(private logger: Logger) {}

  private formatDate(timestamp: number) {
    const dateTimeOptions = {
      year: "numeric",
      day: "2-digit",
      month: "2-digit",
    } as const;

    return new Intl.DateTimeFormat("es-ES", dateTimeOptions).format(
      new Date(timestamp),
    );
  }

  private formatDecimal(
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

  public print(transactions: Transaction[]) {
    const formattedStatement = transactions
      .map(
        (t) =>
          `${this.formatDate(t.timestamp)} | ${this.formatDecimal(t.amount, { hasPositiveSign: true })} | ${this.formatDecimal(t.totalSnapshot)}`,
      )
      .toReversed();

    this.logger.log([this.header, ...formattedStatement].join("\n"));
  }
}

export { StatementPrinter };
