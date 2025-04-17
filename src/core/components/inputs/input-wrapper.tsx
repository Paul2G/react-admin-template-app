import { type ReactNode } from "react";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import clsx from "clsx";

/**
 * InputWrapper is a component that wraps input fields with a label and error message display.
 * It provides a consistent layout for form inputs, including optional required indicators and error messages.
 */
export function InputWrapper({
  label,
  required,
  errorField,
  children,
  className,
  labelClassName,
  errorClassName,
}: InputWrapperProps) {
  return (
    <label
      className={clsx(
        "relative flex w-full cursor-pointer flex-col gap-1",
        required && "after:text-red-500 after:content-['*']",
        className,
      )}
    >
      {Boolean(label) && <span className={labelClassName}>{label}</span>}
      {children}
      {errorField && errorField?.message && (
        <small className={clsx("text-red-500", errorClassName)}>
          {String(errorField.message)}
        </small>
      )}
    </label>
  );
}

export type InputWrapperProps = {
  /** The label text for the input field. */
  label?: string;
  /** Indicates if the input field is required. */
  required?: boolean;
  /** The error object for the input field, used to display validation errors. */
  errorField?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  /** The child elements to be wrapped by the input wrapper. */
  children: ReactNode;
  /** Additional class names for the wrapper element. */
  className?: string;
  /** Additional class names for the label element. */
  labelClassName?: string;
  /** Additional class names for the error message element. */
  errorClassName?: string;
};
