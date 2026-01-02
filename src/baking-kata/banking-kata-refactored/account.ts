import { TransationRepository } from "./transaction-repository.js";
import type { Logger } from "./types.js";

class Account {
  #transationRepository: TransationRepository;
  #logger: Logger;
  #locale = "es-ES";
  constructor(transationRepository: TransationRepository, logger: Logger) {
    this.#transationRepository = transationRepository;
    this.#logger = logger;
  }

  static create(
    transationRepository: TransationRepository,
    logger: Logger,
  ): Account {
    return new Account(transationRepository, logger);
  }

  deposit(amount: number): void {
    this.#transationRepository.addDeposit(amount);
  }
  withdraw(amount: number): void {
    this.#transationRepository.addWithdrawal(amount);
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

  printStatement(): void {
    const formattedStatement = this.#transationRepository
      .getAllTransactions()
      .toReversed()
      .map((transaction) => {
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

export { Account };
