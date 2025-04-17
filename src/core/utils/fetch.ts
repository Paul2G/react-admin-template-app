import {
  FetchMethod,
  FetchRequestContentType,
  FetchResponseType,
  ServiceApi,
} from "~/core/constants/fetch.js";
import { NotOkResponseError } from "~/core/errors";
import { type CommonDataRecord } from "~/core/types/fetch";
import { getSearchParamsFromObjectForBaseApi } from "~/core/utils/search-params.js";
import { getUserToken } from "~/modules/user/utils/token.client.js";

/**
 * A utility class for managing fetch controllers and avoiding concurrent requests.
 * @class
 */
class FetchControllers {
  /** Collection of fetch controllers, indexed by key. */
  controllers: Record<string, AbortController>;

  /** Creates an instance of FetchControllers. */
  constructor() {
    this.controllers = {};
  }

  /**
   * Adds a fetch controller to the collection.
   * If a controller with the same key exists, it will be aborted and replaced.
   * @param {string} key - The key of the controller.
   * @param {AbortController} controller - The fetch controller to add.
   */
  addController(key: string, controller: AbortController) {
    if (this.controllers[key]) {
      this.controllers[key].abort();
      delete this.controllers[key];
    }
    this.controllers[key] = controller;
  }

  /**
   * Removes a fetch controller from the collection.
   * @param {string} key - The key of the controller to remove.
   */
  removeController(key: string) {
    if (this.controllers[key]) {
      delete this.controllers[key];
    }
  }
}

const fetchControllers = new FetchControllers();

/** Makes a fetch request with a specified timeout. */
export async function controlledFetch(
  /** The URL to make the fetch request to. */
  url: string,
  /** The options for the fetch request. */
  options: RequestInit & { timeout?: number } = {},
) {
  const { timeout = 100000 } = options;
  const path = new URL(url).pathname;

  const concurrentController = new AbortController();
  const abortSignal = AbortSignal.any([
    concurrentController.signal,
    AbortSignal.timeout(timeout),
  ]);

  fetchControllers.addController(path, concurrentController);
  const response = await fetch(url, {
    ...options,
    signal: abortSignal,
  });
  fetchControllers.removeController(path);

  return response;
}

/** Makes a request to the base API endpoint with specified parameters. */
export async function fetchBaseApi<T = unknown>(
  config: FetchBaseApiOptions,
): Promise<T> {
  const {
    path,
    body,
    params = {},
    headers: customHeaders,
    method = FetchMethod.GET,
    responseType = FetchResponseType.JSON,
    contentType = FetchRequestContentType.JSON,
    serviceApi = ServiceApi.BASE_V1,
    timeout,
  } = config;

  // `getUserFunction` is client side only
  let userToken;
  if (typeof window !== "undefined") {
    userToken = getUserToken();
  }

  const headers = new Headers(customHeaders);
  if (userToken) {
    headers.set("Authorization", `Bearer ${userToken}`);
  }
  if (contentType !== FetchRequestContentType.FORM_DATA) {
    headers.set("Content-Type", contentType);
  }
  const options = {
    body,
    method,
    headers,
    timeout,
  };

  const searchParams = getSearchParamsFromObjectForBaseApi(params);
  const url = `${serviceApi}${path}?${searchParams.toString()}`;

  const response = await controlledFetch(url, options);

  let parsedResponse;

  try {
    switch (responseType) {
      case FetchResponseType.JSON:
        parsedResponse = await response.json();
        break;
      case FetchResponseType.BLOB:
        parsedResponse = await response.blob();
        break;
      case FetchResponseType.TEXT:
        parsedResponse = await response.text();
        break;
    }
  } catch (error) {
    parsedResponse = { message: "Error parsing response" };
  }

  if (!response?.ok) {
    throw new NotOkResponseError(
      parsedResponse?.message ?? response?.statusText ?? "Unknown error",
      response?.status,
    );
  }

  return parsedResponse;
}

type FetchBaseApiOptions = {
  /** The path to the API endpoint. */
  path: string;
  /** The request body data. */
  body?: BodyInit;
  /** Additional parameters for the request. */
  params?: CommonDataRecord;
  /** Custom request headers */
  headers?: HeadersInit;
  /** The HTTP method for the request. */
  method?: FetchMethod;
  /** The content type for the request headers. */
  contentType?: FetchRequestContentType;
  /** The response type expected from the request. */
  responseType?: FetchResponseType;
  /** The version of the API to use. */
  serviceApi?: (typeof ServiceApi)[keyof typeof ServiceApi];
  /** The timeout duration for the request. */
  timeout?: number;
};
