import { IValidField } from '../types';

class NotoreParsedField {
  constructor(field: IValidField) {
    Object.assign(this, field);
  }
}

export default NotoreParsedField;
