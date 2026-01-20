import { beforeEach, describe, expect, it, vi } from "vitest";
import { Account } from "./account.js";
import { TransactionRepository } from "./TransactionRepository.js";
import { StatementPrinter } from "./statement-printer.js";

describe("Testing Account class", () => {
  // Tip: spying on console.log is not ideal because even if the test passes
  // and everything keeps working fine. The logs are printing out in the console
  // adding noise to the test output.
  let logger = { log: vi.fn() };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetAllMocks();
  });

  it("should add a deposit", () => {
    const transactionRepository = new TransactionRepository();
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
    const transactionRepository = new TransactionRepository();

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
    const transactionRepository = new TransactionRepository();
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

  it("Should throw error when passing a negative amount to deposit", () => {
    const transactionRepository = new TransactionRepository();
    const printStatement = new StatementPrinter(logger, "es-ES");
    const account = new Account(transactionRepository, printStatement);

    expect(() => {
      account.deposit(-1);
    }).toThrow();
  });

  it("Should throw error when passing a negative amount to withdraw", () => {
    const transactionRepository = new TransactionRepository();
    const logger = { log: vi.fn() };
    const printStatement = new StatementPrinter(logger, "es-ES");
    const account = new Account(transactionRepository, printStatement);

    expect(() => {
      account.withdraw(-1);
    }).toThrow();
  });
});
