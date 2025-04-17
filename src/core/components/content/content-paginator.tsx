import { useState } from "react";
import { useUpdateEffect } from "primereact/hooks";
import { Paginator, type PaginatorPageChangeEvent } from "primereact/paginator";

export function ContentPaginator({
  currentPage = 1,
  setCurrentPage,
  itemsPerPage = 10,
  setItemsPerPage,
  totalItems = 10,
  rowsPerPageOptions = [10, 20, 50],
}: ContentPaginatorProps) {
  const [first, setFirst] = useState(0);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setItemsPerPage(event.rows);
    setCurrentPage(event.page + 1);
  };

  useUpdateEffect(() => {
    setFirst((currentPage - 1) * itemsPerPage);
  }, [currentPage]);

  return (
    <Paginator
      first={first}
      rows={itemsPerPage}
      totalRecords={totalItems}
      rowsPerPageOptions={rowsPerPageOptions}
      onPageChange={onPageChange}
      template={{
        layout:
          "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown",
      }}
      className="border-none"
    />
  );
}

type ContentPaginatorProps = {
  currentPage?: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage?: number;
  setItemsPerPage: (itemsPerPage: number) => void;
  totalItems?: number;
  rowsPerPageOptions?: Array<number>;
};

`{
        "640px": "PrevPageLink CurrentPageReport NextPageLink",
        "960px":
          "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
        "1300px":
          "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink",
        default:
          "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown",
      }`;
