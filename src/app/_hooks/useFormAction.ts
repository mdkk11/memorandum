import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm, UseFormProps } from 'react-hook-form';
import { z } from 'zod';

type UseFormActionProps<TFieldValues extends FieldValues = FieldValues, TContext = any> = UseFormProps<TFieldValues, TContext> & {
  schema: z.Schema<any, any>;
};

export function useFormAction<TFieldValues extends FieldValues = FieldValues, TContext = any>({ schema, ...props }: UseFormActionProps<TFieldValues, TContext>) {
  const form = useForm({
    ...props,
    resolver: zodResolver(schema),
  });

  const handleAction = async (onAction: SubmitHandler<TFieldValues>) => {
    const valid = await form.trigger();
    if (valid) {
      return onAction(schema.parse(form.getValues()));
    }
  };
  const submitAction = (onAction: (formData: TFieldValues) => void) => {
    if (form.formState.isValid) {
      return { action: () => onAction(form.getValues()) };
    }
    return { onSubmit: form.handleSubmit(() => {}) };
  };

  return {
    ...form,
    handleAction,
    submitAction,
  };
}
