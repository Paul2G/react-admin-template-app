import { InputText, type InputTextProps } from "primereact/inputtext";

import { InputWrapper } from "~/core/components/inputs/input-wrapper";

import { type CommonInputProps } from "~/core/types/componentes";

/** TextInput is a component that wraps an input field with a label and error message display. */
export function TextInput({
  label,
  errorField,
  registerReturn,
  className,
  inputClassName,
  ...restOfProps
}: TextInputProps) {
  return (
    <InputWrapper label={label} errorField={errorField} className={className}>
      <InputText
        invalid={Boolean(errorField?.message)}
        className={inputClassName}
        {...registerReturn}
        {...restOfProps}
      />
    </InputWrapper>
  );
}

type TextInputProps = {
  /** Additional class names for the wrapper element. */
  className?: string;
  /** Additional class names for the input element. */
  inputClassName?: string;
} & CommonInputProps &
  InputTextProps;
