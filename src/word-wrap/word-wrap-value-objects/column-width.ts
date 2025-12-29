/*
 * This is a value object
 *
 * Avoid primitive obsession when possible. That's the main reason of using value objects in this kata
 *
 * One clue to use this is when we need to restrict or create different behaviors to expected to this primitive types.
 *
 * e.g; Don't allow negative numbers or return an empty string when the string is null or undefined
 *
 *
 * A value object is a type that encapsulates a value and IT IS NOT AN ENTITY.
 *
 * In other words, this is an object that is not persisted or have an ID field
 *
 * Value objects are inmutables and it is not possible to access the primitive it is wrapping directly
 * */
class ColumnWidth {
  /*
   * Adding validations here is a good idea
   * Sometimes validating in the constructor is hard to debug
   * also it could be surprising to throw an error when instantiating
   * the object with this constructor
   *
   * A better idea is to create an static function like "create" to instantiate the object and add any validation or logic when creating the object
   * This technique is called Factory Method*/

  private constructor(private readonly width: number) {}

  static create(width: number) {
    if (width < 0) throw new Error("Negative numbers are not allowed");
    return new ColumnWidth(width);
  }

  getValue() {
    return this.width;
  }
}

export { ColumnWidth };
