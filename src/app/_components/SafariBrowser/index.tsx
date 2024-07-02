import { ReactNode } from 'react';

export const SafariBrowser = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto min-h-[300px] w-full overflow-hidden rounded-xl border bg-white shadow">
      <div className="flex h-10 items-center gap-2 border-b bg-gray-100 px-6">
        <span className="size-3 rounded-full bg-[#FD4646]"></span>
        <span className="size-3 rounded-full bg-[#FCB024]"></span>
        <span className="size-3 rounded-full bg-[#28C131]"></span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};
