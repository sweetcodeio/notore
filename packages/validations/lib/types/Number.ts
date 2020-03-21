import { Validation, IValidField } from '@notore/core';

class NumberValidation extends Validation {
  constructor() {
    super('number');
  }

  protected isValid(number: number): IValidField | void {
    if (typeof number !== 'number') {
      return {
        error: 'The validation entered is not an number',
      };
    }
  }
}

export default NumberValidation;
