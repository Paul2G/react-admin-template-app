import React from "react";
import clsx from "clsx";

import { LocaleSelector } from "~/layouts/components/header-main/locale-selector";
import { ThemeSelector } from "~/layouts/components/header-main/theme-selector";

export function HeaderMain({ className, children }: HeaderMainProps) {
  return (
    <div
      className={clsx("flex items-center justify-between p-[6px]", className)}
    >
      <div className="flex items-center gap-4">{children}</div>
      <div className="flex items-center gap-2">
        <ThemeSelector />
        <LocaleSelector />
      </div>
    </div>
  );
}

type HeaderMainProps = {
  className?: string;
  children?: React.ReactNode;
};
