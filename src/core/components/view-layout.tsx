import {
  Children,
  isValidElement,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Link, useLoaderData } from "react-router";
import clsx from "clsx";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { type UIMatchData } from "~/layouts/types.ts";

/** Layout per content view */
function ViewLayout({
  title,
  backTo,
  afterTitleSlot,
  actionsSlot,
  className,
  children,
}: ViewLayoutProps) {
  const meta = useLoaderData<UIMatchData>()?.meta;

  return (
    <div className={clsx("grid grid-cols-6 gap-4", className)}>
      {(title !== null || actionsSlot) && (
        <header className="col-span-6 flex items-center justify-between gap-1">
          <div className="animate-fade-down animate-duration-300 flex items-center gap-1">
            {backTo && (
              <Link to={backTo}>
                <Button
                  size="small"
                  severity="secondary"
                  icon="ph ph-arrow-left"
                />
              </Link>
            )}
            <h1 className="col-span-6 text-3xl font-bold">
              {title ?? meta?.title}
            </h1>
            {afterTitleSlot && <div>{afterTitleSlot}</div>}
          </div>
          {actionsSlot && (
            <div className="animate-fade-left animate-duration-500 animate-delay-200">
              {actionsSlot}
            </div>
          )}
        </header>
      )}
      {Children.map(children, (child, index) => {
        if (isValidElement(child) && child.props)
          return (
            <child.type
              {...child.props}
              style={{ animationDelay: `${100 * index}ms` }}
            />
          );
      })}
    </div>
  );
}

function ViewLayoutSection({
  title,
  variant = "fullWidth",
  className,
  style,
  children,
}: ViewLayoutSectionProps) {
  if (!children) {
    return (
      <div
        className={clsx("col-span-6 h-min", {
          "lg:col-span-3": variant === "oneHalf",
          "lg:col-span-2": variant === "oneThird",
          "lg:col-span-4": variant === "twoThird",
          className,
        })}
        style={style}
      />
    );
  }

  return (
    <Card
      title={title}
      className={clsx(
        "animate-fade-left border-surface-200 animate-duration-500 col-span-6 h-min border shadow-none",
        {
          "lg:col-span-3": variant === "oneHalf",
          "lg:col-span-2": variant === "oneThird",
          "lg:col-span-4": variant === "twoThird",
        },
      )}
      style={style}
      pt={{
        content: { className: clsx("p-0", className) },
        title: { className: "text-xl" },
      }}
    >
      {children}
    </Card>
  );
}

type ViewLayoutProps = {
  /** Title for card section component */
  title?: string | null;
  /** Optional property to specify a URL or path to navigate back to */
  backTo?: string;
  /** Additional class names for card section component */
  className?: string;
  /** Optional property to pass a React node that will be rendered after the title */
  afterTitleSlot?: ReactNode;
  /** Optional property to pass a React node that will be rendered as actions */
  actionsSlot?: ReactNode;
  /** Inner elements in content view */
  children: ReactNode;
};

type ViewLayoutSectionProps = {
  /** Title for card section component */
  title?: string;
  /** Variant for card section component */
  variant?: "oneHalf" | "oneThird" | "twoThird" | "fullWidth";
  /** Additional class names for card section component */
  className?: string;
  /** The styles that can be applied to the card section component*/
  style?: CSSProperties;
  /** Inner elements in content section view */
  children?: ReactNode;
};

ViewLayout.Section = ViewLayoutSection;
export { ViewLayout };
