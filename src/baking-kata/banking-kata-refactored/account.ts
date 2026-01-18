import type { StatementPrinter } from "./statement-printer.js";
import { TransactionRepository } from "./transaction-repository.js";

class Account {
  #transationRepository: TransactionRepository;
  #statementPrinter: StatementPrinter;
  constructor(
    transationRepository: TransactionRepository,
    statementPrinter: StatementPrinter,
  ) {
    this.#transationRepository = transationRepository;
    this.#statementPrinter = statementPrinter;
  }

  static create(
    transationRepository: TransactionRepository,
    statementPrinter: StatementPrinter,
  ): Account {
    return new Account(transationRepository, statementPrinter);
  }

  deposit(amount: number): void {
    this.#transationRepository.addDeposit(amount);
  }
  withdraw(amount: number): void {
    this.#transationRepository.addWithdrawal(amount);
  }

  printStatement(): void {
    const formattedStatement = this.#transationRepository.getAllTransactions();
    this.#statementPrinter.print(formattedStatement);
  }
}

export { Account };
