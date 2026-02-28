class MarkdownLink {
  constructor(
    readonly text: string,
    readonly url: string,
  ) {}

  toEqual(markdownLink: MarkdownLink) {
    return this.text === markdownLink.text && this.url === markdownLink.url;
  }

  toAnchorFormat() {
    return `[${this.text}](${this.url})`;
  }
}

export { MarkdownLink };
