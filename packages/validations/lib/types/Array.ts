import { Validation, IValidField } from '@notore/core';

class ArrayValidation extends Validation {
  private _validations?: Validation[];

  constructor() {
    super('array');
  }

  protected isValid(array: any[]): IValidField | void {
    if (!(array instanceof Array)) {
      const error = 'array';
      return { error, complete: true };
    }

    const validations = this._validations;
    if (validations) {
      const fields: IValidField[] = array.reduce(
        (reduceArray: any[], current, index) => {
          const response = validations
            .map((validation) => validation.generateValidation(current))
            .filter((validation) => validation.error)
            .find(
              (element, _, responseArray) =>
                element.error && responseArray.length === validations.length,
            );
          return reduceArray.concat((response && { ...response, index }) || []);
        },
        [],
      );

      if (fields.length) {
        const { error } = fields[0];
        return { error, fields };
      }
    }
  }

  validations(validations: Validation[]): this {
    this._validations = validations;
    return this;
  }
}

export default ArrayValidation;
