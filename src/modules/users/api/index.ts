import { getAllItems } from "~/core/api/base";
import type { UserInfo } from "~/modules/user/types";

const MODULE_API_PATH = "users";

export function getAllUsers() {
  return getAllItems<Array<Pick<UserInfo, "id" | "email" | "name">>>({
    moduleApiPath: MODULE_API_PATH,
  });
}
