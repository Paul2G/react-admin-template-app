import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Button } from "primereact/button";

import type { Shape } from "~/modules/shapes/type.ts";

/** Component that renders action buttons for a shape */
export function ShapeActions({ item, className }: ShapesActionsProps) {
  const { t } = useTranslation();

  return (
    <div className={clsx(className)}>
      <Button
        tooltip={t("actions.edit")}
        tooltipOptions={{ position: "top" }}
        severity="info"
        icon="ph ph-pen text-lg"
        className="aspect-square"
        onClick={() => console.log(item)}
      />
      <Button
        tooltip={t("actions.delete")}
        tooltipOptions={{ position: "top" }}
        severity="danger"
        icon="ph ph-trash text-lg"
        className="aspect-square"
        onClick={() => console.log(item)}
      />
    </div>
  );
}

type ShapesActionsProps = {
  /** The item to perform actions on */
  item: Shape;
  /** Additional class name */
  className?: string;
};
