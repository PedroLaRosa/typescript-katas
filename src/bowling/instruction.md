# Bowling Kata

## Description

Write a function that returns the nth number in the Fibonacci sequence.

The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, starting from 0 and 1.

**Sequence:** 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...

## Rules

- The sequence starts with F(0) = 0 and F(1) = 1
- For n ≥ 2: F(n) = F(n-1) + F(n-2)
- The input `n` will be a non-negative integer
- Return the value at position `n` in the sequence

###  examples

```
"-- -- -- -- -- -- -- -- -- --" -> (20 shots: 20 misses) = 0 Points -> Open frame.

"11 11 11 11 11 11 11 11 11 11" -> (20 shots, 10 pairs of 1s) = 20 Points -> Spare.

"5/ 5- -- -- -- -- -- -- -- --" -> (20 shots, 1 spare, 1 hit, 17 misses) = 10 + 5 + 5 = 20 Points

"X 23 -- -- -- -- -- -- -- --" -> (19 shots, 1 strike, 2 hits (2 and 3), 16 misses) =  10 + 2 + 3 + 2 + 3 = 20 Points

"X X X X X X X X X X X X" -> (12 shots, 12 strikes) = 10 turns * 30 points = 300 Points

"5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/" -> (21 shots, 12 pairs of 5s and spares, and final 5) = 10 turns * 15 points = 150 Points

"8/ 8/ 8/ 8/ 8/ 8/ 8/ 8/ 8/ 8/8" -> (21 shots: 10 Spares of 8-2 with a final 8) = 10 turns * 18 points = 180 Points

```

### Legend

```
Strike (X)
  - Knocking down all pines in he first try
  - Sum 10 points + pines knocked down in the following shots

/ = Spare
  - Knock down all pines in two tries.
  - Sum 10 points + pines knocked down in the next shot


- = Open frame (Miss)
  - Not knock down any pins in two tries
  - Sum pines knocked down in that turn

Tenth turn
  - Player with spare or strike has additional shots
  - Max 3 shots in that turn

```
