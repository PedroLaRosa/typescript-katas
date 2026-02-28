import { describe, expect, it } from "vitest";
import { MarkdownTransformer } from "./markdown-transformer.js";
import { MarkdownLink } from "./markdown-link.js";

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

describe("Find all links", () => {
  it("should not find links in a given markdown text that does no contain any links", () => {
    const markdownText = "";
    const transformer = new MarkdownTransformer(markdownText);

    const allLinks = transformer.findAllLinks();

    expect(allLinks).toEqual([]);
  });

  it("should all find links in a given markdown text", () => {
    const markdownText =
      "[Visible text link](url)[other Visible text link](other-url)";
    const transformer = new MarkdownTransformer(markdownText);

    const allLinks = transformer.findAllLinks();

    expect(allLinks).toEqual([
      new MarkdownLink("Visible text link", "url"),
      new MarkdownLink("other Visible text link", "other-url"),
    ]);
  });

  it("should only non-duplicated links", () => {
    const markdownText =
      "[Visible text link](url)[other Visible text link](other-url)[Visible text link](url)";
    const transformer = new MarkdownTransformer(markdownText);

    const allLinks = transformer.findAllLinks();

    expect(allLinks).toEqual([
      new MarkdownLink("Visible text link", "url"),
      new MarkdownLink("other Visible text link", "other-url"),
    ]);
  });
});

describe("Generate links record", () => {
  it("Should generate a record with all links", () => {
    const markdownText =
      "[Visible text link](url)[other Visible text link](other-url)[Visible text link](url)";
    const transformer = new MarkdownTransformer(markdownText);

    const link1 = new MarkdownLink("Visible text link", "url");
    const link2 = new MarkdownLink("other Visible text link", "other-url");

    const allLinks = transformer.generateLinkRecord([link1, link2]);

    expect(allLinks).toEqual({
      ["[^anchor1]"]: new MarkdownLink("Visible text link", "url"),
      ["[^anchor2]"]: new MarkdownLink("other Visible text link", "other-url"),
    });
  });

  it("should replace text links by anchors", () => {
    const markdownText = "[Visible text link](url)";
    const transformer = new MarkdownTransformer(markdownText);

    const links = transformer.findAllLinks();
    const linkRecord = transformer.generateLinkRecord(links);
    const transformedText = transformer.replaceLinksByAnchor(linkRecord);

    expect(transformedText).toBe("Visible text link [^anchor]");
  });

  it("creates footnotes", () => {
    const markdownText = "[Visible text link](url)";
    const transformer = new MarkdownTransformer(markdownText);
    const links = transformer.findAllLinks();
    const linkRecord = transformer.generateLinkRecord(links);
    const footNotes = transformer.createFootNotes(linkRecord);

    expect(footNotes).toEqual(["[^anchor1]: url"]);
  });

  it("appends footnotes to markdown", () => {
    const markdownText = "[Visible text link](url)";
    const transformer = new MarkdownTransformer(markdownText);
    const links = transformer.findAllLinks();
    const linkRecord = transformer.generateLinkRecord(links);
    const transformedMarkdown = transformer.replaceLinksByAnchor(linkRecord);
    const footNotes = transformer.createFootNotes(linkRecord);

    const transformedMarkdownWithFootNotes =
      transformer.appendFootnotesToMarkDown(transformedMarkdown, footNotes);

    expect(transformedMarkdownWithFootNotes).toBe(
      "Visible text link [^anchor]\n\n[^anchor1]: url",
    );
  });
});
