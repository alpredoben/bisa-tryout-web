import { ArrowDownIcon, ArrowUpIcon } from "../../assets/icons";
import Badge from "../../components/ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import type {
  I_TableHeaders,
  I_TableProperties,
} from "../../interfaces/appInterface";
import { formatedDate } from "../../utils/helpers";

const tableHeaders: I_TableHeaders[] = [
  {
    id: 1,
    title: "No",
    className: "justify-center",
  },
  {
    id: 2,
    title: "Status",
    name: "history_status",
    className: "justify-center",
  },
  {
    id: 3,
    title: "Jenis",
    name: "history_type",
    className: "justify-center",
  },
  {
    id: 4,
    title: "Keterangan",
    name: "history_description",
    className: "justify-center",
  },
  {
    id: 5,
    title: "Updated At",
    name: "updated_at",
    className: "justify-center",
  },
];

export default function HistoryTryoutTable({
  page,
  setPage,
  datatable,
  orderName,
  setOrderName,
  directionName,
  setDirectionName,
}: I_TableProperties) {
  const { records, total_page, total_row, limit } = datatable;

  const eventRowSortHandler = (column: string | undefined) => {
    if (!column) return;

    if (directionName === column) {
      setOrderName(orderName === "asc" ? "desc" : "asc");
    } else {
      setDirectionName(column);
      setOrderName("asc");
    }
  };

  // Generate pagination numbers (simple logic showing max 5 pages)
  const generatePages = () => {
    const pages = [];
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(total_page, page + 2);

    // Adjust if less than 5 pages shown
    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(total_page, startPage + 4);
      } else if (endPage === total_page) {
        startPage = Math.max(1, endPage - 4);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:bg-black dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border border-gray-300 dark:border-white/[0.05]">
                <TableRow>
                  {tableHeaders.map((item) => {
                    const isSortable = !!item.name;
                    const isActive = directionName === item.name;
                    return (
                      <TableCell
                        key={item.id}
                        isHeader
                        className={`px-2 py-3 font-bold text-white text-theme-sm dark:text-white cursor-pointer bg-slate-800 border border-white`}
                        onClick={() =>
                          isSortable && eventRowSortHandler(item.name)
                        }
                      >
                        <div
                          className={`flex flex-row items-start py-0 px-0 ${item.className}`}
                        >
                          <div
                            className={`${
                              isSortable && isActive ? "basis-3/4" : "basis-4/4"
                            }`}
                          >
                            {item.title.toUpperCase()}
                          </div>

                          {isSortable && isActive && (
                            <div className="basis-1/4">
                              {orderName === "asc" ? (
                                <ArrowUpIcon />
                              ) : (
                                <ArrowDownIcon />
                              )}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {records.length > 0 ? (
                  records.map((record, index) => (
                    <TableRow
                      key={record.package_id || index}
                      className={`${
                        (index + 1) % 2 === 0 ? "bg-slate-200" : "bg-white"
                      }`}
                    >
                      <TableCell className="px-4 py-3 text-center text-theme-sm text-slate-700 dark:text-white justify-center">
                        {(page - 1) * limit + index + 1}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-theme-sm text-slate-700 dark:text-white text-center">
                        <Badge
                          size="sm"
                          color={
                            record.history_status.toLowerCase() === "done"
                              ? "success"
                              : record.history_status.toLowerCase() ===
                                "on progress"
                              ? "warning"
                              : "error"
                          }
                        >
                          {record.history_status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-center font-bold text-theme-sm text-slate-700 dark:text-white">
                        {record.history_type.toUpperCase()}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-justify text-sm text-slate-700 dark:text-white break-words">
                        {record.history_description}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-center text-theme-sm text-slate-700 dark:text-white">
                        {record?.updated_at
                          ? formatedDate(
                              new Date(record.updated_at),
                              "dd MMM yyyy"
                            )
                          : record?.created_at ? formatedDate(
                            new Date(record.created_at),
                            "dd MMM yyyy"
                          ): ''}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      className="px-4 py-3 text-slate-600 dark:text-white text-center justify-center text-theme-sm "
                      colSpan={tableHeaders.length}
                    >
                      No data available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 border-t border-gray-100 dark:border-white/[0.05]">
          <div className="text-sm text-slate-600 dark:text-white">
            Total Baris : <span className="font-medium">{total_row}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-100 text-sm disabled:opacity-50"
            >
              Prev
            </button>
            {generatePages().map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded text-sm ${
                  page === p ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={page === total_page}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 rounded bg-gray-200 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
