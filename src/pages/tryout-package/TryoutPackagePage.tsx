/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { BreadCrumb } from "../../components/common/BreadCrumb";
import { ComponentCard } from "../../components/common/ComponentCard";
import { PageMeta } from "../../components/common/PageMeta";
import { useModal } from "../../hooks/useModal";
import { useAppSelector } from "../../stores/hooks";
import { selectGrantedPermissions } from "../../stores/selectors";
import { Slide, toast } from "react-toastify";
import {
  useDeleteDataMutation,
  useFetchDataQuery,
} from "../../services/tryoutPackageApi";
import { PlusIcon } from "../../assets/icons";
import { CategoryDropdown } from "../tryout-category/CategoryDropdown";
import { StageDropdown } from "../tryout-stage/StageDropdown";
import TryoutPackageTable from "./TryoutPackageTable";
import { TryoutPackageModal } from "./TryoutPackageModal";
import { useNavigate } from "react-router-dom";

const LIMITS = [5, 10, 15, 20, 25, 50, 75, 100];

export default function TryoutPackagePage() {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTextTemp, setSearchTextTemp] = useState("");
  const [searchText, setSearchText] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  const [directionName, setDirectionName] = useState("updated_at");
  const [orderName, setOrderName] = useState<"asc" | "desc">("desc");
  const [selectedId, setSelectedId] = useState<any | null>(null);

  const [selectCategory, setSelectCategory] = useState<{
    category_id: string;
    name: string;
  } | null>(null);

  const [selectStage, setSelectStage] = useState<{
    stage_id: string;
    name: string;
  } | null>(null);

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
    category_id: selectCategory?.category_id,
    stage_id: selectStage?.stage_id,
  });

  const eventEditHandler = async (data: any) => {
    setSelectedId(data?.package_id);
    setIsEditMode(true);
    openModal();
  };

  const eventDeleteHandler = async (data: any): Promise<void> => {
    if (
      window.confirm(
        `Apakah kamu yakin ingin menghapus jenis tes "${data.name}" ini?`
      )
    ) {
      try {
        const response = await deleteData(data?.package_id).unwrap();
        toast.success(response?.message);
        refetch?.();
      } catch (error: any) {
        alert("Gagal menghapus paket tryout");
        console.error(error);
        if (error.status === 422) {
          toast.error(error.data.data[0].message);
        } else {
          toast.error(error.data.message);
        }
      }
    }
  };

  const eventViewHandler = async(data: any): Promise<void> => {
    navigate('/tryout-packages/view', {
      state: {
        packageId: data?.package_id
      }
    });
  }

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

  const eventAddHandler = (_e: React.ChangeEvent<HTMLInputElement>) => {
    openModal();
  };

  const eventRowSortHandler = (column: string | undefined) => {
    if (!column) return;

    if (directionName === column) {
      setOrderName(orderName === "asc" ? "desc" : "asc");
    } else {
      setDirectionName(column);
      setOrderName("asc");
    }
  };

  const eventSelectCategoryHandler = (value: any) => {
    setSelectCategory({
      ...selectCategory,
      category_id: value?.category_id,
      name: value?.name,
    });
    setPage(1);
  };

  const eventSelectStageHandler = (value: any) => {
    setSelectStage({
      ...selectStage,
      stage_id: value?.stage_id,
      name: value?.name,
    });
    setPage(1);
  };

  return (
    <>
      <PageMeta
        title="Master Tryout | Paket Tryout"
        description="This is master tryout stage on admin panel"
      />

      <BreadCrumb pageTitle="PAKET TRYOUT" />
      <div className="space-y-6">
        <ComponentCard title="MASTER PAKET TRYOUT">
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

            <div className="min-w-full">
              <div className="flex flex-wrap items-center gap-4 w-full sm:flex-nowrap">
                {/* Select Category */}
                <div className="w-full">
                  <div className="w-full">
                    <label className="block -mt-5 mb-1 text-sm font-medium text-gray-700">
                      Kategori Tryout
                    </label>
                    <CategoryDropdown
                      value={selectCategory}
                      onChange={eventSelectCategoryHandler}
                    />
                  </div>
                </div>

                {/* Select Stage */}
                <div className="w-full">
                  <div className="w-full">
                    <label className="block -mt-5 mb-1 text-sm font-medium text-gray-700">
                      Jenis Tes
                    </label>
                    <StageDropdown
                      value={selectStage}
                      onChange={eventSelectStageHandler}
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
                      placeholder="Cari..."
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
            <TryoutPackageTable
              search={searchText}
              datatable={data}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              orderName={orderName}
              directionName={directionName}
              onSortRow={eventRowSortHandler}
              onEdit={eventEditHandler}
              onRemove={eventDeleteHandler}
              onView={eventViewHandler}
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
            ? `modal-${isEditMode}-${selectedId ? selectedId : ""}`
            : "modal-closed"
        }
        isOpen={isOpen}
        closeModal={closeModal}
        isEditMode={isEditMode}
        selectedId={selectedId}
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
}
