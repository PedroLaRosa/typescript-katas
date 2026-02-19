class TemplateWarning {
  private constructor(readonly message: string) {}

  static create(message: string) {
    return new TemplateWarning(message);
  }
}

export { TemplateWarning };
