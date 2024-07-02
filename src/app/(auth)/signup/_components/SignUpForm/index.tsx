'use client';

import { SubmitButton } from '@/app/_components/SubmitButton';
import { AlertText } from '@/ui/AlertText';
import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';
import { useSignUpForm } from './useSignUpForm';

export const SignUpForm = () => {
  const { form, action, onSubmit, errorMessage } = useSignUpForm();
  return (
    <form action={action} className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      <Label className="font-semibold">名前</Label>
      <Input {...form.register('name')} />
      {errorMessage.name && <AlertText className="text-sm">{errorMessage.name}</AlertText>}
      <Label className="font-semibold">メールアドレス</Label>
      <Input {...form.register('email')} type="email" />
      {errorMessage.email && <AlertText className="text-sm">{errorMessage.email}</AlertText>}
      <Label className="font-semibold">パスワード</Label>
      <Input {...form.register('password')} autoComplete="on" type="password" />
      {errorMessage.password && <AlertText className="text-sm">{errorMessage.password}</AlertText>}
      <div className="py-2" />
      <SubmitButton iconProps={{ 'aria-label': '新規登録', type: 'send', className: 'scale-75' }} isLoading={form.formState.isSubmitting} variant={'default'}>
        新規登録
      </SubmitButton>
    </form>
  );
};
