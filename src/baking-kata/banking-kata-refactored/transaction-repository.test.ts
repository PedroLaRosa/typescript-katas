import { describe, expect, it, vi } from "vitest";
import { TransationRepository } from "./transaction-repository.js";
import { Transaction } from "./transaction.js";

describe("Testing the transaction repository", () => {
  it("Should not have any transactions by default", () => {
    const transactionRepository = new TransationRepository();

    expect(transactionRepository.getAllTransactions()).toEqual([]);
  });

  it("Should add transactions to the repository", () => {
    vi.useFakeTimers();
    const transactionRepository = new TransationRepository();

    vi.setSystemTime(new Date("2025-08-24T00:00:00.00Z"));
    transactionRepository.addDeposit(500);
    const expectedTransaction1 = Transaction.create({
      balance: 500,
      amount: 500,
    }).getData();

    vi.setSystemTime(new Date("2025-09-05T00:00:00.00Z"));
    transactionRepository.addWithdrawal(1500);
    const expectedTransaction2 = Transaction.create({
      balance: -1000,
      amount: -1500,
    }).getData();

    vi.setSystemTime(new Date("2025-10-15T00:00:00.00Z"));
    transactionRepository.addDeposit(3000);
    const expectedTransaction3 = Transaction.create({
      balance: 2000,
      amount: 3000,
    }).getData();

    expect(transactionRepository.getAllTransactions()).toEqual([
      expectedTransaction1,
      expectedTransaction2,
      expectedTransaction3,
    ]);
  });
});
