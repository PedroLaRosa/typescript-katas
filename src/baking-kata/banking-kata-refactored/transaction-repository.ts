import { Transaction } from "./transaction.js";

class TransationRepository {
  #transactions: Transaction[] = [];

  addDeposit(amount: number): void {
    const currentBalance = this.#transactions.at(-1)?.getCurrentBalance() ?? 0;

    this.#transactions.push(
      Transaction.create({
        amount,
        balance: currentBalance + amount,
      }),
    );
  }

  addWithdrawal(amount: number): void {
    const currentBalance = this.#transactions.at(-1)?.getCurrentBalance() ?? 0;

    this.#transactions.push(
      Transaction.create({
        amount: amount * -1,
        balance: currentBalance - amount,
      }),
    );
  }

  getAllTransactions() {
    // Javascript interprets class implementation in a very different way than structured objects
    // for example when implementing the Transaction class and check the console log we'll receive the following:
    // Transaction {}
    // So, when trying to compare an arrays using for example a test assertion library there is no way to
    // include the internal data value defined in the implementation of the class.
    // That is the reason there is a need to have to be transformed the transactions into a list of structured objects
    // so any test runner can compare the structure of the data
    return this.#transactions.map((transaction) => transaction.getData());
  }
}

export { TransationRepository };
