import { it, expect, describe } from "vitest";

/**
 * Time Complexity: O(n)
 * - In the worst case (when n is prime), we iterate from 2 to n-1, checking each factor
 * - The while loop can run up to n-1 times in the worst case
 * - Although the algorithm resets factor to 2 after finding a prime factor, for large primes
 *   or numbers with large prime factors, it still needs to check many values
 *
 * Space Complexity: O(log n)
 * - The result array stores all prime factors of n
 * - The maximum number of prime factors is logarithmic to n (e.g., 2^k = n, so k = log₂(n))
 * - For example, n=1024 has 10 factors of 2 (since 2^10 = 1024)
 * - No additional space is used besides the output array and a few variables
 */
function getPrimeFactorOf(n: number): number[] {
  if (n < 0) {
    throw new Error("Negative number not allowed");
  }
  const result: number[] = [];
  if (n === 0) return result;

  let currentResult = n;
  let factor = 2;

  while (currentResult !== 1) {
    const remainder = currentResult / factor;
    if (Number.isInteger(remainder)) {
      result.push(factor);
      currentResult = remainder;
      factor = 2;
    } else {
      factor++;
    }
  }

  return result;
}

describe("Get the prime factor of a number using an iterative implementation", () => {
  it.each<{ input: number; expected: number[] }>([
    { input: 0, expected: [] },
    { input: 1, expected: [] },
    { input: 2, expected: [2] },
    { input: 2 * 2, expected: [2, 2] },
    { input: 2 * 2 * 2, expected: [2, 2, 2] },
    { input: 3, expected: [3] },
    { input: 3 * 3, expected: [3, 3] },
    { input: 3 * 2, expected: [2, 3] },
    { input: 5 * 5, expected: [5, 5] },
    { input: 5 * 7 * 11 * 3, expected: [3, 5, 7, 11] },
  ])("should return $expected when input is $input", ({ input, expected }) => {
    expect(getPrimeFactorOf(input)).toEqual(expected);
  });

  it("should throw an error for negative number", () => {
    expect(() => getPrimeFactorOf(-1)).toThrowError(
      "Negative number not allowed",
    );
  });
});
