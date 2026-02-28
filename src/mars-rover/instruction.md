# Mars Rover Kata

## Description

You receive the initial starting position and orientation of a rover deployed on a 10x10 grid planet, and a list of commands to execute. Implement movement and turning logic, and return the rover's final position.

The grid wraps around: moving off one edge brings the rover out the opposite edge.

## Input

- **Position**: a string in the format `latitude:longitude:orientation`
  - `latitude` and `longitude` are non-negative integers (0–9)
  - `orientation` is one of `N`, `S`, `E`, `W`
- **Commands**: a string of characters, case-insensitive
  - `F` — move forward one step
  - `L` — turn left (90°)
  - `R` — turn right (90°)

## Output

The rover's final position as a string in the format `latitude:longitude:orientation`.

## Rules

- The grid is 10x10 and wraps around on all edges
- Commands are case-insensitive (`f` = `F`, `l` = `L`, `r` = `R`)
- An invalid position or orientation must throw an error
- An invalid command must throw an error

## Orientation and Movement

| Facing | Forward moves    | Left turns to | Right turns to |
|--------|-----------------|---------------|----------------|
| N      | longitude + 1   | W             | E              |
| S      | longitude - 1   | E             | W              |
| E      | latitude + 1    | N             | S              |
| W      | latitude - 1    | S             | N              |

## Examples

```
"0:0:N" + "LFRFF" -> "9:2:N"
"8:3:E" + "FFFRFF" -> "1:1:S"
"8:3:E" + "FFfrFf" -> "1:1:S"  (commands are case-insensitive)
```
