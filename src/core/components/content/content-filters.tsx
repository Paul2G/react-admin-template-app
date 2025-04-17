import { useTranslation } from "react-i18next";
import clsx from "clsx";

import {
  DatetimeInput,
  MultiSelectInput,
  SelectButtonsInput,
  SelectInput,
  TextInput,
} from "~/core/components";

import { ContentFilterInput } from "~/core/constants/content";
import type { ContentFilterConfig } from "~/core/types/content";
import type { CommonDataRecord } from "~/core/types/fetch";

/** Component to render content filters inputs by a given config object */
export function ContentFilters({
  filtersConfigs = {},
  filtersLabelsI18nNamespace,
  selectedFilters,
  setSelectedFilters,
  className,
}: ContentFiltersProps) {
  const { t } = useTranslation();

  function generateOptionsObjects<T>({
    options,
    optionsI18n,
  }: {
    options?: Array<T> | null;
    optionsI18n?: string;
  }) {
    if (!options) return options;

    return options.map((option) => ({
      value: option,
      label: optionsI18n ? t(`${optionsI18n}.${option}`) : option,
    }));
  }

  return (
    <div className={clsx(className)}>
      {Object.entries(filtersConfigs).map(
        ([
          label,
          {
            key,
            input,
            options,
            optionValue,
            optionLabel,
            optionLabel2,
            optionsI18n,
            showClear,
            allowEmpty,
            loading,
          },
        ]) => {
          if (!input) return null;

          const finalLabel = t(`filters.${label}`, {
            ns: filtersLabelsI18nNamespace,
          });
          const finalOptions = optionLabel
            ? options
            : generateOptionsObjects({ options, optionsI18n });
          const finalOptionValue = optionLabel ? optionValue : "value";
          const finalOptionLabel = optionLabel ? optionLabel : "label";

          switch (input) {
            case ContentFilterInput.TEXT:
              return (
                <TextInput
                  key={key}
                  label={finalLabel}
                  placeholder={t("placeholders.writeHere")}
                  value={selectedFilters[key] as string}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      [key]: e.target.value,
                    })
                  }
                />
              );
            case ContentFilterInput.SELECT_BUTTONS:
              return (
                <SelectButtonsInput
                  key={key}
                  label={finalLabel}
                  value={selectedFilters[key]}
                  allowEmpty={allowEmpty}
                  options={finalOptions as Array<unknown>}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      [key]: e.target.value,
                    })
                  }
                />
              );
            case ContentFilterInput.SELECT:
              return (
                <SelectInput
                  key={key}
                  label={finalLabel}
                  placeholder={t("placeholders.selectOne")}
                  value={selectedFilters[key]}
                  options={finalOptions as Array<unknown>}
                  optionValue={finalOptionValue}
                  optionLabel={finalOptionLabel}
                  optionLabel2={optionLabel2}
                  showClear={showClear}
                  loading={loading}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      [key]: e.target.value,
                    })
                  }
                />
              );
            case ContentFilterInput.MULTISELECT:
              return (
                <MultiSelectInput
                  key={key}
                  label={finalLabel}
                  value={selectedFilters[key]}
                  placeholder={t("placeholders.selectOneOrMore")}
                  options={finalOptions as Array<unknown>}
                  optionValue={finalOptionValue}
                  optionLabel={finalOptionLabel}
                  optionLabel2={optionLabel2}
                  showClear={showClear}
                  loading={loading}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      [key]: e.value,
                    })
                  }
                />
              );
            case ContentFilterInput.DATETIME:
              return (
                <DatetimeInput
                  key={key}
                  label={finalLabel}
                  value={selectedFilters[key] as Date}
                  placeholder={t("placeholders.selectADate")}
                  showButtonBar={true}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      [key]: e.value as Date,
                    })
                  }
                />
              );
            default:
              return <div>{label}</div>;
          }
        },
      )}
    </div>
  );
}

type ContentFiltersProps = {
  /** Configuration for the filters */
  filtersConfigs: Record<string, ContentFilterConfig>;
  /** Namespace for filter labels i18n */
  filtersLabelsI18nNamespace?: string;
  /** Currently selected filters */
  selectedFilters: CommonDataRecord;
  /** Function to set selected filters */
  setSelectedFilters: (filters: CommonDataRecord) => void;
  /** Additional class names for styling */
  className?: string;
};
