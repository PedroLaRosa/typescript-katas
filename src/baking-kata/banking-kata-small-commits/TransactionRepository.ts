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

  public addDeposit(amount: number) {
    this.addTransaction(amount);
  }

  public addWithdrawal(amount: number) {
    const negativeAmount = amount * -1;
    this.addTransaction(negativeAmount);
  }

  getAllTransactions() {
    return this.transactions;
  }
}

export { TransactionRepository };
