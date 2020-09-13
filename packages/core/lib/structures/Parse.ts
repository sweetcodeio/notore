import { ValidateField } from '../types';

class NotoreParsedField {
  constructor(field: ValidateField) {
    Object.assign(this, field);
  }
}

export default NotoreParsedField;
