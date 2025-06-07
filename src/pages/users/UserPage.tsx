import { useState } from "react";
import { BreadCrumb } from "../../components/common/BreadCrumb";
import { ComponentCard } from "../../components/common/ComponentCard";
import { PageMeta } from "../../components/common/PageMeta";
import { useFetchUsersQuery } from "../../services/userApi";
import UserTable from "./UserTable";
import { PlusIcon } from "../../assets/icons";
import {UserModal} from "./UserModal";
import { useModal } from "../../hooks/useModal";
import { Slide, toast } from "react-toastify";

const LIMITS = [5, 10, 15, 20, 25, 50, 75, 100]

const UserPage = () => {
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { isOpen, openModal, closeModal } = useModal();
  const [directionName, setDirectionName] = useState("created_at");
  const [orderName, setOrderName] = useState<"asc" | "desc">("desc");

  const [selectedUserId, setSelectedUserId] = useState<any | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);


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
    refetch
  } = useFetchUsersQuery({
    page,
    limit,
    direction_name: directionName,
    order_name: orderName,
    search,
  });

  const eventEditHandler = async(permissionId: string) => {
    setSelectedUserId(permissionId)
    setIsEditMode(true);
    openModal();
  };

  const eventHandleSearch = () => {
    setSearch(searchText);
    setPage(1);
  };

  const eventHandleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  return (
    <>
      <PageMeta
        title="Konfigurasi | Master Permission"
        description="This is permission page in admin panel"
      />

      <BreadCrumb pageTitle="Permissions" />
      <div className="space-y-6">
        <ComponentCard title="Master Data Permission">
          {/* Top Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
            {/* Limit Dropdown */}
            <div className="w-full sm:w-auto">
              <select
                value={limit}
                onChange={eventHandleLimitChange}
                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {LIMITS.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>

            {/* Search & Tambah Button */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search permissions..."
                className="px-3 py-2 border border-gray-300 rounded text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={eventHandleSearch}
                className="bg-slate-500 hover:bg-slate-700 text-white px-4 py-2 rounded text-sm"
              >
                Search
              </button>
              <button
                onClick={openModal}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm whitespace-nowrap"
              >
                <PlusIcon/>
                <span>Tambah</span>
              </button>
            </div>
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>
              Error: {(error as any)?.data?.message || "Failed to load data"}
            </p>
          ) : (
            <UserTable
              search={search}
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
              onSuccess={(message: string) => {
                toast.success(message, { transition: Slide });
              }}
              refetchTable={refetch}
            />
          )}
        </ComponentCard>
      </div>


      {/* Modal Tambah */}
      <UserModal
        isOpen={isOpen}
        closeModal={closeModal}
        selectedUserId={selectedUserId}
        isEditMode={isEditMode}
        refetchTable={refetch}
        onSuccess={(message: string) => {
          toast.success(message, { transition: Slide });
        }}
      />
    </>
  );
};

export default UserPage;
