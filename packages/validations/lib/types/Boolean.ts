import { Validation, IValidField } from '@notore/core';

class BooleanValidation extends Validation {
  constructor() {
    super('boolean');
  }

  protected isValid(boolean: boolean): IValidField | void {
    if (typeof boolean !== 'boolean') {
      const error = 'boolean';
      return { error, complete: true };
    }
  }
}

export default BooleanValidation;
