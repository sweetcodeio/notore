import { Validation, IValidField } from '@notore/core';

interface IViewValidationArgs {
  value: any;
}

interface IShapeBuild {
  [key: string]: Validation;
}

class ObjectValidation extends Validation {
  private _shapeConfig?: { [key: string]: Validation };

  constructor() {
    super('object');
  }

  protected isValid(object: object): IValidField | void {
    if (!(object instanceof Object)) {
      const error = 'The validation entered is not an object';
      return { error };
    }

    const shape = this._shapeConfig;
    if (shape) {
      const fields = Object.entries(shape)
        .map(
          ([key, validation]): IValidField => {
            const value = object[key];
            return validation.generateValidation<IViewValidationArgs>(value, {
              value,
              key,
            });
          },
        )
        .filter(validators => validators.error);

      if (fields.length) {
        const { error } = fields[0];
        return { error, fields };
      }
    }
  }

  shape(shapeConfig: IShapeBuild): this {
    this._shapeConfig = shapeConfig;
    return this;
  }
}

export default ObjectValidation;
