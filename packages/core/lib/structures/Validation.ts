import { parseError, isNull } from '../utils';
import Failure from './Failure';
import Parse from './Parse';
import Success from './Success';

import {
  ValidateField,
  CreateResponse,
  ValidateOptions,
  ValidateResponse,
  ValidateTemplate,
} from '../types';

interface IReviewItem {
  name: string;
  regex: RegExp;
  error: (t: string) => string;
}

abstract class NotoreValidation<T = any> {
  readonly name: string;

  protected required?: boolean;

  protected reviews: IReviewItem[] = [];

  protected abstract isValid(
    schema: T,
    options: ValidateOptions,
  ): ValidateResponse;

  constructor(name: string) {
    this.name = name;
  }

  public isRequired(): this {
    this.required = true;
    return this;
  }

  public validate(schema: T): ValidateTemplate<Failure, Success> {
    const { fields, error } = this.handleValidation(schema);

    return this.createResponse({ error, fields, schema });
  }

  public generateValidation<V = any>(
    value: T,
    options?: ValidateOptions<V>,
  ): ValidateField {
    return this.handleValidation(value, options);
  }

  private handleValidation(
    schema: T,
    options?: ValidateOptions,
  ): ValidateField {
    const { key } = options || {};
    const nullable = isNull(schema);
    const required = this.required && nullable;

    if (nullable && !this.required) return {};
    if (required) {
      const displayName = key && `${key} (${this.name})`;
      const error = `"${displayName || this.name}" is required`;

      return { error };
    }

    const response = this.isValid(schema, options || {});

    if (response && response.error) {
      const { error, fields, ...rest } = response;
      const parsedFields = fields?.map(field => new Parse(field));

      return {
        fields: parsedFields || [],
        error: parseError(error, Object.assign(rest, options)),
      };
    }

    return { options };
  }

  private createResponse({
    error,
    fields,
    schema,
  }: CreateResponse<T>): ValidateTemplate<Failure, Success> {
    if (error) return { error: new Failure(error, fields) };
    return { value: new Success(schema) };
  }
}

export default NotoreValidation;
