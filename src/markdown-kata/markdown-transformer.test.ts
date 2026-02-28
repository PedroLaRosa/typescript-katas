import { describe, expect, it } from "vitest";
import { MarkdownTransformer } from "./markdown-transformer.js";

describe("The Markdown Transformer", () => {
  it("should not transform a given markdown text that does no contain any links", () => {
    const markdownText = "This is a text without links";
    const transformedText = new MarkdownTransformer(markdownText).transform();
    expect(transformedText).toBe(markdownText);
  });

  it("should transform a given markdown text that contains one link", () => {
    const markdownText = "[Visible text link](url)";
    const transformedText = new MarkdownTransformer(markdownText).transform();
    expect(transformedText).toBe(
      "Visible text link [^anchor]\n\n[^anchor1]: url",
    );
  });

  it("should transform a given markdown text that contains two links", () => {
    const markdownText =
      "blah blah blah... [Visible text link](url) blah blah [this is a link](other-url)";
    const transformedText = new MarkdownTransformer(markdownText).transform();
    expect(transformedText).toBe(
      "blah blah blah... Visible text link [^anchor] blah blah this is a link [^anchor]\n\n[^anchor1]: url\n\n[^anchor2]: other-url",
    );
  });
});
