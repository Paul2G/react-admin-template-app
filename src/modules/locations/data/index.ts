import {
  ContentTableColumnType,
  ContentValidationType,
} from "~/core/constants/content";
import type {
  ContentFilterConfig,
  ContentTableColumnConfig,
} from "~/core/types/content";

/**
 * Filters configuration for Coupons index view
 * ~type {Record<string, ContentFilterConfig>}
 */
export const locationsFiltersConfigs: Record<string, ContentFilterConfig> = {
  page: {
    key: "page",
    type: ContentValidationType.NUMBER,
    default: 1,
    min: 1,
  },
  pageSize: {
    key: "page_size",
    type: ContentValidationType.NUMBER,
    options: [10, 25, 50, 100],
    default: 10,
  },
} as const;

/**
 * Content table columns configuration for Coupons index view
 * ~type {Array<ContentTableColumnConfig>}
 */
export const locationsTableColumns: Array<ContentTableColumnConfig> = [
  { key: "id", propertyPath: "id", type: ContentTableColumnType.ID },
  { key: "name", propertyPath: "name", type: ContentTableColumnType.TEXT },
  {
    key: "phone",
    propertyPath: "phone",
    type: ContentTableColumnType.PARAGRAPH,
  },
  {
    key: "country",
    propertyPath: "country",
    type: ContentTableColumnType.PARAGRAPH,
  },
  {
    key: "postalCode",
    propertyPath: "postalCode",
    type: ContentTableColumnType.PARAGRAPH,
  },
  {
    key: "address",
    propertyPath: "address",
    type: ContentTableColumnType.PARAGRAPH,
  },
  // {
  //   key: "createdAt",
  //   propertyPath: "createdAt",
  //   type: ContentTableColumnType.DATETIME,
  // },
];

export const defaultListableLocationsColumns: Array<string> = [
  "id",
  "key",
  "name",
  "phone",
  "country",
  "postalCode",
  "address",
] as const;
