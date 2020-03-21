import { IValidField } from '../types';

class NotoreParseFields extends Array<IValidField> {
  constructor(fields: IValidField[]) {
    super(...fields);
  }
}

export default NotoreParseFields;
