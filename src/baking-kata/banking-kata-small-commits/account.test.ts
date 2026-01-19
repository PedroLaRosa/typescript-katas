import { describe, expect, it } from "vitest";

class Account {
  deposit(amount: number) {
    // TODO: Pending to implement
  }

  withdraw(amount: number) {
    // TODO: Pending to implement
  }

  printStatement() {
    // TODO: Pending to implement
  }
}

describe("Testing Account class", () => {
  it("should add a deposit", () => {
    const account = new Account();

    account.deposit(500);

    account.printStatement();

    expect(console.log).toHaveBeenLastCalledWith(
      ["Date | Amount | Balance", "19/01/2025 | +500 | 500"].join("\n"),
    );
  });
});
