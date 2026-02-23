import { describe, expect, it } from "vitest";
import { Coordinate } from "./coordinate.js";

type CardinalPoints = "N" | "S" | "E" | "W";

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

describe("Testing the navigator", () => {
  describe("Testing the navigator facing north", () => {
    it("Should display the current position", () => {
      const navigatorFacingNorth = new NavigatorFacingNorth(
        Coordinate.create(0, 0),
      );

      expect(navigatorFacingNorth.currentPosition()).toEqual(
        Coordinate.create(0, 0),
      );
    });

    it("Should have west to the left", () => {
      const navigatorFacingNorth = new NavigatorFacingNorth(
        Coordinate.create(0, 0),
      );

      expect(navigatorFacingNorth.left()).toEqual(
        new NavigatorFacingWest(Coordinate.create(0, 0)),
      );
    });

    it("Should have east to the right", () => {
      const navigatorFacingNorth = new NavigatorFacingNorth(
        Coordinate.create(0, 0),
      );

      expect(navigatorFacingNorth.right()).toEqual(
        new NavigatorFacingEast(Coordinate.create(0, 0)),
      );
    });

    it("Should continue north when moving forward and increase longitude", () => {
      const navigatorFacingNorth = new NavigatorFacingNorth(
        Coordinate.create(0, 0),
      );

      const nextNavigator = navigatorFacingNorth.forward();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingNorth);
      expect(nextNavigator.currentPosition()).toEqual(Coordinate.create(0, 1));
      expect(nextNavigator.formattedLocation()).toEqual("0:1:N");
    });

    it("Should continue north and reset the longitude when hit the boundary", () => {
      const navigatorFacingNorth = new NavigatorFacingNorth(
        Coordinate.create(0, 9),
      );

      const nextNavigator = navigatorFacingNorth.forward();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingNorth);
      expect(nextNavigator.currentPosition()).toEqual(Coordinate.create(0, 0));
      expect(nextNavigator.formattedLocation()).toEqual("0:0:N");
    });
  });

  describe("Testing the navigator facing West", () => {
    it("Should display the current position", () => {
      const navigatorFacingWest = new NavigatorFacingWest(
        Coordinate.create(0, 0),
      );

      expect(navigatorFacingWest.currentPosition()).toEqual(
        Coordinate.create(0, 0),
      );
    });

    it("Should have South to the left", () => {
      const navigatorFacingWest = new NavigatorFacingWest(
        Coordinate.create(0, 0),
      );

      expect(navigatorFacingWest.left()).toEqual(
        new NavigatorFacingSouth(Coordinate.create(0, 0)),
      );
    });

    it("Should have north to the right", () => {
      const navigatorFacingWest = new NavigatorFacingWest(
        Coordinate.create(0, 0),
      );

      expect(navigatorFacingWest.right()).toEqual(
        new NavigatorFacingNorth(Coordinate.create(0, 0)),
      );
    });

    it("Should continue west when moving forward and decrease latitude", () => {
      const navigatorFacingWest = new NavigatorFacingWest(
        Coordinate.create(1, 0),
      );

      const nextNavigator = navigatorFacingWest.forward();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingWest);
      expect(nextNavigator.currentPosition()).toEqual(Coordinate.create(0, 0));
      expect(nextNavigator.formattedLocation()).toEqual("0:0:W");
    });

    it("Should continue west and wrap the latitude when hit the boundary", () => {
      const navigatorFacingWest = new NavigatorFacingWest(
        Coordinate.create(0, 0),
      );

      const nextNavigator = navigatorFacingWest.forward();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingWest);
      expect(nextNavigator.currentPosition()).toEqual(Coordinate.create(9, 0));
      expect(nextNavigator.formattedLocation()).toEqual("9:0:W");
    });
  });

  describe("Testing the navigator facing South", () => {
    it("Should display the current position", () => {
      const navigator = new NavigatorFacingSouth(Coordinate.create(0, 0));

      expect(navigator.currentPosition()).toEqual(Coordinate.create(0, 0));
    });

    it("Should have East to the left", () => {
      const navigator = new NavigatorFacingSouth(Coordinate.create(0, 0));

      expect(navigator.left()).toEqual(
        new NavigatorFacingEast(Coordinate.create(0, 0)),
      );
    });

    it("Should have West to the right", () => {
      const navigator = new NavigatorFacingSouth(Coordinate.create(0, 0));

      expect(navigator.right()).toEqual(
        new NavigatorFacingWest(Coordinate.create(0, 0)),
      );
    });

    it("Should continue south when moving forward and decrease longitude", () => {
      const navigator = new NavigatorFacingSouth(Coordinate.create(0, 1));

      const nextNavigator = navigator.forward();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingSouth);
      expect(nextNavigator.currentPosition()).toEqual(Coordinate.create(0, 0));
      expect(nextNavigator.formattedLocation()).toEqual("0:0:S");
    });

    it("Should continue south and wrap the longitude when hit the boundary", () => {
      const navigator = new NavigatorFacingSouth(Coordinate.create(0, 0));

      const nextNavigator = navigator.forward();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingSouth);
      expect(nextNavigator.currentPosition()).toEqual(Coordinate.create(0, 9));
      expect(nextNavigator.formattedLocation()).toEqual("0:9:S");
    });
  });

  describe("Testing the navigator facing East", () => {
    it("Should display the current position", () => {
      const navigator = new NavigatorFacingEast(Coordinate.create(0, 0));

      expect(navigator.currentPosition()).toEqual(Coordinate.create(0, 0));
    });

    it("Should have North to the left", () => {
      const navigator = new NavigatorFacingEast(Coordinate.create(0, 0));

      expect(navigator.left()).toEqual(
        new NavigatorFacingNorth(Coordinate.create(0, 0)),
      );
    });

    it("Should have South to the right", () => {
      const navigator = new NavigatorFacingEast(Coordinate.create(0, 0));

      expect(navigator.right()).toEqual(
        new NavigatorFacingSouth(Coordinate.create(0, 0)),
      );
    });

    it("Should continue east when moving forward and increase latitude", () => {
      const navigator = new NavigatorFacingEast(Coordinate.create(0, 0));

      const nextNavigator = navigator.forward();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingEast);
      expect(nextNavigator.currentPosition()).toEqual(Coordinate.create(1, 0));
      expect(nextNavigator.formattedLocation()).toEqual("1:0:E");
    });

    it("Should continue east and wrap the latitude when hit the boundary", () => {
      const navigator = new NavigatorFacingEast(Coordinate.create(9, 0));

      const nextNavigator = navigator.forward();

      expect(nextNavigator).toBeInstanceOf(NavigatorFacingEast);
      expect(nextNavigator.currentPosition()).toEqual(Coordinate.create(0, 0));
      expect(nextNavigator.formattedLocation()).toEqual("0:0:E");
    });
  });
});
