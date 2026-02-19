import { describe, expect, it } from "vitest";
import { TemplateEngine } from "./template-engine.js";

describe("Test templateEgnine", () => {
  it("Should warn if the variable is not in the template", () => {
    const processedText = TemplateEngine.create("Hello ${variable}", {
      variable: "John",
      age: "35",
      city: "Barcelona",
    }).parse();

    expect(processedText.text).toBe("Hello John");
    expect(processedText.containsWarnings()).toBe(true);
    expect(processedText.warnings[0]?.message).toBe(
      "Variable age is not found in the template",
    );
    expect(processedText.warnings[1]?.message).toBe(
      "Variable city is not found in the template",
    );
  });

  it("should keep the name of the variable if the variable is not found", () => {
    const processedText = TemplateEngine.create(
      "Hello ${variable}",
      {},
    ).parse();

    expect(processedText.text).toBe("Hello ${variable}");
    expect(processedText.warnings[0]?.message).toBe(
      "Variable variable couldn't be replaced",
    );
  });

  it("should keep the name of the variable if the variable is null", () => {
    const processedText = TemplateEngine.create("Hello ${variable}", {
      variable: null,
    }).parse().text;

    expect(processedText).toBe("Hello ${variable}");
  });

  it("should keep the name of the variable if the variable is undefined", () => {
    const processedText = TemplateEngine.create(
      "Hello ${variable}, you are ${variable}",
      {
        variable: undefined,
      },
    ).parse().text;

    expect(processedText).toBe("Hello ${variable}, you are ${variable}");
  });

  it("should keep the name of the variable of all variable that are no found", () => {
    const processedText = TemplateEngine.create(
      "Hello ${variable}, you are ${variable}. Have you met ${name}?",
      {},
    ).parse().text;

    expect(processedText).toBe(
      "Hello ${variable}, you are ${variable}. Have you met ${name}?",
    );
  });

  it("Should replace the variables in the template", () => {
    const processedText = TemplateEngine.create("Hello ${variable}", {
      variable: "world",
    }).parse().text;

    expect(processedText).toBe("Hello world");
  });

  it("Should replace two variables in the template", () => {
    const processedText = TemplateEngine.create(
      "Hello ${variable}, \n I'm ${name}",
      {
        variable: "world",
        name: "Pedro",
      },
    ).parse().text;

    expect(processedText).toBe("Hello world, \n I'm Pedro");
  });

  it("Should replace many variables in the template", () => {
    const processedText = TemplateEngine.create(
      "This is a text with a ${variable} to be replaced And this is another text with ${other-variable} to be replaced. \n" +
        "And this is another text with ${another-variable} to be replaced",
      {
        variable: "value",
        "other-variable": "other-value",
        "another-variable": "another-value",
      },
    ).parse().text;

    expect(processedText).toBe(
      "This is a text with a value to be replaced And this is another text with other-value to be replaced. \n" +
        "And this is another text with another-value to be replaced",
    );
  });

  it("Should replace the same variable many times", () => {
    const processedText = TemplateEngine.create(
      "I'm ${name}, and I'm ${age}. You can just call me ${name}",
      {
        name: "Pedro",
        age: "35",
      },
    ).parse().text;

    expect(processedText).toBe(
      "I'm Pedro, and I'm 35. You can just call me Pedro",
    );
  });

  it("Should warn if the dictionary is null", () => {
    const processedText = TemplateEngine.create(
      "Hello ${variable}",
      // @ts-expect-error
      null,
    ).parse();

    expect(processedText.text).toBe("Hello ${variable}");
    expect(processedText.containsWarnings()).toBe(true);
    expect(processedText.warnings[0]?.message).toBe(
      "Variables are not defined",
    );
  });

  it("Should warn if the text is null", () => {
    const processedText = TemplateEngine.create(
      // @ts-expect-error
      null,
      {},
    ).parse();

    expect(processedText.text).toBe("");
    expect(processedText.containsWarnings()).toBe(true);
    expect(processedText.warnings[0]?.message).toBe("Text is not defined");
  });
});
