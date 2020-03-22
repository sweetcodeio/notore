import { Failure, Success } from '@notore/core';

import NotoreValidations from '../../lib';

describe('Function', () => {
  describe('Simulate Errors', () => {
    it('the value entered will not be valid as it is not a function', () => {
      const { error } = NotoreValidations.function().validate({});

      expect(error instanceof Failure).toBe(true);
    });
  });

  describe('Verification Success', () => {
    it('the function entered will be validated', () => {
      const { value } = NotoreValidations.function().validate(() => 'Function');

      expect(value instanceof Success).toBe(true);
    });
  });
});
