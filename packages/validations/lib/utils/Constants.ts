export const REGEX = {
  EMAIL: {
    name: 'email',
    regex: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+([a-z]{2,10})$/,
    error: (t: string) => `${t} needs to be an email`,
  },
  ALPHA_NUMERIC: (force: boolean) => ({
    name: 'alphanumeric',
    regex: force ? /^[a-zA-Z0-9_ ]*\d+[a-zA-Z0-9_ ]*$/ : /^([\w_ ]+)$/,
    error: (t: string) => `${t} must be alphanumeric`,
  }),
};

// function transformError()
