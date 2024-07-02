import { ZodType } from 'zod';
import { InitialFormState, Error, errors, Status } from '@/libs/errors';

export type FormState<T extends ZodType> = Partial<InitialFormState<T>>;

export const initialFormState = <T extends ZodType>(initialState?: Partial<InitialFormState<T>>): FormState<T> => ({
  error: null,
  status: Status.idle,
  ...initialState,
});

export const handleSuccess = <T extends ZodType>(prevState: FormState<T>): FormState<T> => ({
  ...prevState,
  status: Status.success,
});

export const handleError = <T extends ZodType>(prevState: FormState<T>, error: Error): FormState<T> => ({
  ...prevState,
  ...errors[400],
  status: Status.error,
  error,
});
