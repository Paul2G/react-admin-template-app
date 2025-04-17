import {
  ContentFilterInput,
  ContentTableColumnType,
  ContentValidationType,
} from "~/core/constants/content";

/**
 * Specifies the query params validations for each param in the filter model.
 */
export interface QueryParamValidation {
  /** Required unique `key` to name the filter query parameters. */
  key: string;
  /** Required filter type used to validate before creating query parameters. */
  type: ContentValidationType;
  /** The default value for the filter. */
  default?: any;
  /** An array of options the user could select */
  options?: Array<any> | null;
  /** Specifies the minimum value allowed if the filter `type` is defined as a number. */
  min?: number;
  /** Specifies the maximum value allowed if the filter `type` is defined as a number. */
  max?: number;
}

/**
 * Specifies the configuration for each filter for ContentFilters component.
 */
export interface ContentFilterConfig extends QueryParamValidation {
  /** Path for translations based on the filter key.
   * @example
   *  $t(`${optionsI18n}.${key}`)
   *  */
  optionsI18n?: string;
  /** Attribute key to be saved in the filter modelValue if options are objects. */
  optionValue?: string;
  /** Attribute key to be displayed in the UI if options are objects. */
  optionLabel?: string;
  /** Secondary attribute to be displayed in the UI if optionLabel is defined. */
  optionLabel2?: string;
  /** Specifies the component to be displayed by the ContentFilters component. */
  input?: ContentFilterInput;
  /** Indicates whether the input component should display a clear button for selected options. */
  showClear?: boolean;
  /** Indicates whether the input component allows empty selected values. */
  allowEmpty?: boolean;
  /** Indicates whether the input component is in a loading state. */
  loading?: boolean;
}

/**
 * Specifies the configuration for each column displayed in the content table.
 */
export interface ContentTableColumnConfig<T = string> {
  /** Unique key used to iterate elements and search translations. */
  key: string;
  /** Key or path to access the item attribute displayed in the content table. */
  propertyPath: string;
  /** Specifies how the item attribute should be displayed in the content table. */
  type: ContentTableColumnType | T;
}
