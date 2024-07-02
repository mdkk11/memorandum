import { z } from 'zod';

type ErrorBasic = {
  message: string;
  status: number;
};

export const errors = {
  400: { message: 'Bad Request', status: 400 },
  401: { message: 'Unauthorized', status: 401 },
  404: { message: 'Not Found', status: 401 },
  409: { message: 'Conflict ', status: 409 },
  500: { message: 'Internal Server Error', status: 500 },
};

export class FetchError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export type FieldErrors = Record<string, { message: string }>;

export type Error = ErrorBasic & {
  fieldErrors?: FieldErrors;
};

export const Status = {
  success: 'Success',
  error: 'Error',
  idle: 'idle',
} as const;

type Payload<T extends z.ZodType> = z.infer<T>;

export type InitialFormState<T extends z.ZodType> = Payload<T> & {
  status: (typeof Status)[keyof typeof Status];
  error: Error | null;
};
