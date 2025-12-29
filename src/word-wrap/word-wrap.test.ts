import { describe, expect, it } from "vitest";

function wordWrap(text: string, width: number): string {
  // This is now allowed by Typescript. However, is this function is used in
  // Vanilla Javascript, this will break the contract of the function signature
  // That's why the wordWrap function receives a null or underfined it is going to be treaded
  // as empty string.
  if (text === null || text === undefined) return "";

  assertIsNotNegative(width);

  if (width === 0) return text;
  if (text.length <= width) return text;

  const charsToRemove = countCharsToRemoveFromEnd(text, width);
  const earlyEndOfWrap = width - charsToRemove - 1;
  const deductedWidth = charsToRemove > 0 ? earlyEndOfWrap : width;
  const stringHead = text.substring(0, deductedWidth).trim();
  const stringTail = text.substring(width - charsToRemove).trim();

  return `${stringHead}\n${wordWrap(stringTail, width)}`;
}

function assertIsNotNegative(n: number) {
  if (n < 0) throw new Error("Negative numbers are not allowed");
}

function countCharsToRemoveFromEnd(text: string, width: number) {
  const wordToWrap = text.substring(0, width);
  const firstSpaceFound = wordToWrap.lastIndexOf(" ");
  const hasSpace = firstSpaceFound >= 0;
  return wordToWrap.substring(hasSpace ? firstSpaceFound : width).trim().length;
  // let charsToRemove = 0;
  //
  // if (wordToWrap.at(charsToRemove - 1) !== " ") {
  //   if (wordToWrap.at(charsToRemove - 2) === " ") {
  //     charsToRemove += 1;
  //   }
  // }
  // return charsToRemove;
}

describe("Testing word wrap function", () => {
  // it("should wrap space when the position to wrap is preceded by a space", () => {
  //   expect(
  //     wordWrap("I like cheese with crackers to make a good snack", 8),
  //   ).toBe("I like\ncheese\nwith cra\nckers to\nmake a\ngood sna\nck");
  //   expect(wordWrap("I like cheese", 8)).toBe("I like\ncheese");
  // });
  //
  // it("should trim spaces when the position to wrap is preceded by a space", () => {
  //   expect(
  //     wordWrap(
  //       "I like       cheese   with crackers to make a    good snack",
  //       8,
  //     ),
  //   ).toBe("I like\ncheese\nwith cra\nckers to\nmake a\ngood sna\nck");
  //   expect(wordWrap("I like    cheese", 8)).toBe("I like\ncheese");
  // });

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
