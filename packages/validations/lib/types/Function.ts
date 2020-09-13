import { Validation, ValidateResponse } from '@notore/core';

type FunctionType = (...props: any[]) => any;

class FunctionValidation extends Validation<FunctionType> {
  constructor() {
    super('function');
  }

  protected isValid(sendFunction: FunctionType): ValidateResponse {
    if (typeof sendFunction !== 'function') {
      const error = 'function';
      return { error, complete: true };
    }
  }
}

export default FunctionValidation;
