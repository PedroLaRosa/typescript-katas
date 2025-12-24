# Fibonacci Sequence

## Description

Write a function that returns the nth number in the Fibonacci sequence.

The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, starting from 0 and 1.

**Sequence:** 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...

## Rules

- The sequence starts with F(0) = 0 and F(1) = 1
- For n ≥ 2: F(n) = F(n-1) + F(n-2)
- The input `n` will be a non-negative integer
- Return the value at position `n` in the sequence

## Examples

```
fibonacci(0) → 0
fibonacci(1) → 1
fibonacci(2) → 1
fibonacci(3) → 2
fibonacci(4) → 3
fibonacci(5) → 5
fibonacci(6) → 8
fibonacci(10) → 55
```

## Considerations

- Think about the performance implications of different approaches (recursive vs iterative)
- Consider edge cases like n = 0 or n = 1
- For large values of n, what would be the most efficient solution?
