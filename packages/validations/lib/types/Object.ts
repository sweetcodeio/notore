import { Validation, IValidField, TValidateOptions } from '@notore/core';

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

  protected isValid(
    object: object,
    { key }: TValidateOptions,
  ): IValidField | void {
    if (!(object instanceof Object)) {
      const error = 'object';
      return { error, complete: true };
    }

    const shape = this._shapeConfig;
    if (shape) {
      const fields = Object.entries(shape)
        .map(
          ([objKey, validation]): IValidField => {
            const value = object[objKey];
            return validation.generateValidation<IViewValidationArgs>(value, {
              value,
              key: (key && `${key}.${objKey}`) || objKey,
            });
          },
        )
        .filter(validator => validator.error);

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
