import { SelectButton, type SelectButtonProps } from "primereact/selectbutton";

import { InputWrapper } from "~/core/components";

import type { CommonInputProps } from "~/core/types/componentes";

export function SelectButtonsInput({
  label,
  registerReturn,
  errorField,
  ...restOfProps
}: SelectButtonsInputProps) {
  return (
    <InputWrapper label={label} errorField={errorField}>
      <SelectButton
        {...registerReturn}
        {...restOfProps}
        pt={{ root: { className: "flex" }, button: { className: "grow" } }}
      />
    </InputWrapper>
  );
}

export type SelectButtonsInputProps = CommonInputProps & SelectButtonProps;
