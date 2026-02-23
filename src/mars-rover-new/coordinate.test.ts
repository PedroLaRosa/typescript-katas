import { describe, expect, it } from "vitest";
import { Coordinate } from "./coordinate.js";

describe("Testing Coordinate", () => {
  it("Should create a valid coordinate", () => {
    const coordinate = Coordinate.create(1, 2);

    expect(coordinate).toEqual(Coordinate.create(1, 2));
  });
  it("Should format the coordinate", () => {
    const coordinate = Coordinate.create(1, 2);

    expect(coordinate.toString()).toBe("1:2");
  });

  it("Should keep latitude in range when passed in a negative value", () => {
    expect(() => Coordinate.create(-1, 2)).toThrowError(
      "Negative values are not allowed",
    );
  });

  it("Should keep longitude in range when passed in a negative value", () => {
    expect(() => Coordinate.create(2, -4)).toThrowError(
      "Negative values are not allowed",
    );
  });

  it("Should keep latitude in range when passing in a value bigger than the max latitude", () => {
    const coordinate = Coordinate.create(10, 1);

    expect(coordinate).toEqual(Coordinate.create(0, 1));
  });

  it("Should keep longitude in range when passing in a value bigger than the max longitude", () => {
    const coordinate = Coordinate.create(1, 12);

    expect(coordinate).toEqual(Coordinate.create(1, 2));
  });
});
