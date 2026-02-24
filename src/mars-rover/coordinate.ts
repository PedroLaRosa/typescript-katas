class Coordinate {
  private static maxLatitude = 10;
  private static maxLongitude = 10;
  private constructor(
    private readonly latitude: number,
    private readonly longitude: number,
  ) {}

  static create(latitude: number, longitude: number) {
    if (latitude < 0 || longitude < 0) {
      throw new Error("Latitude and longitude must be positive");
    }

    const latitudeInMaxRange = latitude % Coordinate.maxLatitude;
    const longitudeInMaxRange = longitude % Coordinate.maxLongitude;

    return new Coordinate(latitudeInMaxRange, longitudeInMaxRange);
  }

  increaseLatitude() {
    const newLatitudeInMaxRange = (this.latitude + 1) % Coordinate.maxLatitude;
    return new Coordinate(newLatitudeInMaxRange, this.longitude);
  }

  increaseLongitude() {
    const newLongitudeInMaxRange =
      (this.longitude + 1) % Coordinate.maxLongitude;
    return new Coordinate(this.latitude, newLongitudeInMaxRange);
  }

  decreaseLatitude() {
    const newLatitudeInMaxRange =
      this.latitude - 1 < 0 ? Coordinate.maxLatitude - 1 : this.latitude - 1;

    return new Coordinate(newLatitudeInMaxRange, this.longitude);
  }

  decreaseLongitude() {
    const newLongitudeInMaxRange =
      this.longitude - 1 < 0 ? Coordinate.maxLongitude - 1 : this.longitude - 1;

    return new Coordinate(this.latitude, newLongitudeInMaxRange);
  }

  toString() {
    return `${this.latitude}:${this.longitude}`;
  }
}

export { Coordinate };
