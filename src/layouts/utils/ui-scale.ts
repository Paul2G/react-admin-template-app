import {
  projectNormalUiScale,
  projectUiScales,
} from "~/layouts/data/ui-scales";
import type { ProjectUIScale } from "~/layouts/types.ts";

const SCALE_LOCAL_STORAGE_KEY = "userUiScale";

export function getUserUiScalePreference() {
  const ls_scaleKey = localStorage.getItem(SCALE_LOCAL_STORAGE_KEY);
  const userUiScale = projectUiScales.find(({ key }) => key === ls_scaleKey);

  if (userUiScale) return userUiScale;

  return projectNormalUiScale;
}

export function setUserUiScalePreference({ key }: ProjectUIScale) {
  localStorage.setItem(SCALE_LOCAL_STORAGE_KEY, key);
}

export function setUiScaleInDocument({ fontSize }: ProjectUIScale) {
  document.documentElement.style.fontSize = `${fontSize}px`;
}
