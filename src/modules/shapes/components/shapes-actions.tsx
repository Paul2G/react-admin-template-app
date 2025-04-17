import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";

import { useContentItems } from "~/core/hooks";
import { useToast } from "~/layouts/hooks/use-toast";
import type { Shape } from "~/modules/shapes/type.ts";

export function ShapesActions({ className }: ShapesActionsProps) {
  const { t } = useTranslation();
  const toast = useToast();

  const { selectedItems } = useContentItems<Shape>();

  function handleClick() {
    if (selectedItems.length === 0) {
      toast.show({
        severity: "success",
        summary: "No selected",
        detail: "Nothing to show",
      });
    }

    selectedItems.forEach((item) =>
      toast.show({
        severity: "success",
        summary: item.name,
        detail: item.description,
      }),
    );
  }

  return (
    <Button
      label={t("actions.view")}
      icon="ph ph-cards"
      onClick={handleClick}
      className={className}
    />
  );
}

type ShapesActionsProps = {
  /** Additional class names for the actions wrapper */
  className?: string;
};
