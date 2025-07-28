import * as baseApi from "~/core/api/base";
import { type BaseApiFunctionConfig } from "~/core/api/base";
import type { Location } from "~/modules/locations/type.ts";

const MODULE_API_PATH = "locations";

export function getAllLocations({
  params,
}: Pick<BaseApiFunctionConfig, "params"> = {}) {
  return baseApi.getAllItems<Array<Location>>({
    moduleApiPath: MODULE_API_PATH,
    params,
  });
}

export function getLocationsList({
  params,
}: Pick<BaseApiFunctionConfig, "params"> = {}) {
  return baseApi.getItemsList<Location>({
    moduleApiPath: MODULE_API_PATH,
    params,
  });
}

export function getLocationById({ id }: Pick<BaseApiFunctionConfig, "id">) {
  return baseApi.getItemById<Location>({ moduleApiPath: MODULE_API_PATH, id });
}

export function createLocation({ data }: Pick<BaseApiFunctionConfig, "data">) {
  return baseApi.postItem({ moduleApiPath: MODULE_API_PATH, data });
}

export function updateLocation({
  id,
  data,
}: Pick<BaseApiFunctionConfig, "id" | "data">) {
  return baseApi.putItem({ moduleApiPath: MODULE_API_PATH, id, data });
}

export function deleteLocation({ id }: Pick<BaseApiFunctionConfig, "id">) {
  return baseApi.deleteItem({ moduleApiPath: MODULE_API_PATH, id });
}

export function downloadLocationsReport({
  params,
}: Pick<BaseApiFunctionConfig, "params">) {
  return baseApi.downloadItemsReport({
    moduleApiPath: MODULE_API_PATH,
    params,
  });
}
