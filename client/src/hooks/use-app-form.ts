import { createFormHook } from '@tanstack/react-form';

import { fieldContext, formContext } from '@/lib/form-context';

import { SubmitButton } from '@/components/form/submit-button';
import { InputField } from '@/components/form/input-field';

export const { useAppForm } = createFormHook({
  fieldComponents: {
    InputField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
