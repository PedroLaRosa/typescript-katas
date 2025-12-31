import { beforeEach, describe, expect, it, vi } from "vitest";

interface Monitor {
  log(message: string): void;
}

interface StatementLine {
  date: number;
  amount: `+${string}` | `-${string}`;
  balance: number;
}

class Account {
  #statement: StatementLine[] = [];
  #monitor: Monitor;

  constructor(monitor: Monitor) {
    this.#monitor = monitor;
  }

  #addStatement(
    amount: StatementLine["amount"],
    balance: StatementLine["balance"],
  ) {
    this.#statement = [
      ...this.#statement,
      { date: Date.now(), amount, balance },
    ];
  }

  #formatDate(date: number) {
    return new Intl.DateTimeFormat("es-ES").format(new Date(date));
  }

  #formatDecimal(amount: number) {
    const decimalFormat = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2, // Ensure at least two decimal places
      maximumFractionDigits: 2, // Ensure no more than two decimal places
    });

    return decimalFormat.format(amount);
  }

  deposit(amount: number) {
    const currentStatement = this.#statement.at(-1);
    const newBalance = !currentStatement
      ? amount
      : currentStatement.balance + amount;
    this.#addStatement(`+${this.#formatDecimal(amount)}`, newBalance);
  }

  withdraw(amount: number) {
    const currentStatement = this.#statement.at(-1);
    const newBalance = !currentStatement
      ? amount
      : currentStatement.balance - amount;

    this.#addStatement(`-${this.#formatDecimal(amount)}`, newBalance);
  }
  #statementHeader = `Date   | Amount  | Balance\n`;

  printStatement() {
    const statement = this.#statement.toReversed().map((line) => ({
      ...line,
      date: this.#formatDate(line.date),
    }));
    let statementText = this.#statementHeader;

    statement.forEach((line) => {
      statementText += `${line.date} | ${line.amount} | ${this.#formatDecimal(line.balance)}\n`;
    });

    this.#monitor.log(statementText);
  }
}

class Bank {
  #monitor: Monitor;
  #accounts = new Map<string, Account>();
  private constructor(monitor: Monitor) {
    this.#monitor = monitor;
  }
  static create(monitor: Monitor) {
    return new Bank(monitor);
  }

  #hasAccount(accountId: string) {
    return this.#accounts.has(accountId);
  }

  createAccount(accountId: string) {
    if (this.#hasAccount(accountId)) {
      this.#monitor.log("Account already exists");
      return;
    }
    this.#accounts.set(accountId, new Account(this.#monitor));
    this.#monitor.log(`Account created with id ${accountId}`);
  }

  #assertHasAccount(account: Account | undefined): asserts account is Account {
    if (!account) {
      throw new Error("Every account id must have an account associated");
    }
  }

  depositTo(accountId: string, amount: number) {
    if (!this.#hasAccount(accountId)) {
      return this.#monitor.log(`Account doesn't exist with id ${accountId}`);
    }

    const account = this.#accounts.get(accountId);
    this.#assertHasAccount(account);

    account.deposit(amount);
    this.#monitor.log(
      `${amount}€ were deposited to account with id ${accountId}`,
    );
  }

  withdrawFrom(accountId: string, amount: number) {
    if (!this.#hasAccount(accountId)) {
      return this.#monitor.log(`Account doesn't exist with id ${accountId}`);
    }

    const account = this.#accounts.get(accountId);
    this.#assertHasAccount(account);

    account.withdraw(amount);
    this.#monitor.log(
      `${amount}€ were withdrawn from account with id ${accountId}`,
    );
  }
  printStatementFor(accountId: string) {
    if (!this.#hasAccount(accountId)) {
      return this.#monitor.log(`Account doesn't exist with id ${accountId}`);
    }

    const account = this.#accounts.get(accountId);
    this.#assertHasAccount(account);

    account.printStatement();
  }
}

describe("Banking Kata", () => {
  beforeEach(() => {
    // Enable fake timers
    vi.useFakeTimers();

    // Set the system time to a specific date (e.g., June 1st, 2024)
    const frozenDate = new Date("2025-12-30T00:00:00.000Z");
    vi.setSystemTime(frozenDate);
  });

  it("should create a new account and avoid creating it again", () => {
    const monitor = { log: vi.fn() };
    const bank = Bank.create(monitor);

    bank.createAccount("1");

    expect(monitor.log).toHaveBeenLastCalledWith("Account created with id 1");

    bank.createAccount("1");

    expect(monitor.log).toHaveBeenLastCalledWith("Account already exists");
  });

  it("should deposit 300 to the account", () => {
    const monitor = { log: vi.fn() };
    const bank = Bank.create(monitor);

    bank.createAccount("1");
    bank.depositTo("1", 300);

    expect(monitor.log).toHaveBeenLastCalledWith(
      "300€ were deposited to account with id 1",
    );
  });

  it("should not allow depositing to an account that doesn't exist", () => {
    const monitor = { log: vi.fn() };
    const bank = Bank.create(monitor);

    bank.depositTo("1", 300);

    expect(monitor.log).toHaveBeenLastCalledWith(
      "Account doesn't exist with id 1",
    );
  });

  it("should withdraw 300 from the account", () => {
    const monitor = { log: vi.fn() };
    const bank = Bank.create(monitor);

    bank.createAccount("1");
    bank.withdrawFrom("1", 300);

    expect(monitor.log).toHaveBeenLastCalledWith(
      "300€ were withdrawn from account with id 1",
    );
  });

  it("should show total statement for the account", () => {
    const monitor = { log: vi.fn() };
    const bank = Bank.create(monitor);

    bank.createAccount("1");

    vi.setSystemTime(new Date("2025-12-24T00:00:00.000Z"));
    bank.depositTo("1", 500);

    vi.setSystemTime(new Date("2025-12-28T00:00:00.000Z"));
    bank.withdrawFrom("1", 150);

    vi.setSystemTime(new Date("2025-12-30T00:00:00.000Z"));
    bank.depositTo("1", 1000);

    bank.printStatementFor("1");

    expect(monitor.log).toHaveBeenLastCalledWith(
      [
        "Date   | Amount  | Balance\n",
        "30/12/2025 | +1,000.00 | 1,350.00\n",
        "28/12/2025 | -150.00 | 350.00\n",
        "24/12/2025 | +500.00 | 500.00\n",
      ].join(""),
    );
  });
});
