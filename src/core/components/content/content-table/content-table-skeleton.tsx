import { useTranslation } from "react-i18next";
import { Column } from "primereact/column";
import { DataTable, type DataTableValue } from "primereact/datatable";
import { Skeleton } from "primereact/skeleton";

import { ContentTableColumnType } from "~/core/constants/content";
import { type ContentTableColumnConfig } from "~/core/types/content";

export function ContentTableSkeleton({
  columnsConfig,
  headersI18nNamespace,
  count = 10,
  hasActions,
  selectable,
}: ContentTableSkeletonProps) {
  const { t } = useTranslation();

  return (
    <DataTable value={Array.from({ length: count }) as DataTableValue[]}>
      {selectable && (
        <Column v-if="selectable" body={<Skeleton width={"1rem"} />} />
      )}
      {columnsConfig.map(({ key, type }) => (
        <Column
          key={key}
          body={(_, options) => (
            <ContentTableCellSkeleton type={type} index={options.rowIndex} />
          )}
          header={t(`attribs.${key}`, { ns: headersI18nNamespace })}
        />
      ))}
      {hasActions && (
        <Column
          header={t("attribs.actions")}
          body={
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="!size-[2.35rem]" />
              ))}
            </div>
          }
        />
      )}
    </DataTable>
  );
}

export function ContentTableCellSkeleton({
  type,
  index,
}: ContentTableSkeletonCellProps) {
  function getPseudoRandom(min: number, max: number, seed: number) {
    return (((seed * 16807) % 2147483647) % (max - min)) + min;
  }

  switch (type) {
    case ContentTableColumnType.ID:
    case ContentTableColumnType.NUMBER:
      return <Skeleton width={`${getPseudoRandom(1, 2, index)}rem`} />;
    case ContentTableColumnType.TAGS:
    case ContentTableColumnType.STATUS:
      return (
        <Skeleton
          className="!h-[1.625rem]"
          width={`${getPseudoRandom(3, 6, index)}rem`}
        />
      );
    case ContentTableColumnType.URL:
    case ContentTableColumnType.SHOPIFY_URL:
    case ContentTableColumnType.INSTAGRAM:
    case ContentTableColumnType.EMAIL:
      return (
        <Skeleton
          className="!h-8"
          width={`${getPseudoRandom(6, 10, index)}rem`}
        />
      );
    case ContentTableColumnType.DATETIME:
      return <Skeleton className="!w-[10.4rem]" />;
    case ContentTableColumnType.IMAGE:
      return <Skeleton className="aspect-[2] !h-auto !w-[200px]" />;
    default:
      return <Skeleton width={`${getPseudoRandom(3, 6, index)}rem`} />;
  }
}

type ContentTableSkeletonProps = {
  /** Configuration for the columns */
  columnsConfig: Array<ContentTableColumnConfig>;
  /** Namespace for the headers translations */
  headersI18nNamespace?: string;
  /** Number of skeleton rows to display */
  count?: number;
  /** Whether the table has action columns */
  hasActions?: boolean;
  /** Whether the table rows are selectable */
  selectable?: boolean;
};

type ContentTableSkeletonCellProps = {
  /** Type of the cell */
  type: string;
  /** Index of rendered item */
  index: number;
};
