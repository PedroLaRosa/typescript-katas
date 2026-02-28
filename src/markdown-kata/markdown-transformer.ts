class MarkdownTransformer {
  constructor(readonly markdownText: string) {}

  transform() {
    const links = this.findAllLinks();
    const linkRecord = this.generateLinkRecord(links);
    const transformedMarkdown = this.replaceLinksByAnchor(linkRecord);
    const footNotes = this.createFootNotes(linkRecord);

    return this.appendFootnotesToMarkDown(transformedMarkdown, footNotes);
  }

  findAllLinks() {
    const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
    const matchesAsList = Array.from(this.markdownText.matchAll(linkRegex));
    const links = matchesAsList
      .map((match) => {
        const [_, text, url] = match;
        if (!text || !url) return;
        return new MarkdownLink(text, url);
      })
      .filter((link) => link !== undefined);
    return this.uniqueLinks(links);
  }

  uniqueLinks(links: MarkdownLink[]) {
    return links.filter((link, index) => {
      return links.findIndex((l) => l.toEqual(link)) === index;
    });
  }

  generateLinkRecord(links: MarkdownLink[]) {
    return links.reduce<Record<string, MarkdownLink>>(
      (dictionary, link, index) => {
        return {
          ...dictionary,
          [`[^anchor${index + 1}]`]: link,
        };
      },
      {},
    );
  }

  replaceLinksByAnchor(linkRecord: Record<string, MarkdownLink>) {
    return Object.keys(linkRecord).reduce((previousText, key, index) => {
      return previousText.replaceAll(
        linkRecord[key]!.toAnchorFormat(),
        `${linkRecord[key]!.text} [^anchor]`,
      );
    }, this.markdownText);
  }

  createFootNotes(linkRecord: Record<string, MarkdownLink>) {
    return Object.keys(linkRecord).map(
      (footnoteKey) => `${footnoteKey}: ${linkRecord[footnoteKey]!.url}`,
    );
  }

  appendFootnotesToMarkDown(transformedMarkdown: string, footNotes: string[]) {
    return [transformedMarkdown, ...footNotes].join("\n\n");
  }
}

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

export { MarkdownTransformer };
