import type { Transaction } from "./transaction.js";
import type { Logger } from "./types.js";

class StatementPrinter {
  #logger: Logger;
  #locale = "es-ES";
  constructor(logger: Logger, locale: string) {
    this.#logger = logger;
    this.#locale = locale;
  }

  #formatDate(timestamp: number) {
    const dateTimeOptions = {
      year: "numeric",
      day: "2-digit",
      month: "2-digit",
    } as const;

    return new Intl.DateTimeFormat(this.#locale, dateTimeOptions).format(
      new Date(timestamp),
    );
  }

  #formatDecimal(
    amount: number,
    options: { hasPositiveSign: boolean } = { hasPositiveSign: false },
  ) {
    const numberOptions = {
      minimumFractionDigits: 2, // Ensure at least two decimal places
      maximumFractionDigits: 2, // Ensure no more than two decimal places
      signDisplay: options.hasPositiveSign ? "always" : "negative",
    } as const;

    const decimalFormat = new Intl.NumberFormat(this.#locale, numberOptions);

    return decimalFormat.format(amount);
  }

  print(transactions: Transaction[]): void {
    const formattedStatement = transactions.toReversed().map((transaction) => {
      const formattedDate = this.#formatDate(transaction.date);
      const formattedAmount = this.#formatDecimal(transaction.amount, {
        hasPositiveSign: true,
      });
      const formattedBalance = this.#formatDecimal(transaction.balance);

      return `${formattedDate} | ${formattedAmount} | ${formattedBalance}\n`;
    });

    this.#logger.log(
      ["Date | Amount | Balance\n", ...formattedStatement].join(""),
    );
  }
}

export { StatementPrinter };
