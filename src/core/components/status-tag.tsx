import { useTranslation } from "react-i18next";
import { Tag, type TagProps } from "primereact/tag";

import { ItemStatus } from "~/core/constants/misc";
import { snakeToCamelCase } from "~/core/utils/data.js";

export function StatusTag({ status }: StatusTagProps) {
  const { t } = useTranslation();
  const camelCasedStatus = snakeToCamelCase(status);

  const tags: Record<string, TagProps> = {
    active: {
      severity: "success",
      value: t("constants.status.active"),
      icon: "ph ph-check",
    },
    enabled: {
      severity: "success",
      value: t("constants.status.enabled"),
      icon: "ph ph-check",
    },
    draft: {
      severity: "secondary",
      value: t("constants.status.draft"),
      icon: "ph ph-selection",
    },
    success: {
      severity: "success",
      value: t("constants.status.success"),
      icon: "ph ph-flag",
    },
    completed: {
      severity: "success",
      value: t("constants.status.completed"),
      icon: "ph ph-flag",
    },
    inactive: {
      severity: "warning",
      value: t("constants.status.inactive"),
      icon: "ph ph-minus",
    },
    disabled: {
      severity: "warning",
      value: t("constants.status.disabled"),
      icon: "ph ph-minus",
    },
    canceled: {
      severity: "danger",
      value: t("constants.status.canceled"),
      icon: "ph ph-prohibit",
    },
    failed: {
      severity: "danger",
      value: t("constants.status.failed"),
      icon: "ph ph-x",
    },
    deleted: {
      severity: "danger",
      value: t("constants.status.deleted"),
      icon: "ph ph-trash",
    },
    running: {
      severity: "info",
      value: t("constants.status.running"),
      icon: "ph ph-person-simple-run",
    },
    waiting: {
      severity: "secondary",
      value: t("constants.status.waiting"),
      icon: "ph ph-hourglass-low",
    },
    scheduled: {
      severity: "info",
      value: t("constants.status.scheduled"),
      icon: "ph ph-calendar",
    },
    pending: {
      severity: "secondary",
      value: t("constants.status.pending"),
      icon: "ph ph-hourglass-low",
    },
    readyToSync: {
      severity: "info",
      value: t("constants.status.readyToSync"),
      icon: "ph ph-cloud-arrow-up",
    },
    synced: {
      severity: "success",
      value: t("constants.status.synced"),
      icon: "ph ph-cloud-check",
    },
  };

  if (tags[camelCasedStatus]) return <Tag {...tags[camelCasedStatus]} />;

  return <Tag severity="secondary" value={status} />;
}

type StatusTagProps = {
  status: string | ItemStatus;
};
