/** Specifies the type for validations logic. */
export enum ContentValidationType {
  NUMBER = "number",
  ARRAY = "array",
  STRING = "string",
  DATETIME = "datetime",
}

/** Specifies the type of column to be displayed in the content table. */
export enum ContentTableColumnType {
  ID = "id",
  NUMBER = "number",
  TEXT = "text",
  BOOLEAN = "boolean",
  PARAGRAPH = "paragraph",
  DATETIME = "datetime",
  IMAGE = "image",
  TAGS = "tags",
  STATUS = "status",
  MONEY = "money",
  URL = "url",
  EMAIL = "email",
  INSTAGRAM = "instagram",
  SHOPIFY_URL = "shopifyUrl",
}

/** Specifies the type of filter for validations. */
export enum ContentFilterInput {
  SELECT = "select",
  MULTISELECT = "multiSelect",
  SELECT_BUTTONS = "selectButtons",
  TEXT = "text",
  DATETIME = "datetime",
}

export enum ContentDisplayLayout {
  GRID = "grid",
  TABLE = "table",
}
