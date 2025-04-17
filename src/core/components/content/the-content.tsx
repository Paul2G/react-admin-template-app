import { type JSX } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import {
  ContentFiltersDrawer,
  ContentPaginator,
  ContentTable,
} from "~/core/components";
import { ContentTableColumnsSelector } from "~/core/components/content/content-table-columns-selector";
import { ContentTableSkeleton } from "~/core/components/content/content-table/content-table-skeleton";

import {
  useContentColumns,
  useContentFilters,
  useContentItems,
  useOpener,
} from "~/core/hooks";

/** A magic component that renders a content table with filters, columns, and pagination by a given configuration. */
export function TheContent<T>({
  searchInputFilter = "search",
  selectable,
  i18nNamespace,
  itemActionsSlot,
  valueExtendedCellSlot,
}: TheContentProps<T>) {
  const { t } = useTranslation();

  const {
    selectedFilters,
    setSelectedFilters,
    filtersConfig,
    areFiltersDirty,
    clearFilters,
  } = useContentFilters();
  const {
    selectedColumnsConfig,
    selectedColumnsKeys,
    setSelectedColumnsKeys,
    columnsConfig,
  } = useContentColumns();
  const { data, isLoading, selectedItems, setSelectedItems, error, doReload } =
    useContentItems<T>();

  const { isOpen, setClose, setOpen } = useOpener();

  const searchFilterConfig = filtersConfig?.[searchInputFilter];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-1">
        <div className="grow items-center">
          {searchFilterConfig?.type === "string" && (
            <InputText
              placeholder={
                t(`filters.${searchInputFilter}`, { ns: i18nNamespace }) + "..."
              }
              value={selectedFilters[searchFilterConfig.key] as string}
              className="w-full max-w-[24rem] min-w-0"
              onChange={({ target }) =>
                setSelectedFilters({
                  ...selectedFilters,
                  [searchFilterConfig.key]: target.value,
                })
              }
            />
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            severity={areFiltersDirty ? "contrast" : "secondary"}
            icon="ph ph-funnel"
            tooltip={t("nouns.filter_other")}
            tooltipOptions={{ position: "top" }}
            className="aspect-square"
            onClick={setOpen}
          />
          <ContentTableColumnsSelector
            columnsConfigs={columnsConfig}
            selectedColumnKeys={selectedColumnsKeys}
            setSelectedColumnKeys={setSelectedColumnsKeys}
            columnsHeadersI18nNamespace={i18nNamespace}
          />
          <Button
            severity="secondary"
            tooltip={t("actions.reload")}
            tooltipOptions={{ position: "top" }}
            icon="ph ph-arrow-clockwise text-lg"
            className="aspect-square"
            onClick={doReload}
          />
        </div>
      </div>
      <ContentFiltersDrawer
        visible={isOpen}
        onHide={setClose}
        filtersConfigs={filtersConfig}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        clearFilters={clearFilters}
        filtersLabelsI18nNamespace={i18nNamespace}
      />
      {error && (
        <div className="flex min-h-[30vh] flex-col items-center justify-center gap-2 text-center">
          <span className="text-2xl font-bold">
            {t("dialogs.loadingDataError")}
          </span>
          <span>{t("dialogs.tryAgainLater")}</span>
        </div>
      )}
      {isLoading && (
        <ContentTableSkeleton
          columnsConfig={selectedColumnsConfig}
          headersI18nNamespace={i18nNamespace}
          hasActions={Boolean(itemActionsSlot)}
          selectable={selectable}
        />
      )}
      {data && !isLoading && (
        <ContentTable
          items={data.items}
          columnsConfig={selectedColumnsConfig}
          headersI18nNamespace={i18nNamespace}
          selection={selectable ? selectedItems : undefined}
          setSelection={selectable ? setSelectedItems : undefined}
          actionsSlot={itemActionsSlot}
          extendedCellSlot={valueExtendedCellSlot}
        />
      )}
      {filtersConfig?.page && filtersConfig?.limit && (
        <ContentPaginator
          totalItems={data?.meta?.total}
          currentPage={selectedFilters.page as number}
          setCurrentPage={(n) =>
            setSelectedFilters({ ...selectedFilters, page: n })
          }
          itemsPerPage={selectedFilters.limit as number}
          setItemsPerPage={(n) =>
            setSelectedFilters({ ...selectedFilters, limit: n })
          }
        />
      )}
    </div>
  );
}

type TheContentProps<T> = {
  /** Filter to be used for the search input */
  searchInputFilter?: string;
  /** Whether the table should be selectable */
  selectable?: boolean;
  /** The i18n namespace for filters and attribs */
  i18nNamespace?: string;
  /** Function to render custom actions for each item */
  itemActionsSlot?: (props: { item: T }) => JSX.Element;
  /** Slot for rendering custom cells in the table */
  valueExtendedCellSlot?: (props: {
    /* Property extracted from the item by the property path */
    value: unknown;
    /** Type of the current cell value from columns config */
    type: string;
  }) => JSX.Element;
};
