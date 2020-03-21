import { Failure, Success } from '@notore/core';

import NotoreValidations from '../../lib';

describe('String', () => {
  describe('Simulate Errors', () => {
    it('the value entered will not be valid, as it is not a string', () => {
      const { error } = NotoreValidations.string().validate({});

      expect(error instanceof Failure).toBe(true);
    });

    it('the entered value will not be valid, as it does not match the inserted matrix', () => {
      const { error } = NotoreValidations.string()
        .values(['String'])
        .validate('Error');

      expect(error instanceof Failure).toBe(true);
    });

    describe('Email', () => {
      it('the value entered will not be validated, as it is not a valid email', () => {
        const { error } = NotoreValidations.string()
          .email()
          .validate('String');

        expect(error instanceof Failure).toBe(true);
      });

      it('the shape of the inserted object will not be validated, as it is not a valid email', () => {
        const { error } = NotoreValidations.object()
          .shape({
            email: NotoreValidations.string().email(),
          })
          .validate({
            email: 'String',
          });

        expect(error instanceof Failure).toBe(true);
      });
    });

    describe('Alpha Numeric', () => {
      it('the value entered will not be validated, as it does not contain letters and numbers (force true)', () => {
        const { error } = NotoreValidations.string()
          .alphanumeric(true)
          .validate('String');

        expect(error instanceof Failure).toBe(true);
      });
    });
  });

  describe('Verification Success', () => {
    it('the entered string will be validated', () => {
      const { value } = NotoreValidations.string().validate('String');

      expect(value instanceof Success).toBe(true);
    });

    it('the entered value will be validated, as it matches the entered value matrix', () => {
      const { value } = NotoreValidations.string()
        .values(['StringValue'])
        .validate('StringValue');

      expect(value instanceof Success).toBe(true);
    });

    describe('Email', () => {
      it('the value entered will be validated, as it is a valid email', () => {
        const { value } = NotoreValidations.string()
          .email()
          .validate('string@email.com');

        expect(value instanceof Success).toBe(true);
      });

      it('the shape of the inserted object will be validated, as it has a valid email', () => {
        const { value } = NotoreValidations.object()
          .shape({
            email: NotoreValidations.string().email(),
          })
          .validate({
            email: 'string@email.com',
          });

        expect(value instanceof Success).toBe(true);
      });
    });

    describe('Alpha Numeric', () => {
      it('the value entered will be validated, because it contains only letters', () => {
        const { value } = NotoreValidations.string()
          .alphanumeric()
          .validate('String');

        expect(value instanceof Success).toBe(true);
      });

      it('the value entered will be validated, because it only contains letters and numbers (force true)', () => {
        const { value } = NotoreValidations.string()
          .alphanumeric(true)
          .validate('String123');

        expect(value instanceof Success).toBe(true);
      });
    });
  });
});
