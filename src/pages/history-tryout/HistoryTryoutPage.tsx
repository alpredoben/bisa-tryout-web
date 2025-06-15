/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { BreadCrumb } from "../../components/common/BreadCrumb";
import { ComponentCard } from "../../components/common/ComponentCard";
import { PageMeta } from "../../components/common/PageMeta";
import { useFetchHistoryTryoutQuery } from "../../services/historyTryoutApi";
import HistoryTryoutTable from "./HistoryTryoutTable";
import Select from "../../components/form/Select";

interface I_HistoryProps {
  history_type?: string;
}

const LIMITS = [5, 10, 15, 20, 25, 50, 75, 100];

const HistoryTryoutPage = ({history_type = 'all'}: I_HistoryProps) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTextTemp, setSearchTextTemp] = useState("");
  const [searchText, setSearchText] = useState("");
  const [directionName, setDirectionName] = useState("created_at");
  const [orderName, setOrderName] = useState<"asc" | "desc">("desc");
  const [historyStatus, setHistoryStatus] = useState<string>('all')


  const options = [
    { value: "ALL", label: "ALL" },
    { value: "ON PROGRESS", label: "ON PROGRESS" },
    { value: "DONE", label: "DONE" },
  ];

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
  } = useFetchHistoryTryoutQuery({
    page,
    limit,
    history_status:historyStatus,
    history_type,
    direction_name: directionName,
    order_name: orderName,
    search: searchText,
  });

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

  const eventSelectChangeHandler = (value: string) => {
    setHistoryStatus(value);
    setPage(1);
  };

  return (
    <>
      <PageMeta
        title="Master Tryout | Paket Tryout"
        description="This is master tryout package on admin panel"
      />

      <BreadCrumb pageTitle="PAKET TRYOUT" segment={`Paket Tryout`} />
      <div className="space-y-6">
        <ComponentCard title="RIWAYAT IMPORT PAKET TRYOUT">
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
                <div className="w-full">
                  <div className="w-full">
                    <label className="block -mt-5 mb-1 text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <Select
                      options={options}
                      placeholder="Select Option"
                      onChange={eventSelectChangeHandler}
                      className="dark:bg-dark-900"
                    />
                  </div>
                </div>
                
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
                      placeholder="Cari Nama/Kategori/Keterangan..."
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
            <HistoryTryoutTable
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
              refetchTable={refetch}
            />
          )}
        </ComponentCard>
      </div>
    </>
  );
};

export default HistoryTryoutPage