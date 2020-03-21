import { Failure, Success } from '@notore/core';

import NotoreValidations from '../../lib';

describe('Object', () => {
  describe('Simulate Errors', () => {
    it('the value entered will not be valid, as it is not an object', () => {
      const { error } = NotoreValidations.object().validate('String');

      expect(error instanceof Failure).toBe(true);
    });

    it('the inserted object is empty, but has a mandatory property', () => {
      const { error } = NotoreValidations.object()
        .shape({
          shape: NotoreValidations.string().isRequired(),
        })
        .validate({});

      expect(error instanceof Failure).toBe(true);
    });
  });

  describe('Verification Success', () => {
    it('the inserted object will be validated', () => {
      const { value } = NotoreValidations.object().validate({});

      expect(value instanceof Success).toBe(true);
    });

    it('the inserted form will be validated, as it matches the root form', () => {
      const { value } = NotoreValidations.object()
        .shape({
          object: NotoreValidations.string(),
        })
        .validate({
          object: 'String',
        });

      expect(value instanceof Success).toBe(true);
    });
  });
});
