import { useTranslation } from "react-i18next";
import { Dropdown, type DropdownProps } from "primereact/dropdown";

import { InputWrapper } from "~/core/components";

import type { CommonInputProps } from "~/core/types/componentes";

/** Component that wraps a dropdown field with a label and error message display.*/
export function SelectInput({
  label,
  errorField,
  registerReturn,
  optionLabel,
  optionLabel2,
  ...restOfProps
}: SelectInputProps) {
  const { t } = useTranslation();

  return (
    <InputWrapper label={label} errorField={errorField}>
      <Dropdown
        emptyFilterMessage={t("dialogs.noAvailableOptions")}
        optionLabel={optionLabel}
        {...registerReturn}
        {...restOfProps}
        pt={{ itemLabel: { className: "w-full" } }}
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

type SelectInputProps = {
  /** The key to use as the secondary label in the dropdown item template. */
  optionLabel2?: string;
} & CommonInputProps &
  DropdownProps;
