import { Failure, Success } from '@notore/core';

import NotoreValidations from '../lib';

describe('Valid', () => {
  it('no required value being successfully validated', () => {
    const { value } = NotoreValidations.string().validate(undefined);

    expect(value instanceof Success).toBe(true);
  });

  it('passing empty arguments waiting for error', () => {
    const { error } = NotoreValidations.string()
      .isRequired()
      .validate(undefined);

    expect(error instanceof Failure).toBe(true);
  });
});
