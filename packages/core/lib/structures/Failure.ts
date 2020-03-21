import ParsedFields from './Parse';

class NotoreValidationFailure {
  message: string;

  fields?: ParsedFields;

  constructor(message: string, fields?: ParsedFields) {
    this.message = message;
    this.fields = fields || [];
  }
}

export default NotoreValidationFailure;
