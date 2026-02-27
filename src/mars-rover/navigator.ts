import { Coordinate } from "./coordinate.js";

/*
 * Navigator can be exclusively one of the following types
 * Since there are only 4 options, we can use a union type to represent them instead of an interface
 *The intention is to keep the type closed to only the possible options
 * */
type Navigator =
  | NavigatorFacingNorth
  | NavigatorFacingSouth
  | NavigatorFacingEast
  | NavigatorFacingWest;

class NavigatorFacingNorth {
  constructor(private readonly coordinate: Coordinate) {}

  currentPosition(): Coordinate {
    const { latitude, longitude } = this.coordinate;
    return Coordinate.create(latitude, longitude);
  }

  formattedPosition() {
    return `${this.coordinate.toString()}:N`;
  }

  left() {
    return new NavigatorFacingWest(this.coordinate);
  }

  right() {
    return new NavigatorFacingEast(this.coordinate);
  }

  forward() {
    return new NavigatorFacingNorth(this.coordinate.increaseLongitude());
  }
}

class NavigatorFacingWest {
  constructor(private readonly coordinate: Coordinate) {}

  currentPosition(): Coordinate {
    const { latitude, longitude } = this.coordinate;
    return Coordinate.create(latitude, longitude);
  }

  formattedPosition() {
    return `${this.coordinate.toString()}:W`;
  }

  left() {
    return new NavigatorFacingSouth(this.coordinate);
  }

  right() {
    return new NavigatorFacingNorth(this.coordinate);
  }

  forward() {
    return new NavigatorFacingWest(this.coordinate.decreaseLatitude());
  }
}

class NavigatorFacingEast {
  constructor(private readonly coordinate: Coordinate) {}

  currentPosition(): Coordinate {
    const { latitude, longitude } = this.coordinate;
    return Coordinate.create(latitude, longitude);
  }

  formattedPosition() {
    return `${this.coordinate.toString()}:E`;
  }

  left() {
    return new NavigatorFacingNorth(this.coordinate);
  }

  right() {
    return new NavigatorFacingSouth(this.coordinate);
  }

  forward() {
    return new NavigatorFacingEast(this.coordinate.increaseLatitude());
  }
}

class NavigatorFacingSouth {
  constructor(private readonly coordinate: Coordinate) {}

  currentPosition(): Coordinate {
    const { latitude, longitude } = this.coordinate;
    return Coordinate.create(latitude, longitude);
  }

  formattedPosition() {
    return `${this.coordinate.toString()}:S`;
  }

  left() {
    return new NavigatorFacingEast(this.coordinate);
  }

  right() {
    return new NavigatorFacingWest(this.coordinate);
  }

  forward() {
    return new NavigatorFacingSouth(this.coordinate.decreaseLongitude());
  }
}

export {
  NavigatorFacingNorth,
  NavigatorFacingSouth,
  NavigatorFacingEast,
  NavigatorFacingWest,
  type Navigator,
};
