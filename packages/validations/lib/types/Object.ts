import {
  Validation,
  ValidateField,
  ValidateOptions,
  ValidateResponse,
} from '@notore/core';

interface ViewValidationArgs {
  value: any;
}

interface ObjectType {
  [key: string]: any;
}

interface ShapeBuild {
  [key: string]: Validation;
}

class ObjectValidation extends Validation<ObjectType> {
  private _shapeConfig?: ShapeBuild;

  constructor() {
    super('object');
  }

  public shape(shapeConfig: ShapeBuild): this {
    this._shapeConfig = shapeConfig;
    return this;
  }

  protected isValid(
    object: ObjectType,
    { key }: ValidateOptions,
  ): ValidateResponse {
    if (!(object instanceof Object)) {
      const error = 'object';
      return { error, complete: true };
    }

    const shape = this._shapeConfig;

    if (shape) {
      const fields = Object.entries(shape)
        .map(
          ([objKey, validation]): ValidateField => {
            const value = object[objKey];
            return validation.generateValidation<ViewValidationArgs>(value, {
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
}

export default ObjectValidation;
