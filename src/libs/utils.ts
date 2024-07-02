import React from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ZodError, ZodSchema, z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validate<T extends ZodSchema>(target: unknown, schema: T): asserts target is z.infer<T> {
  schema.parse(target);
}

export function isExist<T>(v: T | null | undefined): v is NonNullable<T> {
  return typeof v !== 'undefined' && v !== null;
}

export function assertIsExist<T>(v: T | null | undefined, target = ''): asserts v is NonNullable<T> {
  if (!isExist(v)) {
    throw new Error(`${target} should be specified`);
  }
}

export function parseAsPositiveInt(q: string | string[] | undefined) {
  const effect = z.number().positive().int();
  const val = Number(q);
  try {
    effect.parse(val);
    return val;
  } catch {
    return undefined;
  }
}

export function parseAsNonEmptyString(q: string | string[] | undefined) {
  if (typeof q === 'string' && q.length > 0) return q;
}

export const dataURLtoBuffer = (dataUrl: string) => {
  const data = dataUrl.split(',')[1];
  return Buffer.from(data, 'base64');
};

export function isCurrentLink(flag: boolean): React.AnchorHTMLAttributes<HTMLAnchorElement> {
  if (!flag) return {};
  return { 'aria-current': 'page' };
}

export function validateFormData<T extends ZodSchema>(formData: FormData, schema: T): z.infer<typeof schema> {
  return schema.parse(Object.fromEntries(formData));
}
export function transformFiledErrors(err: ZodError) {
  return Object.fromEntries(err.errors.map(({ path, message }) => [path[0], { message }]));
}
