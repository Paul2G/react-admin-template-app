import dayjs from "dayjs";

import { ContentValidationType as SearchParamType } from "~/core/constants/content";
import { NoValidSearchParamError } from "~/core/errors";
import type { QueryParamValidation } from "~/core/types/content";
import type { CommonDataRecord } from "~/core/types/fetch";

/** Get an object validated from values search params by a dictionary of validations. */
export function getObjectFromSearchParams(
  //The object with the conditions to validate the search params.
  paramsValidations: Record<string, QueryParamValidation>,
) {
  const searchParams = new URLSearchParams(
    window.location.search.split("?")[1],
  );
  const returnableObject: CommonDataRecord = {};

  for (const pValid of Object.values(paramsValidations)) {
    const rawValue = searchParams.get(pValid.key) ?? "";
    let value;

    switch (pValid.type) {
      case SearchParamType.NUMBER: {
        value = parseInt(rawValue);

        if (isNaN(value)) {
          returnableObject[pValid.key] = pValid.default;
        } else if (pValid?.options instanceof Array && pValid.options.length) {
          if (pValid.options.includes(value)) {
            returnableObject[pValid.key] = value;
          } else {
            returnableObject[pValid.key] = pValid.default;
          }
          // @ts-expect-error Comparing with undefined always return false, then it works well
        } else if (!(value < pValid?.min || value > pValid?.max)) {
          returnableObject[pValid.key] = value;
        } else {
          returnableObject[pValid.key] = pValid.default;
        }

        break;
      }
      case SearchParamType.STRING: {
        if (
          (!pValid?.options && rawValue !== "") ||
          (pValid?.options instanceof Array &&
            pValid.options.includes(rawValue))
        ) {
          returnableObject[pValid.key] = rawValue;
        } else {
          returnableObject[pValid.key] = pValid.default;
        }

        break;
      }
      case SearchParamType.DATETIME: {
        if (dayjs(rawValue).isValid()) {
          returnableObject[pValid.key] = new Date(rawValue);
        }
        break;
      }
      case SearchParamType.ARRAY: {
        try {
          const unfilteredValues = JSON.parse(rawValue);

          if (!(unfilteredValues instanceof Array)) {
            throw new NoValidSearchParamError(
              "The search param is not a valid JSON array",
            );
          }

          if (pValid?.options instanceof Array) {
            returnableObject[pValid.key] = unfilteredValues.filter(
              (value: number | string) => pValid.options?.includes(value),
            );
          } else {
            returnableObject[pValid.key] = unfilteredValues;
          }
        } catch (e) {
          returnableObject[pValid.key] = pValid.default;
        }
        break;
      }
    }
  }

  return returnableObject;
}

/**  Converts a dictionary to URLSearchParams object. */
export function getSearchParamsFromObject(object: CommonDataRecord) {
  const searchParams = new URLSearchParams();

  Object.entries(object).forEach(([key, value]) => {
    if (value instanceof Array && value?.length) {
      searchParams.append(key, JSON.stringify(value));
    } else if (typeof value === "string" || typeof value === "number") {
      searchParams.append(key, value.toString());
    } else if (value instanceof Date) {
      searchParams.append(key, dayjs(value).format("YYYY-MM-DDTHH:mm"));
    }
  });

  return searchParams;
}

/** Exclusive usage to covert object to search params for SolSys queries, this way of create search params looks awful */
export function getSearchParamsFromObjectForBaseApi(object: CommonDataRecord) {
  const searchParams = new URLSearchParams();

  Object.entries(object).forEach(([key, value]) => {
    if (value instanceof Array && value?.length) {
      value.forEach((valueItem) => {
        if (typeof valueItem !== "object") {
          searchParams.append(`${key}[]`, valueItem.toString());
        }
      });
    } else if (value && typeof value !== "object") {
      searchParams.append(key, value.toString());
    } else if (value instanceof Date) {
      searchParams.append(key, dayjs(value).format("YYYY-MM-DD HH:mm"));
    }
  });

  return searchParams;
}
