import ArrayValidation from './types/Array';
import Booleanvalidation from './types/Boolean';
import FunctionValidation from './types/Function';
import NumberValidation from './types/Number';
import ObjectValidation from './types/Object';
import StringValidation from './types/String';

class NotoreValidations {
  string(): StringValidation {
    return new StringValidation();
  }

  boolean(): Booleanvalidation {
    return new Booleanvalidation();
  }

  number(): NumberValidation {
    return new NumberValidation();
  }

  object(): ObjectValidation {
    return new ObjectValidation();
  }

  array(): ArrayValidation {
    return new ArrayValidation();
  }

  function(): FunctionValidation {
    return new FunctionValidation();
  }
}

export const validations = new NotoreValidations();

export default validations;
