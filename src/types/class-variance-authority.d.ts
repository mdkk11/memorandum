import { VariantProps } from 'class-variance-authority';

type NonNullableField<T> = {
  [P in keyof T]-?: Exclude<T[P], null | undefined>;
};

declare module 'class-variance-authority' {
  type NonNullableValiantProps<T> = NonNullableField<VariantProps<T>>;
}
