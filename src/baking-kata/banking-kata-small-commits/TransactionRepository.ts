import { Transaction } from "./transaction.js";

class TransactionRepository {
  transactions: Transaction[] = [];

  addTransaction(amount: number) {
    const lastTransaction = this.transactions.at(-1);
    const lastTransactionTotalSnapshot = lastTransaction?.totalSnapshot ?? 0;

    this.transactions.push(
      Transaction.create(amount, lastTransactionTotalSnapshot + amount),
    );
  }

  getAllTransactions() {
    return this.transactions;
  }
}

export { TransactionRepository };
