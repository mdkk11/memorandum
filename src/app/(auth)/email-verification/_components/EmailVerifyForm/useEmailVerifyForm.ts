import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Status } from '@/libs/errors';
import { verifyEmail } from './action';

export const useEmailVerifyForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [state, setState] = useState<{ status: (typeof Status)[keyof typeof Status]; message?: string }>({ status: 'idle', message: '' });
  const router = useRouter();

  const onSubmit = useCallback(async () => {
    console.log(state.status);

    if (state.status !== 'idle') {
      return;
    }

    if (!token) {
      router.push('/signin');
      return;
    }

    const { status, error } = await verifyEmail(token);

    if (status === 'Success') {
      setState({ status: 'Success', message: 'ユーザー登録が完了しました' });
    } else if (status === 'Error') {
      setState({ status: 'Error', message: error?.message });
    }

    setTimeout(() => {
      router.push('/signin');
    }, 3000);
  }, [token, state.status, router]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return { state };
};
