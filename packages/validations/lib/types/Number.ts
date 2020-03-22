import { Validation, IValidField } from '@notore/core';

class NumberValidation extends Validation {
  constructor() {
    super('number');
  }

  protected isValid(number: number): IValidField | void {
    if (typeof number !== 'number') {
      const error = 'number';
      return { error, complete: true };
    }
  }
}

export default NumberValidation;
