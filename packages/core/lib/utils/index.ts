import { Errors } from './Constants';

import { ValidateField } from '../types';

export function isNull(value: unknown): boolean {
  return value === null || value === undefined;
}

export function parseError(error: string, options: ValidateField): string {
  if (options.complete) return Errors.Complete(error);

  return error;
}
