import { Button } from "primereact/button";

import {
  CheckMark,
  DefaultImage,
  Money,
  StatusTag,
  TagsList,
} from "~/core/components";

import { ContentTableColumnType } from "~/core/constants/content";
import { getFilenameFromURL } from "~/core/utils/data";
import { getDefaultFormatDate } from "~/core/utils/dates";

export function ContentTableCell({ value, type }: ContentTableCellProps) {
  switch (type) {
    case ContentTableColumnType.ID:
    case ContentTableColumnType.NUMBER:
    case ContentTableColumnType.TEXT:
    case ContentTableColumnType.PARAGRAPH:
      return <span>{value as string}</span>;
    case ContentTableColumnType.BOOLEAN:
      return <CheckMark value={value} />;
    case ContentTableColumnType.MONEY:
      return <Money money={{ amount: Number(value), currencyCode: "USD" }} />;
    case ContentTableColumnType.TAGS:
      return <TagsList values={value as Array<string>} />;
    case ContentTableColumnType.STATUS:
      return <StatusTag status={value as string} />;
    case ContentTableColumnType.IMAGE:
      return (
        <DefaultImage
          src={value as string}
          className="!aspect-[2] !h-auto !w-full max-w-[200px] rounded-lg object-cover object-top shadow-sm"
        />
      );
    case ContentTableColumnType.DATETIME:
      return <span>{getDefaultFormatDate(value as string)}</span>;
    case ContentTableColumnType.URL:
      return (
        <a href={value as string} target="_blank" rel="noopener noreferrer">
          <Button
            label={value as string}
            icon="ph-bold ph-arrow-square-out ms-1"
            iconPos="right"
            size="small"
            outlined
          />
        </a>
      );
    case ContentTableColumnType.EMAIL:
      return (
        <a href={`mailto:${value}`} target="_blank" rel="noopener noreferrer">
          <Button
            label={value as string}
            icon="ph-bold ph-arrow-square-out ms-1"
            iconPos="right"
            size="small"
            outlined
          />
        </a>
      );
    case ContentTableColumnType.SHOPIFY_URL:
      return (
        <a href={value as string} target="_blank" rel="noopener noreferrer">
          <Button
            label={`Shopify: ${getFilenameFromURL(value as string)}`}
            icon="ph-bold ph-arrow-square-out ms-1"
            iconPos="right"
            size="small"
            outlined
          />
        </a>
      );
    case ContentTableColumnType.INSTAGRAM:
      return (
        <a
          href={`https://instagr.am/${value}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            severity="help"
            label={`@${getFilenameFromURL(value as string)}`}
            icon="ph-bold ph-instagram-logo me-1"
            iconPos="left"
            size="small"
            outlined
          />
        </a>
      );
  }
}

type ContentTableCellProps = {
  value: unknown;
  type: string | ContentTableColumnType;
};
