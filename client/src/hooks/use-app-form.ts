import { createFormHook } from '@tanstack/react-form';

import { fieldContext, formContext } from '@/lib/form-context';

import { SubmitButton } from '@/components/form/submit-button';
import { InputField } from '@/components/form/input-field';
import { SelectField } from '@/components/form/select-field';
import { DatePickerField } from '@/components/form/date-picker-field';

/**
 * App-wide form hook factory using TanStack Form.
 * Pre-registers shared field components (Input, Select, DatePicker) and
 * form-level components (SubmitButton) so every form gets a consistent
 * look and behavior without re-importing individual field components.
 */
export const { useAppForm } = createFormHook({
  fieldComponents: {
    InputField,
    SelectField,
    DatePickerField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
