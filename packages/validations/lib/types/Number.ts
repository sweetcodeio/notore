import { Validation, ValidateResponse } from '@notore/core';

class NumberValidation extends Validation<number> {
  constructor() {
    super('number');
  }

  protected isValid(number: number): ValidateResponse {
    if (typeof number !== 'number') {
      const error = 'number';
      return { error, complete: true };
    }
  }
}

export default NumberValidation;
