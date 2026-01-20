import { beforeEach, describe, expect, it, vi } from "vitest";
import { TransactionRepository } from "./TransactionRepository.js";
import { StatementPrinter } from "./statement-printer.js";

describe("PrintStatement class", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetAllMocks();
  });

  it("should print the statement properly and well formatted in es-ES", () => {
    const logger = { log: vi.fn() };
    const transactionRepository = new TransactionRepository();
    const printStatement = new StatementPrinter(logger, "es-ES");

    vi.setSystemTime(new Date("2026-01-19T00:00:00.00Z"));
    transactionRepository.addDeposit(500);

    vi.setSystemTime(new Date("2026-01-20T00:00:00.00Z"));
    transactionRepository.addWithdrawal(600);

    vi.setSystemTime(new Date("2026-01-21T00:00:00.00Z"));
    transactionRepository.addDeposit(300);

    printStatement.print(transactionRepository.getAllTransactions());

    expect(logger.log).toHaveBeenLastCalledWith(
      [
        "Date | Amount | Balance",
        "21/01/2026 | +300 | 200",
        "20/01/2026 | -600 | -100",
        "19/01/2026 | +500 | 500",
      ].join("\n"),
    );
  });

  it("should print the statement properly and well formatted in en-US", () => {
    const logger = { log: vi.fn() };
    const transactionRepository = new TransactionRepository();
    const printStatement = new StatementPrinter(logger, "en-US");

    vi.setSystemTime(new Date("2026-01-19T00:00:00.00Z"));
    transactionRepository.addDeposit(500);

    vi.setSystemTime(new Date("2026-01-20T00:00:00.00Z"));
    transactionRepository.addWithdrawal(600);

    vi.setSystemTime(new Date("2026-01-21T00:00:00.00Z"));
    transactionRepository.addDeposit(300);

    printStatement.print(transactionRepository.getAllTransactions());

    expect(logger.log).toHaveBeenLastCalledWith(
      [
        "Date | Amount | Balance",
        "01/21/2026 | +300 | 200",
        "01/20/2026 | -600 | -100",
        "01/19/2026 | +500 | 500",
      ].join("\n"),
    );
  });
});
