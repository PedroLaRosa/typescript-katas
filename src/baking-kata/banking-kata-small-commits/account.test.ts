import { describe, expect, it, vi } from "vitest";
import { Account } from "./account.js";
import { TransactionRepository } from "./TransactionRepository.js";
import { StatementPrinter } from "./statement-printer.js";

describe("Testing Account class", () => {
  it("should add a deposit", () => {
    vi.useFakeTimers();
    const transactionRepository = new TransactionRepository();
    // Tip: spying on console.log is not ideal because even if the test passes
    // and everything keeps working fine. The logs are printing out in the console
    // adding noise to the test output.
    const logger = { log: vi.fn() };
    const printStatement = new StatementPrinter(logger, "es-ES");
    const account = new Account(transactionRepository, printStatement);

    vi.setSystemTime(new Date("2026-01-19T00:00:00.00Z"));
    account.deposit(500);

    vi.setSystemTime(new Date("2026-01-20T00:00:00.00Z"));
    account.deposit(700);

    account.printStatement();

    expect(logger.log).toHaveBeenLastCalledWith(
      [
        "Date | Amount | Balance",
        "20/01/2026 | +700 | 1200",
        "19/01/2026 | +500 | 500",
      ].join("\n"),
    );
  });

  it("should add withdrawal", () => {
    vi.useFakeTimers();

    const transactionRepository = new TransactionRepository();

    // Tip: spying on console.log is not ideal because even if the test passes
    // and everything keeps working fine. The logs are printing out in the console
    // adding noise to the test output.
    const logger = { log: vi.fn() };
    const printStatement = new StatementPrinter(logger, "es-ES");
    const account = new Account(transactionRepository, printStatement);

    vi.setSystemTime(new Date("2026-01-19T00:00:00.00Z"));
    account.withdraw(200);

    vi.setSystemTime(new Date("2026-01-20T00:00:00.00Z"));
    account.withdraw(600);

    account.printStatement();

    expect(logger.log).toHaveBeenLastCalledWith(
      [
        "Date | Amount | Balance",
        "20/01/2026 | -600 | -800",
        "19/01/2026 | -200 | -200",
      ].join("\n"),
    );
  });

  it("should print a mix of withdrawal and deposit", () => {
    vi.useFakeTimers();

    const transactionRepository = new TransactionRepository();

    // Tip: spying on console.log is not ideal because even if the test passes
    // and everything keeps working fine. The logs are printing out in the console
    // adding noise to the test output.
    const logger = { log: vi.fn() };
    const printStatement = new StatementPrinter(logger, "es-ES");
    const account = new Account(transactionRepository, printStatement);

    vi.setSystemTime(new Date("2026-01-19T00:00:00.00Z"));
    account.deposit(300);

    vi.setSystemTime(new Date("2026-01-20T00:00:00.00Z"));
    account.withdraw(600);

    vi.setSystemTime(new Date("2026-01-21T00:00:00.00Z"));
    account.deposit(1100);

    account.printStatement();

    expect(logger.log).toHaveBeenLastCalledWith(
      [
        "Date | Amount | Balance",
        "21/01/2026 | +1100 | 800",
        "20/01/2026 | -600 | -300",
        "19/01/2026 | +300 | 300",
      ].join("\n"),
    );
  });
});
