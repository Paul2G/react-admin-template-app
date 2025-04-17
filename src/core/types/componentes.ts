import type {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";

export type CommonInputProps = {
  /** The label text for the input field. */
  label?: string;
  /** The return value of the register function from react-hook-form. */
  registerReturn?: UseFormRegisterReturn;
  /** The error object for the input field, used to display validation errors. */
  errorField?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};
