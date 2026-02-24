import { describe, expect, it } from "vitest";
import { Rover, type Position } from "./rover.js";

describe("Rover", () => {
  it.each([
    { invalidPosition: "0:" },
    { invalidPosition: "0:0:" },
    {
      invalidPosition: "0:0:F",
    },
    {
      invalidPosition: "",
    },
    {
      invalidPosition: "-1:0:S",
    },
  ])(
    "Should throw error when pass $invalidPosition as position",
    ({ invalidPosition }) => {
      // @ts-expect-error
      expect(() => Rover.fromPosition(invalidPosition)).toThrowError(
        "Invalid position. coordinate must be a positive numbers and the orientation must be a valid cardinal point; N, S, E or W",
      );
    },
  );

  it.each<{
    initialPosition: Position;
    commands: string;
    newPosition: Position;
  }>([
    {
      initialPosition: "0:0:N",
      commands: "LFRFF",
      newPosition: "9:2:N",
    },
    {
      initialPosition: "8:3:E",
      commands: "FFFRFF",
      newPosition: "1:1:S",
    },
  ])(
    "Should navigate a rover from $initialPosition to $newPosition by following the commands $commands",
    ({ initialPosition, commands, newPosition }) => {
      const rover = Rover.fromPosition(initialPosition);

      rover.runCommands(commands);

      expect(rover.formattedPosition()).toBe(newPosition);
    },
  );
});
