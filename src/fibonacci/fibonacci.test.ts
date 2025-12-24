import { expect, it } from "vitest";
import { fibonacci } from "./fibonacci.js";

it.each<{ input: number; expected: number }>([
  { input: 0, expected: 0 },
  { input: 1, expected: 1 },
  { input: 2, expected: fibonacci(1) + fibonacci(0) },
  { input: 3, expected: fibonacci(2) + fibonacci(1) },
  { input: 4, expected: fibonacci(3) + fibonacci(2) },
  { input: 5, expected: fibonacci(4) + fibonacci(3) },
  { input: 6, expected: fibonacci(5) + fibonacci(4) },
  { input: 33, expected: fibonacci(32) + fibonacci(31) },
])("should return $expected when input is $input", ({ input, expected }) => {
  expect(fibonacci(input)).toBe(expected);
});
