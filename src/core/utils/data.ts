import dayjs from "dayjs";

/** Check if a string is a valid URL to prevent runtime errors */
export function isURLValid(url: string) {
  try {
    return Boolean(new URL(url));
  } catch (e) {
    return false;
  }
}

/** Get the substring that represents the filename from a URL */
export function getFilenameFromURL(url: string) {
  return url.split("/").pop();
}

/** Copy an object by value instead of by reference */
export function copyObject<T>(object: T): T {
  if (object === undefined || object === null) {
    return object;
  }

  return JSON.parse(JSON.stringify(object));
}

/** Get a random number between a range */
export function getRandomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/** Format a number of bytes to a string with equivalent storage unit */

export function formatDataSize(bytes: number | string) {
  const sizes = ["B", "KB", "MB"];

  const k = 1024;
  const dm = 3;

  if (typeof bytes !== "number") {
    return `--.---${sizes[0]}`;
  }

  if (bytes === 0) {
    return `0 ${sizes[0]}`;
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formattedSize}${sizes[i]}`;
}

/** Parse a dictionary object to a FormData object for fetch post usage */
export function parseObjectToFormData(
  //This kind of object should be a dictionary
  object: Record<string, string | number | Date | Array<string | number>>,
  //This field is not required, just allow you filter object's attributes
  fieldsToSend: Array<string> = [],
) {
  const formData = new FormData();

  Object.entries(object).map(([key, value]) => {
    if (
      value === undefined ||
      value === null ||
      (fieldsToSend.length && !fieldsToSend.includes(key)) ||
      (key.startsWith("file_") && !(value instanceof FileList))
    ) {
      return;
    }

    if (value instanceof FileList && value.length && value[0]?.size > 0) {
      formData.append(key, value[0], value[0].name);
      return;
    }

    if (value instanceof Date) {
      formData.append(key, dayjs(value).format("YYYY-MM-DD HH:mm"));
      return;
    }

    if (value instanceof Array) {
      value.forEach((v) => {
        formData.append(`${key}[]`, v.toString());
      });
      return;
    }

    formData.append(key, value.toString());
  });

  return formData;
}

/**
 * Get the value of a nested object property
 * @author Aleksei Tsikov <@atsikov>
 */
export function getValue<T = unknown>(
  //The object to get the value from
  data: T,
  //The path to the value
  path: string,
  //The default value if the path is not found
  defaultValue?: T,
) {
  const value = path
    .split(/[.[\]]/)
    .filter(Boolean)
    // @ts-expect-error This functions is supposed to be totally agnostic, it's normal keys don't be found
    .reduce((value, key) => value?.[key], data);

  return value !== undefined ? value : defaultValue;
}

/** Parse a string or any value to a boolean */
export function parseBoolean(value: unknown, defaultValue: unknown = false) {
  if (typeof value === "string") {
    return value === "true";
  }

  if (!value && typeof defaultValue === "boolean") {
    return Boolean(defaultValue);
  }

  return Boolean(value);
}

/**
Deep Equality comparison example

This is an example of how to implement an object-comparison function in
JavaScript (ES5+). A few points of interest here:

* You can get an array of all an object's properties in ES5+ by calling
  the class method Object.keys(obj).
* The function recursively calls itself in the for / in loop when it
  compares the contents of each property
* You can hide a "private" function inside a function of this kind by
  placing one function declaration inside of another. The inner function
  is not hoisted out into the global scope, so it is only visible inside
  of the parent function.
* The reason this nested helper function is necessary is that
  `typeof null` is still "object" in JS, a major "gotcha" to watch out for.
*/
export function areDeeplyEqual(obj1: unknown, obj2: unknown) {
  if (obj1 === obj2) {
    return true;
  } else if (isObject(obj1) && isObject(obj2)) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }
    for (const prop in obj1) {
      // @ts-expect-error creeme we
      if (!areDeeplyEqual(obj1[prop], obj2[prop])) {
        return false;
      }
    }
    return true;
  }

  // Private
  function isObject(obj: unknown) {
    return typeof obj === "object" && obj != null;
  }
}
/** Converts string form SNAKE_CASE into camelCase */
export function snakeToCamelCase(str: string) {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", ""),
    );
}
