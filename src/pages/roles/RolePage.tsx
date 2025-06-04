/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { BreadCrumb } from "../../components/common/BreadCrumb";
import { ComponentCard } from "../../components/common/ComponentCard";
import { PageMeta } from "../../components/common/PageMeta";
import { useFetchRolesQuery } from "../../services/roleApi";
import RoleTable from "./RoleTable";
import { PlusIcon } from "../../assets/icons";
import {RoleModal} from "./RoleModal";
import { useModal } from "../../hooks/useModal";
import { Slide, toast } from "react-toastify";
import { useAppSelector } from "../../stores/hooks";

const LIMITS = [5, 10, 15, 20, 25, 50, 75, 100]

const RolePage = () => {
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { isOpen, openModal, closeModal } = useModal();
  const [directionName, setDirectionName] = useState("created_at");
  const [orderName, setOrderName] = useState<"asc" | "desc">("desc");

  const [selectedRoleId, setSelectedRoleId] = useState<any | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const listPermissions = useAppSelector((state) => state.auth.grantedPermissions) || [];

  
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
  } = useFetchRolesQuery({
    page,
    limit,
    direction_name: directionName,
    order_name: orderName,
    search,
  });

  const eventEditHandler = async(roleId: string) => {
    setSelectedRoleId(roleId)
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
        title="Konfigurasi | Master Role"
        description="This is role page in admin panel"
      />

      <BreadCrumb pageTitle="Roles" />
      <div className="space-y-6">
        <ComponentCard title="Master Data Role">
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
                placeholder="Search roles..."
                className="px-3 py-2 border border-gray-300 rounded text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              
              <button
                onClick={eventHandleSearch}
                className="bg-slate-500 hover:bg-slate-700 text-white px-4 py-2 rounded text-sm"
              >
                Search
              </button>

              {listPermissions?.includes("create") && (<button
                onClick={openModal}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm whitespace-nowrap"
              >
                <PlusIcon/>
                <span>Tambah</span>
              </button>)}
              
            </div>
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>
              Error: {(error as any)?.data?.message || "Failed to load data"}
            </p>
          ) : (
            <RoleTable
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
              listPermissions={listPermissions}
            />
          )}
        </ComponentCard>
      </div>


      {/* Modal Tambah */}
      <RoleModal
        isOpen={isOpen}
        closeModal={closeModal}
        selectedRoleId={selectedRoleId}
        isEditMode={isEditMode}
        refetchTable={refetch}
        onSuccess={(message: string) => {
          toast.success(message, { transition: Slide });
        }}
      />
    </>
  );
};

export default RolePage;
