import clsx from "clsx";
import { Tag } from "primereact/tag";

export function TagsList({
  values = "",
  className,
  tagClassName = "",
  tagSeverity = "secondary",
}: TagsListProps) {
  if (Array.isArray(values) && values.length) {
    return (
      <div className={clsx("flex flex-wrap gap-1", className)}>
        {values.map((item) => (
          <Tag
            key={item}
            severity={tagSeverity}
            className={tagClassName}
            value={item}
          />
        ))}
      </div>
    );
  } else {
    return (
      <Tag severity={tagSeverity} value={values} className={tagClassName} />
    );
  }
}

type TagsListProps = {
  values: string | string[];
  className?: string;
  tagClassName?: string;
  tagSeverity?:
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "secondary"
    | "contrast"
    | null;
};
