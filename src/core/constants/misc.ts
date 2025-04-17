// Miscellaneous constants
export enum Booleanish {
  YES = "true",
  NO = "false",
}

export enum TristateBooleanish {
  YES = "true",
  NO = "false",
  BOTH = "both",
}

export enum Sort {
  DESC = "desc",
  ASC = "asc",
}

export enum ItemStatus {
  ACTIVE = "active",
  ENABLED = "enabled",
  DRAFT = "draft",
  SUCCESS = "success",
  COMPLETED = "completed",
  INACTIVE = "inactive",
  DISABLED = "disabled",
  DELETED = "deleted",
  CANCELED = "canceled",
  FAILED = "failed",
  RUNNING = "running",
  WAITING = "waiting",
  PENDING = "pending",
  SCHEDULED = "scheduled",
  READY_TO_SYNC = "readyToSync",
  SYNCED = "synced",
}

/**
 * Attributes names in lowercase to match tailwind responsive prefixes
 * @see {@link https=//tailwindcss.com/docs/responsive-design}
 */
export enum WindowBreakpoint {
  sm = 640,
  md = 768,
  lg = 1024,
  xl = 1280,
  "2xl" = 1536,
  "3xl" = 1920,
  "4xl" = 2560,
}
