import { TValidateOptions, IValidateTemplate, IValidField } from '../types';

import { parseError } from '../utils';
import Failure from './Failure';
import Parse from './Parse';
import Success from './Success';

interface IReviewItem {
  name: string;
  regex: RegExp;
  error: (t: string) => string;
}

abstract class NotoreValidation {
  readonly name: string;

  protected required?: boolean;

  protected reviews: IReviewItem[] = [];

  protected abstract isValid(
    schema: any,
    options: TValidateOptions,
  ): IValidField | void;

  constructor(name: string) {
    this.name = name;
  }

  validate(schema: any): IValidateTemplate<Failure, Success> {
    const { fields, error } = this.handleValidation(schema);

    return this.createResponse(
      error ? new Failure(error, fields) : new Success(schema),
    );
  }

  generateValidation<T = {}>(
    value: any,
    options?: TValidateOptions<T>,
  ): IValidField {
    return this.handleValidation(value, options);
  }

  isRequired(): this {
    this.required = true;
    return this;
  }

  protected isNull(v: any): boolean {
    return v === null || v === undefined;
  }

  private handleValidation(
    schema: any,
    options?: TValidateOptions,
  ): IValidField {
    const { key } = options || {};

    const isNull = this.isNull(schema);
    const required = this.required && isNull;

    if (isNull && !this.required) return {};

    if (required) {
      const displayName = key && `${key} (${this.name})`;
      const error = `"${displayName || this.name}" is required`;
      return { error };
    }

    const response = this.isValid(schema, options || {});
    if (response && response.error) {
      const { error, fields, ...rest } = response;
      const parsedFields = fields?.map((field) => new Parse(field));

      return {
        fields: parsedFields || [],
        error: parseError(error, Object.assign(rest, options)),
      };
    }

    return { options };
  }

  private createResponse(
    response: Failure | Success,
  ): IValidateTemplate<Failure, Success> {
    if (response instanceof Failure) return { error: response };
    return { value: response };
  }
}

export default NotoreValidation;
