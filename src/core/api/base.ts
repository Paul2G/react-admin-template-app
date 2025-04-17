import {
  FetchMethod,
  FetchRequestContentType,
  FetchResponseType,
  ServiceApi,
} from "~/core/constants/fetch";
import { MissingIdError } from "~/core/errors";
import {
  type CommonDataRecord,
  type JSONValue,
  type PaginatedResponse,
} from "~/core/types/fetch";
import { fetchBaseApi } from "~/core/utils/fetch";

/** Retrieves all items from the specified API endpoint. */
export function getAllItems<T>(
  config: Pick<
    BaseApiFunctionConfig,
    "moduleApiPath" | "serviceApi" | "params"
  >,
) {
  const { moduleApiPath, serviceApi, params } = config;

  return fetchBaseApi<T>({ serviceApi, path: moduleApiPath, params });
}

/** Retrieves a list of items filtered by query params from the specified API endpoint. */
export async function getItemsList<T>(
  config: Pick<
    BaseApiFunctionConfig,
    "serviceApi" | "moduleApiPath" | "params"
  >,
): Promise<PaginatedResponse<T>> {
  const { moduleApiPath, serviceApi, params } = config;

  const data = await fetchBaseApi<{
    items: Array<T>;
    current_page: number;
    per_page: number;
    total: number;
  }>({
    serviceApi,
    path: `${moduleApiPath}/list`,
    params,
  });

  // Transform the response to the PaginatedResponse type
  return {
    items: data.items,
    meta: {
      total: data.total,
      currentPage: data.current_page,
      perPage: data.per_page,
    },
  };
}

/** Retrieves a specific item by its ID from the specified API endpoint. */
export function getItemById<T>(
  config: Pick<BaseApiFunctionConfig, "serviceApi" | "moduleApiPath" | "id">,
) {
  const { moduleApiPath, serviceApi, id } = config;

  if (!id) throw new MissingIdError("Item ID is not provided");
  return fetchBaseApi<T>({ serviceApi, path: `${moduleApiPath}/${id}` });
}

/** Saves an item sending a FormData object to the specified API endpoint. */
export function postRichItem<T>(
  config: Pick<
    BaseApiFunctionConfig,
    "moduleApiPath" | "serviceApi" | "formData"
  >,
) {
  const { moduleApiPath, serviceApi, formData } = config;

  return fetchBaseApi<T>({
    serviceApi,
    path: `${moduleApiPath}`,
    method: FetchMethod.POST,
    contentType: FetchRequestContentType.FORM_DATA,
    body: formData,
  });
}

/** Send data object to create a new item at the specified API endpoint. */
export function postItem<T>(
  config: Pick<BaseApiFunctionConfig, "moduleApiPath" | "serviceApi" | "data">,
) {
  const { moduleApiPath, serviceApi, data } = config;

  return fetchBaseApi<T>({
    serviceApi,
    path: `${moduleApiPath}`,
    method: FetchMethod.POST,
    body: JSON.stringify(data),
  });
}

/** Send data object to replace an item at the specified API endpoint. */
export function putItem<T>(
  config: Pick<
    BaseApiFunctionConfig,
    "moduleApiPath" | "serviceApi" | "id" | "data"
  >,
) {
  const { moduleApiPath, serviceApi, id, data } = config;

  if (!id) throw new MissingIdError("Item ID is not provided");
  return fetchBaseApi<T>({
    serviceApi,
    path: `${moduleApiPath}/${id}`,
    method: FetchMethod.PUT,
    body: JSON.stringify(data),
  });
}

/** Sends a PATCH request to update a specific item identified by its ID in the API endpoint. */
export function patchItem<T>(
  config: Pick<
    BaseApiFunctionConfig,
    "serviceApi" | "moduleApiPath" | "id" | "data"
  >,
) {
  const { moduleApiPath, serviceApi, id, data } = config;

  if (!id) throw new MissingIdError("Item ID is not provided");
  return fetchBaseApi<T>({
    serviceApi,
    path: `${moduleApiPath}/${id}`,
    body: JSON.stringify(data),
    method: FetchMethod.PATCH,
  });
}

/** Deletes an item with the specified ID from the API endpoint. */
export function deleteItem<T>(
  config: Pick<
    BaseApiFunctionConfig,
    "moduleApiPath" | "serviceApi" | "id" | "params"
  >,
) {
  const { moduleApiPath, serviceApi, id, params } = config;

  if (!id) throw new MissingIdError("Item ID is not provided");
  return fetchBaseApi<T>({
    serviceApi,
    path: `${moduleApiPath}/${id}`,
    method: FetchMethod.DELETE,
    params,
  });
}

/** Downloads a report containing items from the specified API endpoint.*/
export function downloadItemsReport(
  config: Pick<
    BaseApiFunctionConfig,
    "moduleApiPath" | "serviceApi" | "params"
  >,
) {
  const { moduleApiPath, serviceApi, params } = config;

  return fetchBaseApi<Blob>({
    serviceApi,
    responseType: FetchResponseType.BLOB,
    path: `${moduleApiPath}/report`,
    params,
  });
}

export type BaseApiFunctionConfig = {
  /** The path to the API module. */
  moduleApiPath: string;
  /** The version of the API to use. */
  serviceApi?: (typeof ServiceApi)[keyof typeof ServiceApi];
  /** The ID of the item to get, update or delete. */
  id: string | number;
  /** The required data for the API request action passed through body */
  data?: JSONValue;
  /** The data of the item to save or update.*/
  formData: FormData;
  /** Additional parameters to modify delete behaviour. */
  params?: CommonDataRecord;
};
