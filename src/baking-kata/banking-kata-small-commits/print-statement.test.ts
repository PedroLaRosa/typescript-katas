import { describe, expect, it, vi } from "vitest";
import { TransactionRepository } from "./TransactionRepository.js";
import { PrintStatement } from "./print-statement.js";

describe("PrintStatement class", () => {
  it("should print the statement properly and well formatted", () => {
    vi.useFakeTimers();
    vi.spyOn(console, "log");
    const transactionRepository = new TransactionRepository();
    const printStatement = new PrintStatement();

    vi.setSystemTime(new Date("2026-01-19T00:00:00.00Z"));
    transactionRepository.addTransaction(500);

    vi.setSystemTime(new Date("2026-01-20T00:00:00.00Z"));
    transactionRepository.addTransaction(-600);

    vi.setSystemTime(new Date("2026-01-21T00:00:00.00Z"));
    transactionRepository.addTransaction(300);

    printStatement.print(transactionRepository.getAllTransactions());

    expect(console.log).toHaveBeenLastCalledWith(
      [
        "Date | Amount | Balance",
        "21/01/2026 | +300 | 200",
        "20/01/2026 | -600 | -100",
        "19/01/2026 | +500 | 500",
      ].join("\n"),
    );
  });
});
