import { describe, expect, it } from "vitest";
import { Rover, Command, type CardinalPoint } from "./rover.js";

const testCases = [
  {
    initialLocation: "0:0:N" as const,
    commands: [Command.Left],
    expected: "0:0:W" as const,
  },
  {
    initialLocation: "0:0:N" as const,
    commands: [Command.Right],
    expected: "0:0:E" as const,
  },
  {
    initialLocation: "0:0:N" as const,
    commands: [Command.Forward],
    expected: "0:1:N" as const,
  },
  {
    initialLocation: "0:0:N" as const,
    commands: [Command.Left, Command.Forward],
    expected: "9:0:W" as const,
  },
  {
    initialLocation: "5:9:E" as const,
    commands: [
      Command.Left,
      Command.Forward,
      Command.Forward,
      Command.Left,
      Command.Forward,
      Command.Left,
      Command.Forward,
    ],
    expected: "4:0:S" as const,
  },
];

describe("The mars rover", () => {
  it.each(testCases)(
    "should run commands",
    ({ initialLocation, commands, expected }) => {
      const rover = Rover.fromFormattedLocation(initialLocation);

      rover.runCommands(commands);

      expect(rover.formattedLocation()).toBe(expected);
    },
  );
});
