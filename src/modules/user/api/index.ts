import projectConfig from "~/config/project-config.ts";
import { type BaseApiFunctionConfig } from "~/core/api/base";
import {
  FetchMethod,
  FetchRequestContentType,
  ServiceApi,
} from "~/core/constants/fetch";
import { fetchBaseApi } from "~/core/utils/fetch";
import type { User, UserInfo } from "~/modules/user/types";

export async function authLogin({
  data,
}: Pick<BaseApiFunctionConfig, "data">): Promise<User> {
  const user = await fetchBaseApi<User & { user: UserInfo }>({
    serviceApi: ServiceApi.AUTH,
    path: projectConfig.authApi.loginPath,
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
    serviceApi: ServiceApi.AUTH,
    path: projectConfig.authApi.logoutPath,
    method: FetchMethod.POST,
    contentType: FetchRequestContentType.FORM_DATA,
  });
}

export async function checkLogin({
  token,
}: { token?: string } = {}): Promise<User> {
  const user = await fetchBaseApi<User & { user: UserInfo }>({
    serviceApi: ServiceApi.AUTH,
    path: projectConfig.authApi.whoamiPath,
    headers: { Authorization: `Bearer ${token}` },
  });

  return {
    info: user.user,
    permissions: user.permissions,
    roles: user.roles,
    token: user.token,
  };
}
