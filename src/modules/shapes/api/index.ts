import * as baseApi from "~/core/api/base";
import { type BaseApiFunctionConfig } from "~/core/api/base";
import { type PaginatedResponse } from "~/core/types/fetch";
import { mockShapes } from "~/modules/shapes/data/mock";
import type { Shape } from "~/modules/shapes/type.ts";

const MODULE_API_PATH = "coupons";

export function getAllShapes({}: Pick<BaseApiFunctionConfig, "params"> = {}) {
  // Just mock logic
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockShapes);
    }, 1000);
  });

  // The true way to do it
  // return baseApi.getAllItems<Array<Shape>>({
  //   moduleApiPath: MODULE_API_PATH,
  //   params,
  // });
}

export function getShapesList({
  params,
}: Pick<BaseApiFunctionConfig, "params"> = {}): Promise<
  PaginatedResponse<Shape>
> {
  // Just mock logic
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        meta: {
          perPage: Number(params?.limit ?? 10),
          currentPage: Number(params?.page ?? 1),
          total: mockShapes.length,
        },
        items: mockShapes
          .filter(({ name }) =>
            name
              .toLowerCase()
              .includes(String(params?.search_text).toLowerCase()),
          )
          .slice(0, isNaN(Number(params?.limit)) ? 10 : Number(params?.limit)),
      });
    }, 1000);
  });

  // The true way to do it
  return baseApi.getItemsList<Shape>({
    moduleApiPath: MODULE_API_PATH,
    params,
  });
}

export function getShapeById({ id }: Pick<BaseApiFunctionConfig, "id">) {
  // Just mock logic
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockShapes.find((shape) => shape.id === id));
    }, 1000);
  });

  // The true way to do it
  //return baseApi.getItemById<Shape>({ moduleApiPath: MODULE_API_PATH, id });
}

export function createShape({ data }: Pick<BaseApiFunctionConfig, "data">) {
  return baseApi.postItem({ moduleApiPath: MODULE_API_PATH, data });
}

export function updateShape({
  id,
  data,
}: Pick<BaseApiFunctionConfig, "id" | "data">) {
  return baseApi.putItem({ moduleApiPath: MODULE_API_PATH, id, data });
}

export function deleteShape({ id }: Pick<BaseApiFunctionConfig, "id">) {
  return baseApi.deleteItem({ moduleApiPath: MODULE_API_PATH, id });
}

export function downloadShapesReport({
  params,
}: Pick<BaseApiFunctionConfig, "params">) {
  return baseApi.downloadItemsReport({
    moduleApiPath: MODULE_API_PATH,
    params,
  });
}
