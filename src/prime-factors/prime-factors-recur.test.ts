import { it, expect, describe } from "vitest";

/**
 * Time Complexity: O(n)
 * - For each recursive call, the while loop searches for the smallest factor starting from 2
 * - In the worst case (when n is prime), the while loop runs n-2 times
 * - The recursion depth is O(log n) (number of prime factors), but each level can take O(n) time
 * - Overall: O(n) for the factor search dominates the complexity
 *
 * Space Complexity: O(log n)
 * - The recursion call stack depth is O(log n) (equal to the number of prime factors)
 * - Each recursive call creates a new array with concat(), adding O(log n) space
 * - The result array itself also takes O(log n) space
 * - Total: O(log n) for call stack + O(log n) for arrays = O(log n)
 */
function getPrimeFactorOf(n: number): readonly number[] {
  assertNumberIsPositive(n);

  return getPrimeFactor(n);
}

function assertNumberIsPositive(n: number) {
  if (n < 1) throw new Error("Negative number or zero is not allowed");
}

function getPrimeFactor(n: number): readonly number[] {
  const prime = findSmallestPrime(n);

  const reminder = n / prime;

  return reminder <= 1 ? [prime] : [prime].concat(getPrimeFactorOf(reminder));
}

function findSmallestPrime(n: number) {
  if (n === 1) return 1;
  let factor = 2;
  while (n % factor !== 0) {
    factor = factor + 1;
  }
  return factor;
}

describe("Get the prime factor of a number using a recursive implementation", () => {
  it.each<{ input: number; expected: number[] }>([
    { input: 1, expected: [1] },
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
      "Negative number or zero is not allowed",
    );
    expect(() => getPrimeFactorOf(0)).toThrowError(
      "Negative number or zero is not allowed",
    );
  });
});
