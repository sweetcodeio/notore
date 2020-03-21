import { Failure, Success } from '@notore/core';

import NotoreValidations from '../../lib';

describe('Array', () => {
  describe('Simulate Errors', () => {
    it('the entered value will not be validated, as it is not an array', () => {
      const { error } = NotoreValidations.array().validate({});

      expect(error instanceof Failure).toBe(true);
    });

    it('the inserted array will not be validated, as it does not have values ​​corresponding to the expected', () => {
      const { error } = NotoreValidations.array()
        .validations([NotoreValidations.number()])
        .validate(['String']);

      expect(error instanceof Failure).toBe(true);
    });
  });

  describe('Verification Success', () => {
    it('the array entered will be validated', () => {
      const { value } = NotoreValidations.array().validate([]);

      expect(value instanceof Success).toBe(true);
    });

    it('the inserted array will be validated, as its value matches the expected type', () => {
      const { value } = NotoreValidations.array()
        .validations([NotoreValidations.string(), NotoreValidations.number()])
        .validate(['String', 10]);

      expect(value instanceof Success).toBe(true);
    });
  });
});
