import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { StatementPrinter } from "./statement-printer.js";
import { Transaction } from "./transaction.js";
import type { Logger } from "./types.js";

describe("StatementPrinter", () => {
  let logger: Logger;
  let printer: StatementPrinter;

  beforeEach(() => {
    logger = { log: vi.fn() };
    printer = new StatementPrinter(logger, "es-ES");
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should print only the header when there are no transactions", () => {
    printer.print([]);

    expect(logger.log).toHaveBeenCalledWith("Date | Amount | Balance\n");
  });

  it("should print a single transaction correctly", () => {
    const date = new Date("2023-01-10T00:00:00.000Z");
    vi.setSystemTime(date);
    
    const transaction = Transaction.create({ amount: 1000, balance: 1000 });
    
    printer.print([transaction]);

    // 10/01/2023 for es-ES
    const expectedOutput = 
      "Date | Amount | Balance\n" +
      "10/01/2023 | +1000,00 | 1000,00\n";
    
    expect(logger.log).toHaveBeenCalledWith(expectedOutput);
  });

  it("should print transactions in reverse chronological order", () => {
    vi.setSystemTime(new Date("2023-01-10T00:00:00.000Z"));
    const t1 = Transaction.create({ amount: 1000, balance: 1000 });

    vi.setSystemTime(new Date("2023-01-11T00:00:00.000Z"));
    const t2 = Transaction.create({ amount: -500, balance: 500 });

    vi.setSystemTime(new Date("2023-01-12T00:00:00.000Z"));
    const t3 = Transaction.create({ amount: 200, balance: 700 });

    printer.print([t1, t2, t3]);

    const expectedOutput = 
      "Date | Amount | Balance\n" +
      "12/01/2023 | +200,00 | 700,00\n" +
      "11/01/2023 | -500,00 | 500,00\n" +
      "10/01/2023 | +1000,00 | 1000,00\n";

    expect(logger.log).toHaveBeenCalledWith(expectedOutput);
  });

  it("should format dates and amounts according to the provided locale", () => {
    // Re-instantiate with en-US
    printer = new StatementPrinter(logger, "en-US");

    vi.setSystemTime(new Date("2023-01-10T00:00:00.000Z"));
    const transaction = Transaction.create({ amount: 1000.50, balance: 1000.50 });
    
    printer.print([transaction]);

    // en-US: MM/DD/YYYY, decimal point .
    // Note: The implementation forces year: 'numeric', day: '2-digit', month: '2-digit'
    // For en-US it usually outputs 01/10/2023
    
    const expectedOutput = 
      "Date | Amount | Balance\n" +
      "01/10/2023 | +1,000.50 | 1,000.50\n";
    
    expect(logger.log).toHaveBeenCalledWith(expectedOutput);
  });
});
