import { describe, expect, it } from "vitest";
import { Coordinate } from "./coordinate.js";

describe("Coordinate class", () => {
  it("should thow error when creating coordinates with negative latitude or longitude", () => {
    expect(() => Coordinate.create(-1, 0)).toThrowError(
      "Latitude and longitude must be positive",
    );
  });

  it("should go start coordinates from zero when go beyond the max limit", () => {
    expect(Coordinate.create(10, 1)).toEqual(Coordinate.create(0, 1));
    expect(Coordinate.create(23, 15)).toEqual(Coordinate.create(3, 5));
    expect(Coordinate.create(8, 10)).toEqual(Coordinate.create(8, 0));
  });

  it("Should increate latitude", () => {
    expect(Coordinate.create(0, 0).increaseLatitude()).toEqual(
      Coordinate.create(1, 0),
    );
  });

  it("Should increate latitude and restart to 0 when go beyond the max limit", () => {
    expect(Coordinate.create(9, 0).increaseLatitude()).toEqual(
      Coordinate.create(0, 0),
    );
  });

  it("Should increate longitude", () => {
    expect(Coordinate.create(0, 0).increaseLongitude()).toEqual(
      Coordinate.create(0, 1),
    );
  });

  it("Should increate longitude and restart to 0 when go beyond the max limit", () => {
    expect(Coordinate.create(0, 9).increaseLongitude()).toEqual(
      Coordinate.create(0, 0),
    );
  });

  it("Should decrease latitude and start from the max limit when go under the bottom limit (0)", () => {
    expect(Coordinate.create(0, 0).decreaseLatitude()).toEqual(
      Coordinate.create(9, 0),
    );
  });

  it("Should decrease latitude", () => {
    expect(Coordinate.create(5, 0).decreaseLatitude()).toEqual(
      Coordinate.create(4, 0),
    );
  });

  it("Should decrease longitude and start from the max limit when go under the bottom limit (0)", () => {
    expect(Coordinate.create(0, 0).decreaseLongitude()).toEqual(
      Coordinate.create(0, 9),
    );
  });

  it("Should decrease longitude", () => {
    expect(Coordinate.create(5, 8).decreaseLongitude()).toEqual(
      Coordinate.create(5, 7),
    );
  });

  it("Should get the stringified version of the coordinate", () => {
    expect(Coordinate.create(5, 8).toString()).toEqual("5:8");
    expect(Coordinate.create(1, 12).toString()).toEqual("1:2");
  });
});
