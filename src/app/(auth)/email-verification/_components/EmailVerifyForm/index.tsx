'use client';

import { Spinner } from '@/ui/Spinner';
import { useEmailVerifyForm } from './useEmailVerifyForm';

export const EmailVerifyForm = () => {
  const { state } = useEmailVerifyForm();

  return (
    <div className="flex min-h-40 w-full items-center justify-center">
      {state.status === 'idle' && <Spinner size={'lg'} />}
      {state.message && <div className={`${state.status ? 'bg-green-400' : ' bg-red-500'} rounded-md p-4 text-white`}>{state.message}</div>}
    </div>
  );
};
