export interface IValidateTemplate<Failure, Success> {
  error?: Failure;
  value?: Success;
}

export type TValidateOptions<T = {}> = T & {
  required?: boolean;
  key?: string;
};

export interface IValidField {
  options?: TValidateOptions;
  complete?: boolean;
  error?: string;
  fields?: IValidField[];
}

export interface IParsedFields {
  error: string;
}
