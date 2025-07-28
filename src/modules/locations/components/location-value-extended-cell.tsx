export function LocationValueExtendedCell({
  value,
  type,
}: LocationValueExtendedCellProps) {
  if (type === "json") {
    return <span>{JSON.stringify(value, null, 2)}</span>;
  }
}

type LocationValueExtendedCellProps = {
  /* Property extracted from the item by the property path */
  value: unknown;
  /** Type of the current cell value from columns config */
  type: string;
};
