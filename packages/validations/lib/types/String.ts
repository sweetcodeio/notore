import { Validation, ValidateResponse, ValidateOptions } from '@notore/core';

import { Regex } from '../utils/constants';

class StringValidation extends Validation<string> {
  private _values?: string[];

  constructor() {
    super('string');
  }

  public values(values: string[]): this {
    this._values = values;
    return this;
  }

  public email(): this {
    this.reviews.push(Regex.Email);
    return this;
  }

  public alphanumeric(force?: boolean): this {
    this.reviews.push(Regex.AlphaNumeric(!!force));
    return this;
  }

  protected isValid(
    string: string,
    { key }: ValidateOptions,
  ): ValidateResponse {
    if (typeof string !== 'string') {
      const error = 'string';
      return { error, complete: true };
    }

    const { reviews } = this;
    if (reviews.length) {
      const fields = reviews.filter(review => !review.regex.test(string));

      if (fields.length) {
        const displayName = (key && `${key} (${this.name})`) || this.name;
        const error = fields[0].error(displayName);

        return {
          error,
          fields: fields.map(field => ({
            error: field.error(displayName),
          })),
        };
      }
    }

    if (this._values) {
      const hasValue = this._values.some(v => v === string);

      if (!hasValue) {
        const error =
          'The validation entered does not match any of the values ​​entered';
        return { error };
      }
    }
  }
}

export default StringValidation;
