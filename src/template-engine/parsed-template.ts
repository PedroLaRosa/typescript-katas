import type { TemplateWarning } from "./template-warning.js";

class ParsedTemplate {
  private constructor(
    readonly text: string,
    readonly warnings: ReadonlyArray<TemplateWarning>,
  ) {}

  static create(text: string, warnings: Array<TemplateWarning>) {
    return new ParsedTemplate(text, warnings);
  }

  addWarning(templateWarning: TemplateWarning) {
    return ParsedTemplate.create(
      this.text,
      this.warnings.concat(templateWarning),
    );
  }

  containsWarnings() {
    return this.warnings.length > 0;
  }
}

export { ParsedTemplate };
