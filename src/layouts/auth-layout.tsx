import { ReactNode } from "react";
import { Outlet, redirect } from "react-router";

import { HeaderMain } from "~/layouts/components/header-main.tsx";

import { checkLogin } from "~/modules/user/api";
import {
  getUserToken,
  removeUserToken,
} from "~/modules/user/utils/token.client.ts";

export async function loader() {
  const token = getUserToken();

  if (!token) {
    return {};
  }

  try {
    await checkLogin({ token });
    return redirect("/tools");
  } catch (e) {
    console.error(e);
    removeUserToken();
    return {};
  }
}

export default function AuthLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="bg-surface-ground relative flex h-[100dvh] w-screen items-center justify-center">
      <HeaderMain className="animate-fade-down fixed top-0 w-full" />
      {children ?? <Outlet />}
    </div>
  );
}
