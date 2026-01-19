import { describe, expect, it, vi } from "vitest";

class Transaction {
  private constructor(
    public timestamp: number,
    public amount: number,
    public totalSnapshot: number,
  ) {}

  static create(amount: number, totalSnapshot: number) {
    return new Transaction(Date.now(), amount, totalSnapshot);
  }
}

class Account {
  header = "Date | Amount | Balance";
  transactions: Transaction[] = [];
  deposit(amount: number) {
    const lastTransaction = this.transactions.at(-1);
    this.transactions.push(
      Transaction.create(
        amount,
        (lastTransaction?.totalSnapshot ?? 0) + amount,
      ),
    );
  }

  withdraw(amount: number) {
    const lastTransaction = this.transactions.at(-1);
    this.transactions.push(
      Transaction.create(
        amount * -1,
        (lastTransaction?.totalSnapshot ?? 0) + amount * -1,
      ),
    );
  }

  #formatDate(timestamp: number) {
    const dateTimeOptions = {
      year: "numeric",
      day: "2-digit",
      month: "2-digit",
    } as const;

    return new Intl.DateTimeFormat("es-ES", dateTimeOptions).format(
      new Date(timestamp),
    );
  }

  #formatDecimal(
    amount: number,
    options: { hasPositiveSign: boolean } = { hasPositiveSign: false },
  ) {
    const numberOptions = {
      minimumFractionDigits: 0, // Ensure at least two decimal places
      maximumFractionDigits: 2, // Ensure no more than two decimal places
      signDisplay: options.hasPositiveSign ? "always" : "negative",
    } as const;

    const decimalFormat = new Intl.NumberFormat("es-ES", numberOptions);

    return decimalFormat.format(amount);
  }

  printStatement() {
    const formattedStatement = this.transactions
      .map(
        (t) =>
          `${this.#formatDate(t.timestamp)} | ${this.#formatDecimal(t.amount, { hasPositiveSign: true })} | ${this.#formatDecimal(t.totalSnapshot)}`,
      )
      .toReversed();

    console.log([this.header, ...formattedStatement].join("\n"));
  }
}

describe("Testing Account class", () => {
  it("should add a deposit", () => {
    vi.useFakeTimers();
    vi.spyOn(console, "log");
    const account = new Account();

    vi.setSystemTime(new Date("2026-01-19T00:00:00.00Z"));
    account.deposit(500);

    vi.setSystemTime(new Date("2026-01-20T00:00:00.00Z"));
    account.deposit(700);

    account.printStatement();

    expect(console.log).toHaveBeenLastCalledWith(
      [
        "Date | Amount | Balance",
        "20/01/2026 | +700 | 1200",
        "19/01/2026 | +500 | 500",
      ].join("\n"),
    );
  });

  it("should add withdrawal", () => {
    vi.useFakeTimers();
    vi.spyOn(console, "log");
    const account = new Account();

    vi.setSystemTime(new Date("2026-01-19T00:00:00.00Z"));
    account.withdraw(200);

    vi.setSystemTime(new Date("2026-01-20T00:00:00.00Z"));
    account.withdraw(600);

    account.printStatement();

    expect(console.log).toHaveBeenLastCalledWith(
      [
        "Date | Amount | Balance",
        "20/01/2026 | -600 | -800",
        "19/01/2026 | -200 | -200",
      ].join("\n"),
    );
  });

  it("should print a mix of withdrawal and deposit", () => {
    vi.useFakeTimers();
    vi.spyOn(console, "log");
    const account = new Account();

    vi.setSystemTime(new Date("2026-01-19T00:00:00.00Z"));
    account.deposit(300);

    vi.setSystemTime(new Date("2026-01-20T00:00:00.00Z"));
    account.withdraw(600);

    vi.setSystemTime(new Date("2026-01-21T00:00:00.00Z"));
    account.deposit(1100);

    account.printStatement();

    expect(console.log).toHaveBeenLastCalledWith(
      [
        "Date | Amount | Balance",
        "21/01/2026 | +1100 | 800",
        "20/01/2026 | -600 | -300",
        "19/01/2026 | +300 | 300",
      ].join("\n"),
    );
  });
});
