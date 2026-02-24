import { describe, expect, it } from "vitest";
import {
  NavigatorFacingEast,
  NavigatorFacingNorth,
  NavigatorFacingSouth,
  NavigatorFacingWest,
  type Navigator,
} from "./navigator.js";
import { Coordinate } from "./coordinate.js";

type Orientation = "N" | "S" | "E" | "W";
type Position = `${number}:${number}:${Orientation}`;

class Rover {
  private constructor(private navigator: Navigator) {}

  static fromPosition(position: Position) {
    const { latitude, longitude, orientation } = Rover.parsePosition(position);

    const coordinate = Coordinate.create(latitude, longitude);
    const navigator = Rover.navigatorBasedOnOrientation(
      orientation,
      coordinate,
    );

    return new Rover(navigator);
  }

  runCommands(commands: string) {
    commands.split("").forEach((command) => {
      if (command === "L") {
        this.navigator = this.navigator.left();
        return;
      }
      if (command === "R") {
        this.navigator = this.navigator.right();
        return;
      }
      this.navigator = this.navigator.forward();
    });
  }

  formattedPosition() {
    return this.navigator.formattedPosition();
  }

  private static parsePosition(position: Position) {
    const [rawLatitude, rawLongitude, rawOrientation] = position.split(":");
    const latitude = Number(rawLatitude);
    const longitude = Number(rawLongitude);
    const orientation = rawOrientation ?? "";
    const isLongitudeValid = !isNaN(longitude) && longitude >= 0;
    const isLatitudeValid = !isNaN(latitude) && latitude >= 0;
    const isPositionValid =
      isLatitudeValid &&
      isLongitudeValid &&
      Rover.isOrientationValid(orientation);
    if (!isPositionValid) {
      throw new Error(
        "Invalid position. coordinate must be a positive numbers and the orientation must be a valid cardinal point; N, S, E or W",
      );
    }
    return { latitude, longitude, orientation };
  }

  private static navigatorBasedOnOrientation(
    orientation: string,
    coordinate: Coordinate,
  ) {
    Rover.assertOrientationIsValid(orientation);
    if (orientation === "N") return new NavigatorFacingNorth(coordinate);
    if (orientation === "S") return new NavigatorFacingSouth(coordinate);
    if (orientation === "E") return new NavigatorFacingEast(coordinate);
    if (orientation === "W") return new NavigatorFacingWest(coordinate);

    throw new Error("Invalid orientation");
  }

  private static assertOrientationIsValid(
    orientation: string,
  ): asserts orientation is Orientation {
    if (!Rover.isOrientationValid(orientation)) {
      throw new Error("Invalid orientation");
    }
  }

  private static isOrientationValid(
    orientation: string,
  ): orientation is Orientation {
    if (["N", "S", "E", "W"].includes(orientation)) {
      return true;
    }
    return false;
  }
}

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
