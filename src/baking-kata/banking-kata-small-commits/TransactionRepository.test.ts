import { describe, expect, it, vi } from "vitest";

describe("Testing transaction repository class", () => {
  it("Should create a transaction", () => {
    vi.useFakeTimers();
    const transactionRepository = new TransactionRepository();

    vi.setSystemTime(new Date("2026-01-19T00:00:00.00Z"));
    transactionRepository.addTransaction(600);
    const expectedFirstTransaction = Transaction.create(600, 600);

    vi.setSystemTime(new Date("2026-01-20T00:00:00.00Z"));
    transactionRepository.addTransaction(-300);
    const expectedSecondTransaction = Transaction.create(-300, 300);

    expect(transactionRepository.getAllTransactions()).toEqual([
      expectedFirstTransaction,
      expectedSecondTransaction,
    ]);
  });
});
