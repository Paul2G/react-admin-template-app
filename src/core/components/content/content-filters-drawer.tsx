import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";

import { ContentFilters } from "~/core/components/content/content-filters";

import type { ContentFilterConfig } from "~/core/types/content";
import type { CommonDataRecord } from "~/core/types/fetch";

/** Component to render content filters component inside a drawer */
export function ContentFiltersDrawer({
  visible,
  onHide,
  filtersConfigs,
  filtersLabelsI18nNamespace,
  setSelectedFilters,
  selectedFilters,
  clearFilters,
}: ContentFiltersDrawerProps) {
  const { t } = useTranslation();

  return (
    <Sidebar
      visible={visible}
      onHide={onHide}
      header={t("nouns.filters")}
      position="right"
      className="overscroll-hidden relative h-full w-full max-w-[28rem]"
      pt={{
        header: {
          className: "text-xl font-semibold",
        },
        content: { className: "flex flex-col gap-4 justify-between" },
      }}
    >
      <ContentFilters
        className="flex flex-col gap-4 overflow-auto"
        {...{
          filtersConfigs,
          filtersLabelsI18nNamespace,
          selectedFilters,
          setSelectedFilters,
        }}
      />
      <div className="flex w-full justify-between">
        <Button
          severity="secondary"
          icon="ph ph-arrow-left"
          label={t("dialogs.back")}
          onClick={onHide}
        />
        <Button
          severity="warning"
          icon="ph ph-funnel-x"
          label={t("actions.clearFilters")}
          onClick={clearFilters}
        />
      </div>
    </Sidebar>
  );
}

type ContentFiltersDrawerProps = {
  /** Whether the drawer is visible */
  visible: boolean;
  /** Function to hide the drawer */
  onHide: () => void;
  /** Configuration for the filters */
  filtersConfigs: Record<string, ContentFilterConfig>;
  /** Namespace for filter labels i18n */
  filtersLabelsI18nNamespace?: string;
  /** Currently selected filters */
  selectedFilters: CommonDataRecord;
  /** Function to set selected filters */
  setSelectedFilters: (filters: CommonDataRecord) => void;
  /** Function to clear all filters */
  clearFilters: () => void;
};
