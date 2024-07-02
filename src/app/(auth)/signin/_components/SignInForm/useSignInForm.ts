import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Status } from '@/libs/errors';
import { initialFormState } from '@/libs/state';
import { SignInSchema } from '@/schemas/auth';
import { signInAction } from './action';

export const useSignInForm = () => {
  const { push } = useRouter();
  const [formState, action] = useFormState(signInAction, initialFormState());

  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<z.infer<typeof SignInSchema>> = useCallback(
    async (data) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      try {
        const { status } = await signInAction({}, formData);
        if (status === Status.error) {
          toast.error('無効な認証です');
          return;
        }
        toast.success('ログインに成功しました');
      } catch (error) {
        toast.error('問題が発生しました');
        console.log(error);
      }
      push('/');
    },
    [push]
  );

  const errorMessage = {
    email: form.formState.errors['email']?.message ?? formState?.error?.fieldErrors?.['email'].message,
    password: form.formState.errors['password']?.message ?? formState?.error?.fieldErrors?.['password'].message,
  };

  return {
    action,
    formState,
    form,
    onSubmit,
    errorMessage,
  };
};
