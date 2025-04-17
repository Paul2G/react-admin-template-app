import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";
import { OverlayPanel } from "primereact/overlaypanel";

import { type ContentTableColumnConfig } from "~/core/types/content";

export function ContentTableColumnsSelector({
  columnsConfigs,
  columnsHeadersI18nNamespace = "common",
  selectedColumnKeys,
  setSelectedColumnKeys,
}: ContentTableColumnsSelectorProps) {
  const { t } = useTranslation();
  const popoverRef = useRef<OverlayPanel>(null);

  const togglePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (popoverRef.current) {
      popoverRef.current.toggle(event);
    }
  };

  return (
    <>
      <Button
        severity="secondary"
        tooltip={t("nouns.columns")}
        tooltipOptions={{ position: "top" }}
        icon="ph ph-columns-plus-right"
        className="aspect-square"
        onClick={togglePopover}
      />
      <OverlayPanel ref={popoverRef} pt={{ content: { className: "p-1" } }}>
        <ListBox
          value={selectedColumnKeys}
          options={[
            {
              label: t("actions.selectColumns"),
              items: columnsConfigs.map(({ key }) => key),
            },
          ]}
          optionGroupLabel="label"
          optionGroupChildren="items"
          multiple
          className="w-64 border-none !pb-0"
          onChange={(e) => setSelectedColumnKeys(e.value)}
          itemTemplate={(option) => (
            <>
              <i
                className={clsx(
                  "ph ph-check me-1",
                  !selectedColumnKeys.includes(option) && "opacity-0",
                )}
              />
              {t(`attribs.${option}`, { ns: columnsHeadersI18nNamespace })}
            </>
          )}
        />
      </OverlayPanel>
    </>
  );
}

type ContentTableColumnsSelectorProps = {
  columnsConfigs: Array<ContentTableColumnConfig>;
  columnsHeadersI18nNamespace?: string;
  selectedColumnKeys: string[];
  setSelectedColumnKeys: (keys: string[]) => void;
};
