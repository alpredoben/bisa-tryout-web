/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BreadCrumb } from "../../components/common/BreadCrumb";
import { ComponentCard } from "../../components/common/ComponentCard";
import { PageMeta } from "../../components/common/PageMeta";
import { useModal } from "../../hooks/useModal";
import { ChevronDownIcon, PlusIcon } from "../../assets/icons";
import { CategoryDropdown } from "./CategoryDropdown";
import { useAppSelector } from "../../stores/hooks";
import { selectGrantedPermissions } from "../../stores/selectors";
import {
  useDeletePackageMutation,
  useFetchPackagesQuery,
} from "../../services/packageTryoutApi";
import TryoutPackageTable from "./TryoutPackageTable";
import { Slide, toast } from "react-toastify";
import { TryoutPackageModal } from "./TryoutPackageModal";

const LIMITS = [5, 10, 15, 20, 25, 50, 75, 100];

const TryoutPackage = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTextTemp, setSearchTextTemp] = useState("");
  const [searchText, setSearchText] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  const [directionName, setDirectionName] = useState("created_at");
  const [orderName, setOrderName] = useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] = useState<{
    category_id: string;
    name: string;
  } | null>(null);

  const [selectTryoutPackageId, setSelectTryoutPackageId] = useState<
    any | null
  >(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const listPermissions = useAppSelector(selectGrantedPermissions);

  const [deletePackage] = useDeletePackageMutation();

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
  } = useFetchPackagesQuery({
    page,
    limit,
    category_id: selectedCategory?.category_id || "",
    direction_name: directionName,
    order_name: orderName,
    search: searchText,
  });

  useEffect(() => {
    if (selectedCategory) {
      refetch();
    }
  }, [selectedCategory, refetch]);

  const eventEditHandler = async (data: any) => {
    setSelectTryoutPackageId(data?.package_id);
    setIsEditMode(true);
    openModal();
  };

  const eventSelectCategoryHandler = (value: any) => {
    setSelectedCategory({
      ...selectedCategory,
      category_id: value?.category_id,
      name: value?.name,
    });
    setPage(1);
  };

  const eventDeleteHandler = async (data: any): Promise<void> => {
    if (
      window.confirm(
        `Apakah kamu yakin ingin menghapus paket tryout "${data.name}"?`
      )
    ) {
      try {
        const response = await deletePackage(data?.package_id).unwrap();
        toast.success(response?.message);
        refetch?.();
      } catch (error: any) {
        alert("Gagal menghapus paket tryout");
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

  return (
    <>
      <PageMeta
        title="Master Tryout | Paket Tryout"
        description="This is master tryout package on admin panel"
      />

      <BreadCrumb pageTitle="PAKET TRYOUT" />
      <div className="space-y-6">
        <ComponentCard title="MASTER DATA PAKET TRYOUT">
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
                <div className="basis-1/5">
                  <div className="w-full">
                    <label className="block -mt-5 mb-1 text-sm font-medium text-gray-700">
                      Kategori Tryout
                    </label>
                    <CategoryDropdown
                      value={selectedCategory}
                      onChange={eventSelectCategoryHandler}
                    />
                  </div>
                </div>

                {/* Search Input */}
                <div className="basis-2/5">
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
                <div className="basis-1/4">
                  <div className="w-full flex flex-row gap-3">
                    <div className="basis-1/3 mt-1">
                      <button
                        onClick={eventSearchHandler}
                        className="bg-slate-500 w-full hover:bg-slate-700 text-white px-4 py-2.5 gap-2 rounded text-sm"
                      >
                        Search
                      </button>
                    </div>

                    <div className="basis-1/3 mt-1">
                      {listPermissions.includes('created') ? (<button
                        onClick={openModal}
                        className="bg-blue-500 w-full hover:bg-blue-700 text-white px-4 py-2.5 rounded text-sm whitespace-nowrap"
                      >
                        <div className="flex flex-row gap-1">
                          <span className="py-0.5"><PlusIcon /></span>
                          <span>Tambah</span>
                        </div>
                        
                      </button>): (<span>&nbsp;</span>)}
                    </div>

                    <div className="basis-1/3 mt-1">
                      <Menu>
                        <MenuButton className="w-full flex items-center gap-2 bg-emerald-800 text-white px-4 py-2.5 rounded text-sm whitespace-nowrap">
                          Action <ChevronDownIcon />
                        </MenuButton>
                        <MenuItems
                          anchor="bottom"
                          className="mt-2 bg-white border border-slate-300 shadow-lg w-48"
                        >
                          {["Import", "Export", "Riwayat"].map((item) => (
                            <MenuItem key={item}>
                              {({ active }) => (
                                <button
                                  className={`w-full text-left px-4 py-2 text-sm font-medium rounded ${
                                    active
                                      ? "bg-emerald-400 hover:bg-emerald-700 text-white"
                                      : "bg-white text-emerald-800"
                                  }`}
                                  onClick={() =>
                                    (window.location.href = "/settings")
                                  }
                                >
                                  {item}
                                </button>
                              )}
                            </MenuItem>
                          ))}
                        </MenuItems>
                      </Menu>
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
            <TryoutPackageTable
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

      <TryoutPackageModal
        key={
          isOpen
            ? `modal-${isEditMode}-${selectTryoutPackageId}`
            : "modal-closed"
        }
        isOpen={isOpen}
        closeModal={closeModal}
        isEditMode={isEditMode}
        selectedId={selectTryoutPackageId}
        refetchData={refetch}
        onSuccess={(message: string) => {
          toast.success(message, { transition: Slide });
        }}
        onError={(message: string) => {
          toast.success(message, { transition: Slide });
        }}
      />
    </>
  );
};

export default TryoutPackage;
