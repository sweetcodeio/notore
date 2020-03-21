import { Success } from '@notore/core';

import NotoreValidations from '../lib';

describe('Complex', () => {
  it('different types in an object shape', () => {
    const { value } = NotoreValidations.object()
      .shape({
        number: NotoreValidations.number(),
        string: NotoreValidations.string(),
        email: NotoreValidations.string().email(),
        object: NotoreValidations.object().shape({
          number: NotoreValidations.number(),
          string: NotoreValidations.string(),
          values: NotoreValidations.string().values(['StringValue']),
        }),
      })
      .validate({
        number: 10,
        string: 'String',
        email: 'email@test.com',
        object: {
          number: 10,
          string: 'String',
          values: 'StringValue',
        },
      });

    expect(value instanceof Success).toBe(true);
  });
});
