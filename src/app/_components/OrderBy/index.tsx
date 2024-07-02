'use client';

import React from 'react';
import { Select } from '@/ui/Select';
import { useOrderBy } from './useOrderBy';

const options = [
  { value: 'index', label: '並び順' },
  { value: 'updatedAt', label: '更新順' },
];

export const OrderBy = () => {
  const { defaultValue, onChangeHandler } = useOrderBy();
  return (
    <Select defaultValue={defaultValue} onChange={onChangeHandler}>
      {options.map(({ value, label }) => (
        <option key={label} value={value}>
          {label}
        </option>
      ))}
    </Select>
  );
};
