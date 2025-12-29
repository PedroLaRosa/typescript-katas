import { ColumnWidth } from "./column-width.js";

class WrappableText {
  private constructor(private readonly text: string) {}

  static create(text: string) {
    // This is now allowed by Typescript. However, is this function is used in
    // Vanilla Javascript, this will break the contract of the function signature
    // That's why the wordWrap function receives a null or underfined it is going to be treaded
    // as empty string.
    const value = text === null || text === undefined ? "" : text;
    return new WrappableText(value);
  }

  #getSpaceIndex() {
    return this.getValue().lastIndexOf(" ");
  }

  #hasSpace() {
    return this.#getSpaceIndex() >= 0;
  }

  #wrapIndex(width: ColumnWidth) {
    const wordToWrap = this.text.substring(0, width.getValue());
    const firstSpaceFound = this.#getSpaceIndex();
    const hasSpace = this.#hasSpace();
    let charsToRemove = wordToWrap
      .substring(hasSpace ? firstSpaceFound : width.getValue())
      .trim().length;
    const earlyEndOfWrap = width.getValue() - charsToRemove - 1;
    return charsToRemove > 0 ? earlyEndOfWrap : width.getValue();
  }
  #wrappedText(width: ColumnWidth) {
    return WrappableText.create(
      this.getValue().substring(0, this.#wrapIndex(width)).trim().concat("\n"),
    );
  }

  #unwrapIndex(width: ColumnWidth) {
    const wordToWrap = this.text.substring(0, width.getValue());
    const firstSpaceFound = this.#getSpaceIndex();
    const hasSpace = this.#hasSpace();
    let charsToRemove = wordToWrap
      .substring(hasSpace ? firstSpaceFound : width.getValue())
      .trim().length;
    return width.getValue() - charsToRemove;
  }
  #unwrappedText(width: ColumnWidth) {
    return WrappableText.create(
      this.getValue().substring(this.#unwrapIndex(width)).trim(),
    );
  }

  /*
   * Tell don't ask
   *
   * Avoid passing a chain of methods when possible
   * It is better instead of querying the object for information
   * asking the object to provide the information directly
   * */
  isFittingIn(columnWidth: ColumnWidth) {
    return this.text.length <= columnWidth.getValue();
  }

  concat(text: WrappableText) {
    return WrappableText.create(`${this.getValue()}${text.getValue()}`);
  }

  getValue() {
    return this.text;
  }

  wrap(width: ColumnWidth): WrappableText {
    const widthValue = width.getValue();

    if (widthValue === 0) return WrappableText.create(this.getValue());
    if (this.isFittingIn(width)) return WrappableText.create(this.getValue());

    const stringHead = this.#wrappedText(width);
    const stringTail = this.#unwrappedText(width);

    return stringHead.concat(stringTail.wrap(width));
  }
}

export { WrappableText };
