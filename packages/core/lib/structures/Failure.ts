import Parse from './Parse';

class NotoreValidationFailure {
  message: string;

  fields?: Parse[];

  constructor(error: string | string, fields?: Parse[]) {
    this.message = error;
    this.fields = fields || [];
  }
}

export default NotoreValidationFailure;
