import Cookies from "js-cookie";

import { USER_TOKEN_COOKIE_KEY } from "~/modules/user/constants";

export function getUserToken() {
  return Cookies.get(USER_TOKEN_COOKIE_KEY);
}

export function setUserToken(token: string) {
  return Cookies.set(USER_TOKEN_COOKIE_KEY, token, { expires: 7 * 2 });
}

export function removeUserToken() {
  return Cookies.remove(USER_TOKEN_COOKIE_KEY);
}
