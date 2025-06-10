/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { BreadCrumb } from "../../components/common/BreadCrumb";
import { ComponentCard } from "../../components/common/ComponentCard";
import { PageMeta } from "../../components/common/PageMeta";
import {
  useDeleteRoleMutation,
  useFetchRolesQuery,
} from "../../services/roleApi";
import RoleTable from "./RoleTable";
import { PlusIcon } from "../../assets/icons";
import { RoleModal } from "./RoleModal";
import { useModal } from "../../hooks/useModal";
import { Slide, toast } from "react-toastify";
import { useAppSelector } from "../../stores/hooks";

const LIMITS = [5, 10, 15, 20, 25, 50, 75, 100];

const RolePage = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTextTemp, setSearchTextTemp] = useState("");
  const [searchText, setSearchText] = useState("");

  const { isOpen, openModal, closeModal } = useModal();
  const [directionName, setDirectionName] = useState("created_at");
  const [orderName, setOrderName] = useState<"asc" | "desc">("desc");

  const [selectedRoleId, setSelectedRoleId] = useState<any | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const listPermissions =
    useAppSelector((state) => state.auth.grantedPermissions) || [];

  const [deleteRole] = useDeleteRoleMutation();

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
  } = useFetchRolesQuery({
    page,
    limit,
    direction_name: directionName,
    order_name: orderName,
    search: searchText,
  });

  const eventEditHandler = async (data: any) => {
    setSelectedRoleId(data?.role_id);
    setIsEditMode(true);
    openModal();
  };

  const eventDeleteHandler = async (data: any): Promise<void> => {
    if (
      window.confirm(
        `Apakah kamu yakin ingin menghapus role "${data.role_name}"?`
      )
    ) {
      try {
        const response = await deleteRole(data?.role_id).unwrap();
        toast.success(response?.message);
        refetch?.();
      } catch (error: any) {
        alert("Gagal menghapus role");
        console.error(error);
        toast.error(error?.message);
      }
    }
  };

  const eventSearchHandler = () => {
    setSearchText(searchTextTemp);
    setPage(1);
  };

  const eventHandleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const eventSearchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTextTemp(e.target.value);
  };

  return (
    <>
      <PageMeta
        title="Konfigurasi | Master Role"
        description="This is role page in admin panel"
      />

      <BreadCrumb pageTitle="ROLES" />
      <div className="space-y-6">
        <ComponentCard title="MASTER DATA ROLE">
          {/* Top Controls */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:flex-nowrap mt-10">
            {/* Limit Dropdown */}
            <div className="basis-1/12">
              <label className="block -mt-5 mb-1 text-sm font-medium text-gray-700">
                Limit
              </label>
              <select
                value={limit}
                onChange={eventHandleLimitChange}
                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full"
              >
                {LIMITS.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>

            <div className="basis-5/12">&nbsp;</div>

            <div className="basis-8/12">
              {/* Search & Tambah Button */}
              <div className="flex flex-wrap items-center gap-4 w-full sm:flex-nowrap">
                {/* Search Input */}
                <div className="basis-8/12">
                  <div className="w-full">
                    <label className="block -mt-5 mb-1 text-sm font-medium text-gray-700">
                      Pencarian
                    </label>
                    <input
                      type="text"
                      value={searchTextTemp}
                      onChange={eventSearchChangeHandler}
                      placeholder="Cari Role Name/Slug..."
                      className="px-3 py-2 border border-gray-300 rounded text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="basis-4/12">
                  <div className="w-full flex flex-row gap-3">
                    <div className="basis-1/2 mt-1">
                      <button
                        onClick={eventSearchHandler}
                        className="bg-slate-500 w-full hover:bg-slate-700 text-white px-4 py-2.5 gap-2 rounded text-sm"
                      >
                        Search
                      </button>
                    </div>

                    <div className="basis-1/2 mt-1">
                      {listPermissions.includes("create") ? (
                        <button
                          onClick={openModal}
                          className="bg-blue-500 w-full hover:bg-blue-700 text-white px-4 py-2.5 rounded text-sm whitespace-nowrap"
                        >
                          <div className="flex flex-row gap-1 justify-center">
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
            <RoleTable
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
