import { useTranslation } from "react-i18next";
import { MultiSelect, type MultiSelectProps } from "primereact/multiselect";

import { InputWrapper } from "~/core/components";

import type { CommonInputProps } from "~/core/types/componentes";

export function MultiSelectInput({
  label,
  errorField,
  registerReturn,
  optionLabel,
  optionLabel2,
  ...restOfProps
}: MultiSelectInputProps) {
  const { t } = useTranslation();

  return (
    <InputWrapper label={label} errorField={errorField}>
      <MultiSelect
        display="chip"
        emptyFilterMessage={t("dialogs.noAvailableOptions")}
        optionLabel={optionLabel}
        {...registerReturn}
        {...restOfProps}
        pt={{ item: { className: "w-full" } }}
        itemTemplate={(option) => (
          <div className="flex w-full items-center justify-between gap-2">
            {optionLabel && <span>{option[optionLabel]}</span>}
            {optionLabel2 && (
              <span className="text-surface-500 text-sm">
                {option[optionLabel2]}
              </span>
            )}
          </div>
        )}
      />
    </InputWrapper>
  );
}

type MultiSelectInputProps = {
  /** The key to use as the secondary label in the dropdown item template. */
  optionLabel2?: string;
} & CommonInputProps &
  MultiSelectProps;
