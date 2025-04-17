import { type JSX } from "react";
import { useTranslation } from "react-i18next";
import { Column } from "primereact/column";
import { DataTable, type DataTableValue } from "primereact/datatable";

import { ContentTableCell } from "~/core/components";

import { type ContentTableColumnConfig } from "~/core/types/content";
import { getValue } from "~/core/utils/data";

export function ContentTable<T>({
  items,
  actionsSlot,
  extendedCellSlot,
  columnsConfig,
  selection,
  setSelection,
  dataKey = "id",
  headersI18nNamespace,
}: ContentTableProps<T>) {
  const { t } = useTranslation();

  const isSelectable = Boolean(selection && setSelection);

  return (
    <DataTable
      value={items as Array<DataTableValue>}
      tableStyle={{ minWidth: "50rem" }}
      selection={isSelectable ? selection : undefined}
      onSelectionChange={(e) => setSelection?.(e.value as Array<T>)}
      dataKey={dataKey}
      emptyMessage={
        <div className="flex min-h-[30vh] flex-col items-center justify-center gap-2 text-center">
          <span className="text-2xl font-bold">
            {t("dialogs.noResultsFound")}
          </span>
          <span>{t("dialogs.tryRemovingFilters")}</span>
        </div>
      }
    >
      {isSelectable && <Column selectionMode="multiple" />}
      {columnsConfig.map(({ key, type, propertyPath }) => (
        <Column
          field="code"
          header={t(`attribs.${key}`, { ns: headersI18nNamespace })}
          key={key}
          body={(item) => (
            <>
              {extendedCellSlot &&
                extendedCellSlot({
                  value: getValue(item, propertyPath),
                  type,
                })}
              <ContentTableCell
                value={getValue(item, propertyPath)}
                type={type}
              />
            </>
          )}
        />
      ))}
      {actionsSlot && (
        <Column
          header={t("attribs.actions")}
          body={(data) => actionsSlot({ item: data })}
        />
      )}
    </DataTable>
  );
}

type ContentTableProps<T> = {
  /** Items to display in the table */
  items: Array<T>;
  /** Slot for rendering action buttons for each item */
  actionsSlot?: (props: { item: T }) => JSX.Element;
  /** Slot for rendering custom cells in the table */
  extendedCellSlot?: (props: { value: unknown; type: string }) => JSX.Element;
  /** Configuration for the columns */
  columnsConfig: Array<ContentTableColumnConfig>;
  /** An array of items that represents the currently selected items in the table */
  selection?: Array<T>;
  /** A function that takes an array of items and updates the selection state */
  setSelection?: (items: Array<T>) => void;
  /** Render key for rows */
  dataKey?: string;
  /** Namespace for the headers translations */
  headersI18nNamespace?: string;
};
