import type { ProjectUIScale } from "~/layouts/types.ts";

export const projectUiScales: Array<ProjectUIScale> = [
  {
    key: "small",
    fontSize: 12,
  },
  {
    key: "normal",
    fontSize: 14,
  },
  {
    key: "big",
    fontSize: 16,
  },
  {
    key: "huge",
    fontSize: 18,
  },
];

export const projectNormalUiScale = projectUiScales[1];
