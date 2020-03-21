export interface IValidateTemplate<Failure, Success> {
  error?: Failure | false;
  value?: Success | false;
}

export type TValidateOptions<T = {}> = T & {
  required?: boolean;
  key?: string;
};

export interface IValidField {
  error?: string;
  fields?: object[];
}

export interface IParsedFields {
  error: string;
}
