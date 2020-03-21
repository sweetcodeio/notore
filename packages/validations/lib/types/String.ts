import { Validation, TValidateOptions, IValidField } from '@notore/core';

import { REGEX } from '../utils/Constants';

class StringValidation extends Validation {
  private _values?: string[];

  constructor() {
    super('string');
  }

  protected isValid(
    string: string,
    { key }: TValidateOptions,
  ): IValidField | void {
    if (typeof string !== 'string') {
      const error = 'The validation entered is not an string';
      return { error };
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
            ...field,
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

  alphanumeric(force?: boolean): this {
    this.reviews.push(REGEX.ALPHA_NUMERIC(!!force));
    return this;
  }

  email(): this {
    this.reviews.push(REGEX.EMAIL);
    return this;
  }

  values(values: string[]): this {
    this._values = values;
    return this;
  }
}

export default StringValidation;
