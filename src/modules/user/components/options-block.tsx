import { type ReactNode } from "react";
import clsx from "clsx";

export function OptionsBlock({ title = "", children }: OptionsBlockProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <h2 className="text-lg">{title}</h2>
      <div className="border-surface-200 flex flex-col gap-2 rounded-lg border border-1 border-solid p-4">
        {children}
      </div>
    </div>
  );
}

function OptionsBlockRow({
  label = "",
  className,
  children,
}: OptionsBlockRowProps) {
  return (
    <div className={clsx("flex items-center justify-between gap-2", className)}>
      <span className="shrink-0 font-bold">{label}</span>
      <div className="text-end break-all">{children}</div>
    </div>
  );
}

OptionsBlock.Row = OptionsBlockRow;

type OptionsBlockProps = {
  title?: string;
  children: ReactNode;
};

interface OptionsBlockRowProps {
  label?: string;
  className?: string;
  children?: ReactNode;
}
