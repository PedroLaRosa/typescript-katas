import type { StatementPrinter } from "./statement-printer.js";
import type { TransactionRepository } from "./TransactionRepository.js";

class Account {
  constructor(
    private transactionRepository: TransactionRepository,
    private statementPrinter: StatementPrinter,
  ) {}

  private expectPositiveNumber = (amount: number) => {
    if (amount < 0) throw new Error("amount must be positive");
  };

  deposit(amount: number) {
    this.expectPositiveNumber(amount);
    this.transactionRepository.addDeposit(amount);
  }

  withdraw(amount: number) {
    this.expectPositiveNumber(amount);
    this.transactionRepository.addWithdrawal(amount);
  }

  printStatement() {
    this.statementPrinter.print(
      this.transactionRepository.getAllTransactions(),
    );
  }
}

export { Account };
