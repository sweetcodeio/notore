import { Validation, ValidateResponse } from '@notore/core';

class BooleanValidation extends Validation<boolean> {
  constructor() {
    super('boolean');
  }

  protected isValid(boolean: boolean): ValidateResponse {
    if (typeof boolean !== 'boolean') {
      const error = 'boolean';
      return { error, complete: true };
    }
  }
}

export default BooleanValidation;
