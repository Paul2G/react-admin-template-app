import { type ReactNode } from "react";
import clsx from "clsx";
import { Image } from "primereact/image";

/** Default image component */
export function DefaultImage({
  src,
  alt = "",
  title = "",
  children,
  className,
}: DefaultImageProps) {
  if (typeof src === "string" && src !== "")
    return (
      <Image
        title={title}
        src={src}
        alt={alt}
        className={className}
        imageClassName={clsx("bg-surface-200 size-full", className)}
        preview
      />
    );

  return (
    <div
      className={clsx(
        "bg-surface-100 flex items-center justify-center",
        className,
      )}
    >
      {children ? children : <i className="ph ph-image text-3xl" />}
    </div>
  );
}

type DefaultImageProps = {
  /** Source URL of the image */
  src?: string;
  /** Alternative text for the image */
  alt?: string;
  /** Title of the image */
  title?: string;
  /** Fall-back */
  children?: ReactNode;
  /** Additional class names for the container */
  className?: string;
};
