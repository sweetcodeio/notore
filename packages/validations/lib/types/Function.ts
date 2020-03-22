import { Validation, IValidField } from '@notore/core';

class FunctionValidation extends Validation {
  constructor() {
    super('function');
  }

  protected isValid(sendFunction: Function): IValidField | void {
    if (typeof sendFunction !== 'function') {
      const error = 'function';
      return { error, complete: true };
    }
  }
}

export default FunctionValidation;
