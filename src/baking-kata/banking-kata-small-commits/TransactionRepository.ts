import { Transaction } from "./transaction.js";

class TransactionRepository {
  transactions: Transaction[] = [];

  private addTransaction(amount: number) {
    const lastTransaction = this.transactions.at(-1);
    const lastTransactionTotalSnapshot = lastTransaction?.totalSnapshot ?? 0;

    this.transactions.push(
      Transaction.create(amount, lastTransactionTotalSnapshot + amount),
    );
  }

  private expectPositiveNumber = (amount: number) => {
    if (amount < 0) throw new Error("amount must be positive");
  };

  public addDeposit(amount: number) {
    this.expectPositiveNumber(amount);
    this.addTransaction(amount);
  }

  public addWithdrawal(amount: number) {
    this.expectPositiveNumber(amount);

    const negativeAmount = amount * -1;
    this.addTransaction(negativeAmount);
  }

  public getAllTransactions() {
    return this.transactions;
  }
}

export { TransactionRepository };
