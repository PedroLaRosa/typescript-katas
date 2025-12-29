import { describe, expect, it } from "vitest";
import { WrappableText } from "./wrappable-text.js";
import { ColumnWidth } from "./column-width.js";

function wordWrap(text: string, width: number): string {
  return WrappableText.create(text).wrap(ColumnWidth.create(width)).getValue();
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
