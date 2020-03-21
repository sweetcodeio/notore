import ArrayValidation from './types/Array';
import Booleanvalidation from './types/Boolean';
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
}

export default new NotoreValidations();
