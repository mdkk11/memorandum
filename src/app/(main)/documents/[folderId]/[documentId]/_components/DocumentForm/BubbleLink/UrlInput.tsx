import React, { ComponentProps } from 'react';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';

type Props = {
  value: string;
  onChange: ComponentProps<typeof Input>['onChange'];
  onClick: ComponentProps<typeof Button>['onClick'];
};
export const UrlInput = ({ value, onChange, onClick }: Props) => {
  return (
    <div className="flex items-center gap-2 rounded-md bg-slate-50 p-3">
      <Input className="h-8" onChange={onChange} placeholder="https://..." value={value} />
      <Button className="h-8" onClick={onClick} size={'sm'}>
        適用
      </Button>
    </div>
  );
};
