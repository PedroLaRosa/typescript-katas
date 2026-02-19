import { ParsedTemplate } from "./parsed-template.js";
import { TemplateWarning } from "./template-warning.js";

class TemplateEngine {
  private constructor(
    private readonly text: string,
    private readonly variables: Record<string, string | undefined | null>,
  ) {}

  static create(
    text: string,
    variables: Record<string, string | undefined | null>,
  ) {
    return new TemplateEngine(text, variables);
  }

  parse() {
    if (this.variables === null)
      return this.templateWithWarningAboutVariablesNotDefined();
    if (this.text === null)
      return this.templateWithWarningAboutTextNotDefined();
    const parsedTemplate = this.templateWithReplacedVariables();
    return this.templateWithWarningAboutNonReplacedVariables(parsedTemplate);
  }

  private templateWithWarningAboutNonReplacedVariables(
    parsedTemplate: ParsedTemplate,
  ) {
    const variableRegExp = /\$\{[a-zA-Z0-9-]+\}/g;
    const matches = parsedTemplate.text.match(variableRegExp);
    if (!matches) return parsedTemplate;
    const keyIsNotReplacedWarnings: TemplateWarning[] = [];
    matches.forEach((v) => {
      const variable = /[a-zA-Z0-9-]+/.exec(v)?.[0];
      if (!variable) return;
      keyIsNotReplacedWarnings.push(
        TemplateWarning.create(`Variable ${variable} couldn't be replaced`),
      );
    });
    return ParsedTemplate.create(
      parsedTemplate.text,
      parsedTemplate.warnings.concat(keyIsNotReplacedWarnings),
    );
  }

  private templateWithWarningAboutVariablesNotDefined() {
    return ParsedTemplate.create(this.text, [
      TemplateWarning.create("Variables are not defined"),
    ]);
  }

  private templateWithWarningAboutTextNotDefined() {
    return ParsedTemplate.create("", [
      TemplateWarning.create("Text is not defined"),
    ]);
  }

  private formTemplateVariable(key: string) {
    return `\${${key}}`;
  }
  private templateWithReplacedVariables() {
    const variables = new Map(Object.entries(this.variables));
    let parsedText = this.text;
    const keyNotInTemplateWarnings: TemplateWarning[] = [];
    for (const [key, value] of variables) {
      const isTheKeyInTheTemplate = parsedText.includes(
        this.formTemplateVariable(key),
      );
      const hasTheKeyValue = value !== undefined && value !== null;
      if (!isTheKeyInTheTemplate)
        keyNotInTemplateWarnings.push(
          TemplateWarning.create(
            `Variable ${key} is not found in the template`,
          ),
        );
      if (hasTheKeyValue) {
        parsedText = parsedText.replaceAll(
          this.formTemplateVariable(key),
          value,
        );
      }
    }
    const parsedTemplate = ParsedTemplate.create(
      parsedText,
      keyNotInTemplateWarnings,
    );
    return parsedTemplate;
  }
}

export { TemplateEngine };
