import { Failure, Success } from '@notore/core';

import NotoreValidations from '../../lib';

describe('Boolean', () => {
  describe('Simulate Errors', () => {
    it('the value entered will not be valid as it is not boolean', () => {
      const { error } = NotoreValidations.boolean().validate({});

      expect(error instanceof Failure).toBe(true);
    });
  });

  describe('Verification Success', () => {
    it('the entered boolean will be validated', () => {
      const { value } = NotoreValidations.boolean().validate(true);

      expect(value instanceof Success).toBe(true);
    });
  });
});
