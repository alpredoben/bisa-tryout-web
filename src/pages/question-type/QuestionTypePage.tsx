/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { selectGrantedPermissions } from "../../stores/selectors";
import {
  useDeleteDataMutation,
  useFetchDataQuery,
} from "../../services/questionTypeApi";
import { toast } from "react-toastify";
import { PageMeta } from "../../components/common/PageMeta";
import { BreadCrumb } from "../../components/common/BreadCrumb";
import { ComponentCard } from "../../components/common/ComponentCard";
import { PlusIcon } from "../../assets/icons";
import QuestionTypeTable from "./QuestionTypeTable";

const LIMITS = [5, 10, 15, 20, 25, 50, 75, 100];

const QuestionTypePage = () => {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchTextTemp, setSearchTextTemp] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const { isOpen, openModal, closeModal } = useModal();
  const [directionName, setDirectionName] = useState("created_at");
  const [orderName, setOrderName] = useState<"asc" | "desc">("desc");

  const [selectedId, setSelectedId] = useState<any | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const listPermissions = useAppSelector(selectGrantedPermissions);

  const [deleteData] = useDeleteDataMutation();

  const {
    data = {
      records: [],
      next_page: 0,
      prev_page: 0,
      limit: 0,
      page: 0,
      total_page: 0,
      total_row: 0,
    },
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchDataQuery({
    page,
    limit,
    direction_name: directionName,
    order_name: orderName,
    search: searchText,
  });

  const eventEditHandler = async (data: any) => {
    setSelectedId(data?.question_type_id);
    setIsEditMode(true);
    openModal();
  };

  const eventDeleteHandler = async (data: any): Promise<void> => {
    if (
      window.confirm(
        `Apakah kamu yakin ingin menghapus tipe tryout "${data.name}" ini?`
      )
    ) {
      try {
        const response = await deleteData(data?.question_type_id).unwrap();
        toast.success(response?.message);
        refetch?.();
      } catch (error: any) {
        alert("Gagal menghapus tipe tryout");
        console.error(error);
        toast.error(error?.message);
      }
    }
  };

  const eventSearchHandler = () => {
    setSearchText(searchTextTemp);
    setPage(1);
  };

  const eventLimitChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const eventSearchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTextTemp(e.target.value);
  };

  const eventAddHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    openModal();
  };

  return (
    <>
      <PageMeta
        title="Master Pertanyaan | Tipe Pertanyaan"
        description="This is master tryout package on admin panel"
      />

      <BreadCrumb pageTitle="Tipe Pertanyaan" />
      <div className="space-y-6">
        <ComponentCard title="MASTER DATA TIPE PERTANYAAN">
          {/* Top Controls */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:flex-nowrap mt-10">
            {/* Limit Dropdown */}
            <div className="min-w-16 max-w-sm">
              <label className="block -mt-5 mb-1 text-sm font-medium text-gray-700">
                Limit
              </label>
              <select
                value={limit}
                onChange={eventLimitChangeHandler}
                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full"
              >
                {LIMITS.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-14 max-w-sm">&nbsp;</div>

            {/* Category Dropdown */}

            <div className="min-w-full">
              <div className="flex flex-wrap items-center gap-4 w-full sm:flex-nowrap">
                {/* Search Input */}
                <div className="w-full">
                  <div className="w-full">
                    <label className="block -mt-5 mb-1 text-sm font-medium text-gray-700">
                      Pencarian
                    </label>
                    <input
                      type="text"
                      value={searchTextTemp}
                      onChange={eventSearchChangeHandler}
                      placeholder="Cari Nama/Keterangan..."
                      className="px-3 py-2 border border-gray-300 rounded text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="w-full">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="w-full sm:w-auto mt-1">
                      <button
                        onClick={eventSearchHandler}
                        className="bg-slate-500 w-full hover:bg-slate-700 text-white px-4 py-2.5 gap-2 rounded text-sm"
                      >
                        Search
                      </button>
                    </div>

                    <div className="w-full sm:w-auto mt-1">
                      {listPermissions.includes("create") ? (
                        <button
                          onClick={(e: any) => eventAddHandler(e)}
                          className="bg-blue-500 w-full hover:bg-blue-700 text-white px-4 py-2.5 rounded text-sm whitespace-nowrap"
                        >
                          <div className="flex flex-row gap-1">
                            <span className="py-0.5">
                              <PlusIcon />
                            </span>
                            <span>Tambah</span>
                          </div>
                        </button>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>
              Error: {(error as any)?.data?.message || "Failed to load data"}
            </p>
          ) : (
            <QuestionTypeTable
              search={searchText}
              datatable={data}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              orderName={orderName}
              directionName={directionName}
              setOrderName={setOrderName}
              setDirectionName={setDirectionName}
              onEdit={eventEditHandler}
              onRemove={eventDeleteHandler}
              onSuccess={(message: string) => {
                toast.success(message, { transition: Slide });
              }}
              onError={(message: string) => {
                toast.error(message, { transition: Slide });
              }}
              refetchTable={refetch}
              listPermissions={listPermissions}
            />
          )}
        </ComponentCard>
      </div>
    </>
  );
};

export default QuestionTypePage;
