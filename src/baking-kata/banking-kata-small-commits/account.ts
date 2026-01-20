import type { StatementPrinter } from "./statement-printer.js";
import type { TransactionRepository } from "./TransactionRepository.js";

class Account {
  constructor(
    private transactionRepository: TransactionRepository,
    private statementPrinter: StatementPrinter,
  ) {}

  deposit(amount: number) {
    this.transactionRepository.addDeposit(amount);
  }

  withdraw(amount: number) {
    this.transactionRepository.addWithdrawal(amount);
  }

  printStatement() {
    this.statementPrinter.print(
      this.transactionRepository.getAllTransactions(),
    );
  }
}

export { Account };
