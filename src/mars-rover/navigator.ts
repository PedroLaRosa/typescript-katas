import { Coordinate } from "./coordinate.js";

interface Navigator {
  left(): Navigator;
  right(): Navigator;
  forward(): Navigator;
  currentPosition(): Coordinate;
  formattedPosition(): string;
}

class NavigatorFacingNorth implements Navigator {
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

class NavigatorFacingWest implements Navigator {
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

class NavigatorFacingEast implements Navigator {
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

class NavigatorFacingSouth implements Navigator {
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
