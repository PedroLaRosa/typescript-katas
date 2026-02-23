import { Coordinate } from "./coordinate.js";

interface Navigator {
  forward(): Navigator;
  left(): Navigator;
  right(): Navigator;
  currentPosition(): Coordinate;
  formattedLocation(): string;
}

class NavigatorFacingSouth implements Navigator {
  constructor(private coordinate: Coordinate) {}

  currentPosition(): Coordinate {
    return this.coordinate;
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

  formattedLocation(): string {
    return `${this.coordinate.toString()}:S`;
  }
}

class NavigatorFacingEast implements Navigator {
  constructor(private coordinate: Coordinate) {}

  currentPosition(): Coordinate {
    return this.coordinate;
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

  formattedLocation(): string {
    return `${this.coordinate.toString()}:E`;
  }
}

class NavigatorFacingWest implements Navigator {
  constructor(private coordinate: Coordinate) {}

  currentPosition(): Coordinate {
    return this.coordinate;
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

  formattedLocation(): string {
    return `${this.coordinate.toString()}:W`;
  }
}

class NavigatorFacingNorth implements Navigator {
  constructor(private coordinate: Coordinate) {}

  currentPosition(): Coordinate {
    return this.coordinate;
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

  formattedLocation(): string {
    return `${this.coordinate.toString()}:N`;
  }
}

export {
  NavigatorFacingSouth,
  NavigatorFacingEast,
  NavigatorFacingWest,
  NavigatorFacingNorth,
};
export type { Navigator };
