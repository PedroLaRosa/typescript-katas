import { describe, expect, it, vi } from "vitest";
import { TransactionRepository } from "./TransactionRepository.js";
import { Transaction } from "./transaction.js";

describe("Testing transaction repository class", () => {
  it("Should create deposit transations", () => {
    vi.useFakeTimers();
    const transactionRepository = new TransactionRepository();

    vi.setSystemTime(new Date("2026-01-19T00:00:00.00Z"));
    transactionRepository.addDeposit(600);
    const expectedFirstTransaction = Transaction.create(600, 600);

    vi.setSystemTime(new Date("2026-01-20T00:00:00.00Z"));
    transactionRepository.addDeposit(300);
    const expectedSecondTransaction = Transaction.create(300, 900);

    expect(transactionRepository.getAllTransactions()).toEqual([
      expectedFirstTransaction,
      expectedSecondTransaction,
    ]);
  });

  it("Should create withdrawal transation", () => {
    vi.useFakeTimers();
    const transactionRepository = new TransactionRepository();

    vi.setSystemTime(new Date("2026-01-19T00:00:00.00Z"));
    transactionRepository.addWithdrawal(600);
    const expectedFirstTransaction = Transaction.create(-600, -600);

    vi.setSystemTime(new Date("2026-01-20T00:00:00.00Z"));
    transactionRepository.addWithdrawal(300);
    const expectedSecondTransaction = Transaction.create(-300, -900);

    expect(transactionRepository.getAllTransactions()).toEqual([
      expectedFirstTransaction,
      expectedSecondTransaction,
    ]);
  });

  it("Should create both deposit and withdrawal transation", () => {
    vi.useFakeTimers();
    const transactionRepository = new TransactionRepository();

    vi.setSystemTime(new Date("2026-01-19T00:00:00.00Z"));
    transactionRepository.addDeposit(600);
    const expectedFirstTransaction = Transaction.create(600, 600);

    vi.setSystemTime(new Date("2026-01-20T00:00:00.00Z"));
    transactionRepository.addWithdrawal(300);
    const expectedSecondTransaction = Transaction.create(-300, 300);

    expect(transactionRepository.getAllTransactions()).toEqual([
      expectedFirstTransaction,
      expectedSecondTransaction,
    ]);
  });

  it("Should throw error when passing a negative amount to add deposit", () => {
    const transactionRepository = new TransactionRepository();

    expect(() => {
      transactionRepository.addDeposit(-1);
    }).toThrow();
  });

  it("Should throw error when passing a negative amount to add withdrawal", () => {
    const transactionRepository = new TransactionRepository();

    expect(() => {
      transactionRepository.addWithdrawal(-1);
    }).toThrow();
  });
});
