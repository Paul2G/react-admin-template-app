import { Calendar, type CalendarProps } from "primereact/calendar";

import { InputWrapper } from "~/core/components";

import type { CommonInputProps } from "~/core/types/componentes";

export function DatetimeInput({
  label,
  errorField,
  registerReturn,
  ...restOfProps
}: DatetimeInputProps) {
  return (
    <InputWrapper label={label} errorField={errorField}>
      <Calendar {...registerReturn} {...restOfProps} />
    </InputWrapper>
  );
}

export type DatetimeInputProps = CommonInputProps & CalendarProps;
