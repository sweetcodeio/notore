export interface ParsedFields {
  error: string;
}

export interface ValidateTemplate<Failure, Success> {
  error?: Failure;
  value?: Success;
}

export type ValidateOptions<T = any> = T & {
  key?: string;
  required?: boolean;
};

export interface ValidateField {
  error?: string;
  complete?: boolean;
  fields?: ValidateField[];
  options?: ValidateOptions;
}

export interface CreateResponse<S = any> {
  schema: S;
  error: ValidateField['error'];
  fields: ValidateField['fields'];
}

export type ValidateResponse = ValidateField | void;
