import { ContentDisplayLayout } from "~/core/constants/content";

const LAYOUT_LOCAL_STORAGE_KEY = "layout";
const TABLE_COLUMNS_STORAGE_KEY = "tableColumns";

/** Set the content layout in LocalStorage.*/
export function setUserLayoutPreference(
  /**The name of the route for LocalStorage management. */
  viewName: string,
  /**The new layout to save in LocalStorage. */
  newLayout: string,
) {
  const foundLayout = Object.values(ContentDisplayLayout).find(
    (layout) => layout === newLayout,
  );
  localStorage.setItem(
    `${viewName}.${LAYOUT_LOCAL_STORAGE_KEY}`,
    foundLayout ?? ContentDisplayLayout.GRID,
  );
}

/** Get the content layout from LocalStorage or return the default layout. */
export function getUserLayoutPreference(
  /** The name of the route for LocalStorage management. */
  viewName: string,
) {
  const ls_layout = localStorage.getItem(
    `${viewName}.${LAYOUT_LOCAL_STORAGE_KEY}`,
  );
  const foundLayout = Object.values(ContentDisplayLayout).find(
    (layout) => layout === ls_layout,
  );

  return foundLayout ?? ContentDisplayLayout.GRID;
}

/** Get the user columns preference from LocalStorage or return the default columns. */
export function getUserColumnsPreference(
  /** The name of the route for LocalStorage management. */
  viewName: string,
  /** The default columns for the table. */
  defaultTableColumns: Array<string>,
) {
  const ls_columns = localStorage.getItem(
    `${viewName}.${TABLE_COLUMNS_STORAGE_KEY}`,
  );

  try {
    // @ts-expect-error If the JSON is invalid, it will throw an error and return the default columns.
    const columns = JSON.parse(ls_columns);

    if (columns instanceof Array && columns?.length) {
      return columns;
    }

    return defaultTableColumns;
  } catch (e) {
    return defaultTableColumns;
  }
}

/** Set the user columns preference in LocalStorage. */
export function setUserColumnsPreference(
  /** The name of the route for LocalStorage management. */
  viewName: string,
  /** The columns to save in LocalStorage. */
  tableColumnsKeys: Array<string>,
) {
  localStorage.setItem(
    `${viewName}.${TABLE_COLUMNS_STORAGE_KEY}`,
    JSON.stringify(tableColumnsKeys),
  );
}
