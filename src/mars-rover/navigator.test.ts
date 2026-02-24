import { describe, expect, it } from "vitest";
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

describe("Navigator", () => {
  describe("NavigatorFacingNorth", () => {
    it("Should get the current position", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingNorth(coordinate);

      expect(navigator.currentPosition()).toEqual(Coordinate.create(1, 2));
    });

    it("Shouldt get the formatted position", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingNorth(coordinate);

      expect(navigator.formattedPosition()).toBe("1:2:N");
    });

    it("Should have west to its left", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingNorth(coordinate);

      const nextNavigator = navigator.left();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingWest);
      expect(nextNavigator.formattedPosition()).toBe("1:2:W");
    });

    it("Should have east to its right", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingNorth(coordinate);

      const nextNavigator = navigator.right();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingEast);
      expect(nextNavigator.formattedPosition()).toBe("1:2:E");
    });

    it("Should go north when moving forward", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingNorth(coordinate);

      const nextNavigator = navigator.forward();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingNorth);
      expect(nextNavigator.formattedPosition()).toBe("1:3:N");
    });
  });

  describe("NavigatorFacingWest", () => {
    it("Should get the current position", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingWest(coordinate);

      expect(navigator.currentPosition()).toEqual(Coordinate.create(1, 2));
    });

    it("Should get the formatted position", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingWest(coordinate);

      expect(navigator.formattedPosition()).toBe("1:2:W");
    });

    it("Should have south to its left", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingWest(coordinate);

      const nextNavigator = navigator.left();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingSouth);
      expect(nextNavigator.formattedPosition()).toBe("1:2:S");
    });

    it("Should have north to its right", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingWest(coordinate);

      const nextNavigator = navigator.right();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingNorth);
      expect(nextNavigator.formattedPosition()).toBe("1:2:N");
    });

    it("Should go west when moving forward", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingWest(coordinate);

      const nextNavigator = navigator.forward();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingWest);
      expect(nextNavigator.formattedPosition()).toBe("0:2:W");
    });
  });

  describe("NavigatorFacingEast", () => {
    it("Should get the current position", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingEast(coordinate);

      expect(navigator.currentPosition()).toEqual(Coordinate.create(1, 2));
    });

    it("Should get the formatted position", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingEast(coordinate);

      expect(navigator.formattedPosition()).toBe("1:2:E");
    });

    it("Should have north to its left", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingEast(coordinate);

      const nextNavigator = navigator.left();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingNorth);
      expect(nextNavigator.formattedPosition()).toBe("1:2:N");
    });

    it("Should have south to its right", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingEast(coordinate);

      const nextNavigator = navigator.right();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingSouth);
      expect(nextNavigator.formattedPosition()).toBe("1:2:S");
    });

    it("Should go east when moving forward", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingEast(coordinate);

      const nextNavigator = navigator.forward();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingEast);
      expect(nextNavigator.formattedPosition()).toBe("2:2:E");
    });
  });

  describe("NavigatorFacingSouth", () => {
    it("Should get the current position", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingSouth(coordinate);

      expect(navigator.currentPosition()).toEqual(Coordinate.create(1, 2));
    });

    it("Should get the formatted position", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingSouth(coordinate);

      expect(navigator.formattedPosition()).toBe("1:2:S");
    });

    it("Should have east to its left", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingSouth(coordinate);

      const nextNavigator = navigator.left();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingEast);
      expect(nextNavigator.formattedPosition()).toBe("1:2:E");
    });

    it("Should have west to its right", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingSouth(coordinate);

      const nextNavigator = navigator.right();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingWest);
      expect(nextNavigator.formattedPosition()).toBe("1:2:W");
    });

    it("Should go south when moving forward", () => {
      const coordinate = Coordinate.create(1, 2);
      const navigator = new NavigatorFacingSouth(coordinate);

      const nextNavigator = navigator.forward();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingSouth);
      expect(nextNavigator.formattedPosition()).toBe("1:1:S");
    });
  });
});
