class Coordinate {
  private constructor(
    private readonly latitude: number,
    private readonly longitude: number,
  ) {}
  private static maxLatitude = 10;
  private static maxLongitude = 10;

  static create(latitude: number, longitude: number) {
    if (latitude < 0 || longitude < 0) {
      throw new Error("Negative values are not allowed");
    }

    const latitudeInMaxRange = latitude % Coordinate.maxLatitude;
    const longitudeInMaxRange = longitude % Coordinate.maxLongitude;

    return new Coordinate(latitudeInMaxRange, longitudeInMaxRange);
  }

  increaseLongitude() {
    return new Coordinate(
      this.latitude,
      this.longitude + 1 >= Coordinate.maxLongitude ? 0 : this.longitude + 1,
    );
  }

  decreaseLatitude() {
    return new Coordinate(
      this.latitude - 1 < 0 ? Coordinate.maxLatitude - 1 : this.latitude - 1,
      this.longitude,
    );
  }

  decreaseLongitude() {
    return new Coordinate(
      this.latitude,
      this.longitude - 1 < 0 ? Coordinate.maxLongitude - 1 : this.longitude - 1,
    );
  }

  increaseLatitude() {
    return new Coordinate(
      this.latitude + 1 >= Coordinate.maxLatitude ? 0 : this.latitude + 1,
      this.longitude,
    );
  }

  toString() {
    return `${this.latitude}:${this.longitude}`;
  }
}

export { Coordinate };
