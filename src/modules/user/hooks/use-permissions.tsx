import { useRouteLoaderData } from "react-router";

import { BYPASS_PROTECTION } from "~/modules/user/constants";

export function usePermissions() {
  const { user } = useRouteLoaderData("tools");

  /** Function to check if the user has any of the specified permissions.
   * Returns false if there is no user.
   * Returns true if no permissions are specified or if BYPASS_PROTECTION is enabled.
   * Otherwise, returns true if the user has at least one of the specified permissions. */
  function p(permissions?: Array<string>) {
    if (!user) return false;
    if (!permissions?.length || BYPASS_PROTECTION) return true;

    return permissions.some((permission) =>
      user.permissions?.includes(permission),
    );
  }

  return { p };
}
