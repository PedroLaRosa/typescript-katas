import type { StatementPrinter } from "./statement-printer.js";
import type { TransactionRepository } from "./TransactionRepository.js";

class Account {
  constructor(
    private transactionRepository: TransactionRepository,
    private statementPrinter: StatementPrinter,
  ) {}

  deposit(amount: number) {
    this.transactionRepository.addTransaction(amount);
  }

  withdraw(amount: number) {
    const amountToSubtract = amount * -1;

    this.transactionRepository.addTransaction(amountToSubtract);
  }

  printStatement() {
    this.statementPrinter.print(
      this.transactionRepository.getAllTransactions(),
    );
  }
}

export { Account };
