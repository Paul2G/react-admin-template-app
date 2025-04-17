export function ShapeValueExtendedCell({
  value,
  type,
}: ShapeValueExtendedCellProps) {
  if (type === "json") {
    return <span>{JSON.stringify(value, null, 2)}</span>;
  }
}

type ShapeValueExtendedCellProps = {
  /* Property extracted from the item by the property path */
  value: unknown;
  /** Type of the current cell value from columns config */
  type: string;
};
