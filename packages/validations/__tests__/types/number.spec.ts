import { Failure, Success } from '@notore/core';

import NotoreValidations from '../../lib';

describe('Number', () => {
  describe('Simulate Errors', () => {
    it('the value entered will not be valid as it is not a number', () => {
      const { error } = NotoreValidations.number().validate({});

      expect(error instanceof Failure).toBe(true);
    });
  });

  describe('Verification Success', () => {
    it('the number entered will be validated', () => {
      const { value } = NotoreValidations.number().validate(10);

      expect(value instanceof Success).toBe(true);
    });
  });
});
