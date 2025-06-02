import { type BaseApiFunctionConfig } from "~/core/api/base";
import { FetchMethod, FetchRequestContentType } from "~/core/constants/fetch";
import { fetchBaseApi } from "~/core/utils/fetch";
import type { User, UserInfo } from "~/modules/user/types";

const MODULE_API_PATH = "auth";

export async function authLogin({
  data,
}: Pick<BaseApiFunctionConfig, "data">): Promise<User> {
  const user = await fetchBaseApi<User & { user: UserInfo }>({
    path: MODULE_API_PATH + "/login",
    method: FetchMethod.POST,

    body: JSON.stringify(data),
  });

  return {
    info: user.user,
    permissions: user.permissions,
    roles: user.roles,
    token: user.token,
  };
}

export function authLogout() {
  return fetchBaseApi({
    path: MODULE_API_PATH + "/logout",
    method: FetchMethod.POST,
    contentType: FetchRequestContentType.FORM_DATA,
  });
}

export async function checkLogin({
  token,
}: { token?: string } = {}): Promise<User> {
  const user = await fetchBaseApi<User & { user: UserInfo }>({
    path: MODULE_API_PATH + "/me",
    headers: { Authorization: `Bearer ${token}` },
  });

  return {
    info: user.user,
    permissions: user.permissions,
    roles: user.roles,
    token: user.token,
  };
}
