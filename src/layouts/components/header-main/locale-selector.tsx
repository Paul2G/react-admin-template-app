import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";

import { projectLocales } from "~/layouts/data/locales";
import { useLayoutLocale } from "~/layouts/hooks/use-layout-locale";
import type { ProjectLocale } from "~/layouts/types.ts";

export function LocaleSelector({ display = "icon" }: LocaleSelectorProps) {
  const { selectedLocale, setSelectedLocale } = useLayoutLocale();

  async function handleChangeLocale(e: DropdownChangeEvent) {
    setSelectedLocale(e.value);
  }

  return (
    <Dropdown
      value={selectedLocale}
      onChange={handleChangeLocale}
      options={projectLocales}
      optionLabel="languageLabel"
      checkmark
      className="h-10 w-full"
      pt={{
        input: { className: "flex items-center pe-0" },
      }}
      valueTemplate={(option: ProjectLocale) =>
        display === "label" ? (
          option.languageLabel
        ) : (
          <i className="ph ph-translate text-xl" />
        )
      }
    />
  );
}

export type LocaleSelectorProps = {
  display?: "icon" | "label";
};
