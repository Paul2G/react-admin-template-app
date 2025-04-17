import {
  ContentFilterInput,
  ContentTableColumnType,
  ContentValidationType,
} from "~/core/constants/content";
import { Sort } from "~/core/constants/misc";
import type {
  ContentFilterConfig,
  ContentTableColumnConfig,
} from "~/core/types/content";

const sortOptions = Object.values(Sort);

/**
 * Filters configuration for Coupons index view
 * ~type {Record<string, ContentFilterConfig>}
 */
export const shapesFiltersConfigs: Record<string, ContentFilterConfig> = {
  page: {
    key: "page",
    type: ContentValidationType.NUMBER,
    default: 1,
    min: 1,
  },
  limit: {
    key: "limit",
    type: ContentValidationType.NUMBER,
    options: [10, 25, 50, 100],
    default: 10,
  },
  startDate: {
    key: "from",
    type: ContentValidationType.DATETIME,
    input: ContentFilterInput.DATETIME,
  },
  endDate: {
    key: "to",
    type: ContentValidationType.DATETIME,
    input: ContentFilterInput.DATETIME,
  },
  search: {
    key: "search_text",
    type: ContentValidationType.STRING,
    input: ContentFilterInput.TEXT,
    default: "",
  },
  sort: {
    key: "sort",
    type: ContentValidationType.STRING,
    input: ContentFilterInput.SELECT,
    options: sortOptions,
    default: Sort.DESC,
    optionsI18n: "constants.sorts",
  },
} as const;

/**
 * Content table columns configuration for Coupons index view
 * ~type {Array<ContentTableColumnConfig>}
 */
export const shapesTableColumns: Array<ContentTableColumnConfig> = [
  { key: "id", propertyPath: "id", type: ContentTableColumnType.ID },
  { key: "key", propertyPath: "key", type: ContentTableColumnType.TAGS },
  { key: "name", propertyPath: "name", type: ContentTableColumnType.TEXT },
  {
    key: "special",
    propertyPath: "special",
    type: ContentTableColumnType.BOOLEAN,
  },
  {
    key: "featuredImage",
    propertyPath: "image",
    type: ContentTableColumnType.IMAGE,
  },
  {
    key: "description",
    propertyPath: "description",
    type: ContentTableColumnType.PARAGRAPH,
  },
  {
    key: "createdAt",
    propertyPath: "created_at",
    type: ContentTableColumnType.DATETIME,
  },
  {
    key: "website",
    propertyPath: "website",
    type: ContentTableColumnType.URL,
  },
  {
    key: "price",
    propertyPath: "price",
    type: ContentTableColumnType.MONEY,
  },
  {
    key: "status",
    propertyPath: "status",
    type: ContentTableColumnType.STATUS,
  },
];

export const defaultListableShapesColumns: Array<string> = [
  "id",
  "key",
  "name",
  "description",
  "featuredImage",
  "status",
  "createdAt",
] as const;
