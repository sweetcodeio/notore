import { TValidateOptions, IValidateTemplate, IValidField } from '../types';

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
    const { error, fields } = this.handleValidation(schema);

    return this.createResponse(
      error
        ? new Failure(error, fields && new Parse(fields))
        : new Success(schema),
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
    return response || {};
  }

  private createResponse(
    response: Failure | Success,
  ): IValidateTemplate<Failure, Success> {
    const error = response instanceof Failure && response;
    const value = !error && response instanceof Success && response;

    return { error, value };
  }
}

export default NotoreValidation;
