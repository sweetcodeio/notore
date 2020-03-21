import { Validation, IValidField } from '@notore/core';

class BooleanValidation extends Validation {
  constructor() {
    super('boolean');
  }

  protected isValid(boolean: boolean): IValidField | void {
    if (typeof boolean !== 'boolean') {
      return {
        error: 'The validation entered is not an boolean',
      };
    }
  }
}

export default BooleanValidation;
