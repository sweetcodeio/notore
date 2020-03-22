import { IValidField } from '../types';

import { ERRORS } from './Constants';

export function parseError(error: string, options?: IValidField): string {
  if (options) {
    if (options.complete) return ERRORS.complete(error);
  }

  return error || '';
}
