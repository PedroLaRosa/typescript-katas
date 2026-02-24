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

class Rover {
  private constructor(private navigator: Navigator) {}

  static fromPosition(position: `${number}:${number}:${Orientation}`) {
    const parsedPosition = position.split(":");
    const latitude = Number(parsedPosition[0]);
    const longitude = Number(parsedPosition[1]);
    const orientation = parsedPosition[2];

    if (orientation === undefined) {
      throw new Error("Invalid position");
    }

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
    if (!["N", "S", "E", "W"].includes(orientation)) {
      throw new Error("Invalid orientation");
    }
  }
}

describe("Rover", () => {
  it("Should create with initial position", () => {
    const rover = Rover.fromPosition("0:0:N");

    rover.runCommands("LFRFF");

    expect(rover.formattedPosition()).toBe("9:2:N");
  });
});
