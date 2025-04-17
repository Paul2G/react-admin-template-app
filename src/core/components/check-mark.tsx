import { Button } from "primereact/button";

export function CheckMark({ value }: CheckMarkProps) {
  if (Boolean(value))
    return (
      <Button
        severity="success"
        icon="ph ph-check"
        rounded
        className="pointer-events-none aspect-square size-auto"
      />
    );
  else
    return (
      <Button
        severity="secondary"
        icon="ph ph-check"
        rounded
        outlined
        disabled
        className="pointer-events-none aspect-square size-auto"
      />
    );
}

type CheckMarkProps = {
  /** Any value can be parsed boolean */
  value: unknown;
};
