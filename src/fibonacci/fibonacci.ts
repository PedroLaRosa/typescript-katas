function fibonacci(n: number): number {
  if (n < 0) {
    throw new Error("Negative number not allowed");
  }
  if (n === 1) return 1;
  if (n === 0) return 0;
  return fibonacci(n - 2) + fibonacci(n - 1);
}

export { fibonacci };
