# Prime Factors Kata

## Description

Write a function that computes the prime factorization of a given positive integer.

The prime factorization of a number is the list of prime numbers which, when multiplied together, equal that number.

## Requirements

- The function should accept a positive integer as input
- It should return an array/list of prime numbers
- If a prime factor appears multiple times, it should be repeated in the array

## Examples

- `primeFactors(1)` → `[]`
- `primeFactors(2)` → `[2]`
- `primeFactors(3)` → `[3]`
- `primeFactors(4)` → `[2, 2]`
- `primeFactors(6)` → `[2, 3]`
- `primeFactors(8)` → `[2, 2, 2]`
- `primeFactors(9)` → `[3, 3]`
- `primeFactors(12)` → `[2, 2, 3]`
- `primeFactors(15)` → `[3, 5]`
- `primeFactors(2 * 2 * 3 * 5 * 7 * 11 * 13)` → `[2, 2, 3, 5, 7, 11, 13]`

## Notes

This is a classic TDD exercise. Start with the simplest test case and work your way up, letting the tests drive your implementation.
