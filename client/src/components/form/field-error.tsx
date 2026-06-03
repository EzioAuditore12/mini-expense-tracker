import type { AnyFieldMeta } from '@tanstack/react-form';
import type { ComponentProps } from 'react';

type FieldErrorProps = {
  meta: AnyFieldMeta;
} & ComponentProps<'p'>;

export const FieldError = ({ meta, ...props }: FieldErrorProps) => {
  if (!meta.isTouched) {
    return null;
  }
  return meta.errors.map(({ message }: { message: string }, index) => (
    <p key={index} className="text-red-500" {...props}>
      {message}
    </p>
  ));
};
