import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState } from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Status, errors } from '@/libs/errors';
import { initialFormState } from '@/libs/state';
import { SignInSchema, SignUpSchema } from '@/schemas/auth';
import { checkVerificationToken, signUpAction } from './action';

export const useSignUpForm = () => {
  const [formState, action] = useFormState(signUpAction, initialFormState());

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit: SubmitHandler<z.infer<typeof SignInSchema>> = useCallback(
    async (data) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      try {
        const result = await checkVerificationToken(formData);
        if (result) {
          toast.success('確認メールを再送信しました');
          return;
        }
        const { status, error } = await signUpAction({}, formData);
        if (status === Status.error) {
          if (error?.status === errors[409].status) {
            toast.error('このメールアドレスは登録済みです');
            return;
          }
          toast.error('無効な認証です');
          return;
        }
        form.reset();
        toast.success('確認メールを送信しました');
      } catch (error) {
        toast.error('問題が発生しました');
        console.log(error);
      }
    },
    [form]
  );

  const errorMessage = {
    name: form.formState.errors['name']?.message ?? formState?.error?.fieldErrors?.['name'].message,
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
