import { describe, expect, it } from "vitest";

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

class WrappableText {
  private constructor(private readonly text: string) {}

  static create(text: string) {
    // This is now allowed by Typescript. However, is this function is used in
    // Vanilla Javascript, this will break the contract of the function signature
    // That's why the wordWrap function receives a null or underfined it is going to be treaded
    // as empty string.
    const value = text === null || text === undefined ? "" : text;
    return new WrappableText(value);
  }

  #getSpaceIndex() {
    return this.getValue().lastIndexOf(" ");
  }

  #hasSpace() {
    return this.#getSpaceIndex() >= 0;
  }

  #wrapIndex(width: ColumnWidth) {
    const wordToWrap = this.text.substring(0, width.getValue());
    const firstSpaceFound = this.#getSpaceIndex();
    const hasSpace = this.#hasSpace();
    let charsToRemove = wordToWrap
      .substring(hasSpace ? firstSpaceFound : width.getValue())
      .trim().length;
    const earlyEndOfWrap = width.getValue() - charsToRemove - 1;
    return charsToRemove > 0 ? earlyEndOfWrap : width.getValue();
  }
  wrappedText(width: ColumnWidth) {
    return WrappableText.create(
      this.getValue().substring(0, this.#wrapIndex(width)).trim().concat("\n"),
    );
  }

  #unwrapIndex(width: ColumnWidth) {
    const wordToWrap = this.text.substring(0, width.getValue());
    const firstSpaceFound = this.#getSpaceIndex();
    const hasSpace = this.#hasSpace();
    let charsToRemove = wordToWrap
      .substring(hasSpace ? firstSpaceFound : width.getValue())
      .trim().length;
    return width.getValue() - charsToRemove;
  }
  unwrappedText(width: ColumnWidth) {
    return WrappableText.create(
      this.getValue().substring(this.#unwrapIndex(width)).trim(),
    );
  }

  /*
   * Tell don't ask
   *
   * Avoid passing a chain of methods when possible
   * It is better instead of querying the object for information
   * asking the object to provide the information directly
   * */
  isFittingIn(columnWidth: ColumnWidth) {
    return this.text.length <= columnWidth.getValue();
  }

  concat(text: WrappableText) {
    return WrappableText.create(`${this.getValue()}${text.getValue()}`);
  }

  getValue() {
    return this.text;
  }
}

function wordWrap(text: string, width: number): string {
  return wordWrapNoPrimitives(
    WrappableText.create(text),
    ColumnWidth.create(width),
  ).getValue();
}

function wordWrapNoPrimitives(
  text: WrappableText,
  width: ColumnWidth,
): WrappableText {
  const widthValue = width.getValue();

  if (widthValue === 0) return WrappableText.create(text.getValue());
  if (text.isFittingIn(width)) return WrappableText.create(text.getValue());

  const stringHead = text.wrappedText(width);
  const stringTail = text.unwrappedText(width);

  return stringHead.concat(wordWrapNoPrimitives(stringTail, width));
}

describe("Testing word wrap function", () => {
  it.each<{ text: string; width: number; expectedReturn: string }>([
    { text: "", width: 5, expectedReturn: "" },
    { text: "hello", width: 0, expectedReturn: "hello" },
    { text: "hello", width: 5, expectedReturn: "hello" },
    { text: "longword", width: 4, expectedReturn: "long\nword" },
    {
      text: "reallylongword",
      width: 4,
      expectedReturn: "real\nlylo\nngwo\nrd",
    },
    { text: "abc def", width: 4, expectedReturn: "abc\ndef" },
    { text: "abc def ghi", width: 4, expectedReturn: "abc\ndef\nghi" },
    { text: "' abcdf", width: 4, expectedReturn: "'\nabcd\nf" },
    // @ts-expect-error - Not allowed by TS but controlled by JS
    { text: null, width: 4, expectedReturn: "" },
    // @ts-expect-error - Not allowed by TS but controlled by JS
    { text: undefined, width: 7, expectedReturn: "" },
  ])(
    "It should return $expectedReturn when text is $text and width is $width",
    // @ts-expect-error
    ({ text, width, expectedReturn: expectedReturng }) => {
      expect(wordWrap(text, width)).toBe(expectedReturng);
    },
  );

  it("should throw when receive a negative width", () => {
    expect(() => wordWrap("Hello", -1)).toThrowError(
      "Negative numbers are not allowed",
    );
  });
});
