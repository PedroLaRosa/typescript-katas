import { Coordinate } from "./coordinate.js";
import {
  NavigatorFacingEast,
  NavigatorFacingNorth,
  NavigatorFacingSouth,
  NavigatorFacingWest,
  type Navigator,
} from "./navigator.js";

type CardinalPoint = "N" | "S" | "E" | "W";

const Command = {
  Left: "Left",
  Right: "Right",
  Forward: "Forward",
};
type Command = keyof typeof Command;

class Rover {
  private constructor(private navigator: Navigator) {}

  static fromFormattedLocation(
    formattedLocation: `${number}:${number}:${CardinalPoint}`,
  ) {
    const [latitudeInString, longitudeInString, cardinalPoint] =
      formattedLocation.split(":");
    if (
      latitudeInString === undefined ||
      longitudeInString === undefined ||
      cardinalPoint === undefined
    ) {
      throw new Error("Invalid format");
    }
    const isValidCardinalPoint = ["N", "S", "E", "W"].includes(cardinalPoint);

    const latitude = Number(latitudeInString);
    const longitude = Number(longitudeInString);

    if (latitude < 0 || longitude < 0 || !isValidCardinalPoint) {
      throw new Error("Invalid format");
    }

    const coordinate = Coordinate.create(latitude, longitude);
    const navigator = Rover.navigatorFactory(
      cardinalPoint as CardinalPoint,
      coordinate,
    );
    return new Rover(navigator);
  }

  runCommands(commands: Command[]) {
    commands.forEach((command) => {
      this.runSingleCommand(command);
    });
  }

  private runSingleCommand(command: Command) {
    const commandMap = {
      [Command.Forward]: "forward" as const,
      [Command.Left]: "left" as const,
      [Command.Right]: "right" as const,
    };

    if (commandMap[command] === undefined) {
      throw new Error("Invalid command");
    }

    this.navigator = this.navigator[commandMap[command]]();
  }

  formattedLocation() {
    return this.navigator.formattedLocation();
  }

  private static navigatorFactory(
    cardinaPoint: CardinalPoint,
    coordinate: Coordinate,
  ) {
    if (cardinaPoint === "N") return new NavigatorFacingNorth(coordinate);
    if (cardinaPoint === "S") return new NavigatorFacingSouth(coordinate);
    if (cardinaPoint === "E") return new NavigatorFacingEast(coordinate);
    if (cardinaPoint === "W") return new NavigatorFacingWest(coordinate);

    throw new Error("Invalid cardinal point");
  }
}

export { Rover, Command, type CardinalPoint };
