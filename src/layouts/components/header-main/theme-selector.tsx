import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";

import { projectThemes } from "~/layouts/data/themes";
import { useLayoutTheme } from "~/layouts/hooks/use-layout-theme";
import type { ProjectTheme } from "~/layouts/types.ts";

export function ThemeSelector({ display = "icon" }: ThemeSelectorProps) {
  const { t } = useTranslation();
  const { selectedTheme, setSelectedTheme } = useLayoutTheme();

  function handleChangeLocale(e: DropdownChangeEvent) {
    setSelectedTheme(e.value);
  }

  return (
    <Dropdown
      value={selectedTheme}
      onChange={handleChangeLocale}
      options={projectThemes}
      className="h-10 w-full"
      pt={{
        input: { className: "flex items-center pe-0" },
      }}
      valueTemplate={(value: ProjectTheme) =>
        value &&
        (display === "label" ? (
          t(`layout.themes.${value.key}`)
        ) : (
          <i className={clsx(value.icon, "text-xl")} />
        ))
      }
      scrollHeight="400px"
      itemTemplate={(option: ProjectTheme) => (
        <div className="flex items-center gap-2">
          <i className={clsx(option.icon, "text-xl")} />
          <div>{t(`layout.themes.${option.key}`)}</div>
        </div>
      )}
    />
  );
}

export type ThemeSelectorProps = {
  display?: "icon" | "label";
};
