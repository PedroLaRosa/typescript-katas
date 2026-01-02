import { describe, expect, it, vi } from "vitest";
import { TransationRepository } from "./transaction-repository.js";
import { Account } from "./account.js";

describe("Testing account class", () => {
  it("Should print statement", () => {
    vi.useFakeTimers();

    const transationRepository = new TransationRepository();
    // Tip: You can use any logger to record the statement.
    // It's also possible to spy on the console.log method with vi.spyOn.
    // However, this does not replace the original function implementation.
    // While it works effectively, it can clutter the test messages.
    const logger = { log: vi.fn() };
    const account = new Account(transationRepository, logger);

    vi.setSystemTime(new Date("2025-08-24T00:00:00.00Z"));
    account.deposit(500);

    vi.setSystemTime(new Date("2025-10-15T00:00:00.00Z"));
    account.withdraw(600);
    account.deposit(600);

    vi.setSystemTime(new Date("2025-12-03T00:00:00.00Z"));
    account.deposit(500);

    account.printStatement();

    expect(logger.log).toHaveBeenLastCalledWith(
      "Date | Amount | Balance\n" +
        "03/12/2025 | +500,00 | 1000,00\n" +
        "15/10/2025 | +600,00 | 500,00\n" +
        "15/10/2025 | -600,00 | -100,00\n" +
        "24/08/2025 | +500,00 | 500,00\n",
    );
  });
});
