/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PencilIcon,
  TrashBinIcon,
} from "../../assets/icons";
import { useDeleteRoleMutation } from "../../services/roleApi";

interface ApiResponse {
  records: any[] | [];
  next_page: number;
  prev_page: number;
  total_page: number;
  total_row: number;
  limit: number;
  page: number;
}

interface TableProps {
  datatable: ApiResponse;
  search?: string;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (value: number) => void;
  directionName: string;
  orderName: "asc" | "desc";
  setDirectionName: (value: string) => void;
  setOrderName: (value: "asc" | "desc") => void;
  onEdit: (data: any) => void;
  onSuccess?: (message: string) => void; 
  refetchTable?: () => void;
  listPermissions: string[] | []
}

interface TableHeaders {
  id: number;
  title: string;
  name?: string;
}

const tableHeaders: TableHeaders[] = [
  { id: 1, title: "No" },
  { id: 2, title: "Name", name: "role_name" },
  { id: 3, title: "Slug", name: "role_slug" },
  { id: 4, title: "Created At", name: "created_at" },
  { id: 5, title: "Action" },
];

export default function RoleTable({
  datatable,
  page,
  setPage,
  orderName,
  directionName,
  setDirectionName,
  setOrderName,
  onEdit,
  onSuccess,
  refetchTable,
  listPermissions
}: TableProps) {
  const { records, total_row, limit, total_page } = datatable;

  const [deleteRole] = useDeleteRoleMutation();

  const eventDeleteHandler = async (data: any): Promise<void> => {
    if (window.confirm(`Apakah kamu yakin ingin menghapus role "${data.role_name}" ini?`)) {
      try {
        const response = await deleteRole(data.role_id).unwrap();
        onSuccess?.(response?.message); 
        refetchTable?.();
      } catch (error) {
        alert("Gagal menghapus role");
        console.error(error);
      }
    }
  };

  const eventHandlerSort = (column: string | undefined) => {
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
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {tableHeaders.map((item) => {
                    const isSortable = !!item.name;
                    const isActive = directionName === item.name;
                    return (
                      <TableCell
                        key={item.id}
                        isHeader
                        className={`px-3 py-3 font-medium text-emerald-900 text-theme-xs dark:text-emerald-700 size-14 cursor-pointer ${
                          item.title === "No" ? "text-center" : "text-start"
                        }`}
                        onClick={() =>
                          isSortable && eventHandlerSort(item.name)
                        }
                      >
                        <div className="flex items-center gap-1">
                          <span>{item.title}</span>

                          {isSortable && isActive && (
                            <>
                              {orderName === "asc" ? (
                                <ArrowUpIcon />
                              ) : (
                                <ArrowDownIcon />
                              )}
                            </>
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
                    <TableRow key={record.role_id || index}>
                      <TableCell className="px-4 py-3 text-center text-theme-sm text-slate-700 dark:text-slate-600 justify-center">
                        {(page - 1) * limit + index + 1}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-slate-700 dark:text-slate-600">
                        {record.role_name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-slate-700 dark:text-slate-600">
                        {record.role_slug}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-slate-700 dark:text-slate-600">
                        {record?.created_at ? format(new Date(record.created_at), "dd MMM yyyy"): ''}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-slate-700 dark:text-slate-600">
                        <div className="flex gap-2">
                          {listPermissions.includes('update') && (<button
                            onClick={() => onEdit(record.role_id)}
                            className="p-2 text-white hover:text-gray-100 bg-yellow-500 hover:bg-yellow-400 rounded text-sm"
                          >
                            <PencilIcon />
                          </button>)}
                          {listPermissions.includes('delete') && (<button
                            onClick={() => eventDeleteHandler(record)}
                            className="p-2 text-white hover:text-gray-100 bg-red-500 hover:bg-red-700 rounded text-sm"
                          >
                            <TrashBinIcon />
                          </button>)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      className="px-4 py-3 text-gray-500 text-center justify-center text-theme-sm dark:text-gray-400"
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
          <div className="text-sm text-slate-600">
            Total: <span className="font-medium">{total_row}</span> data
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 rounded bg-gray-200 text-sm disabled:opacity-50"
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
