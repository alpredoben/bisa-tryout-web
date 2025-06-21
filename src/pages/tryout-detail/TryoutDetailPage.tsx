/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { useAppSelector } from "../../stores/hooks";
import { selectGrantedPermissions } from "../../stores/selectors";
import { useDeleteDataMutation, useFetchDataQuery } from "../../services/tryoutDetailApi";
import { toast } from "react-toastify";
import { PageMeta } from "../../components/common/PageMeta";
import { BreadCrumb } from "../../components/common/BreadCrumb";
import { ComponentCard } from "../../components/common/ComponentCard";
import { PackageDropdown } from "../tryout-package/PackageDropdown";
import { PlusIcon } from "../../assets/icons";

const LIMITS = [5, 10, 15, 20, 25, 50, 75, 100];

export default function TryoutDetailPage() {
  const navigate = useNavigate()
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTextTemp, setSearchTextTemp] = useState("");
  const [searchText, setSearchText] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  const [directionName, setDirectionName] = useState("updated_at");
  const [orderName, setOrderName] = useState<"asc" | "desc">("desc");
  const [selectedPackage, setSelectedPackage] = useState<{
    package_id: string;
    name: string;
  } | null>(null);

  const [selectedType, setSelectedType] = useState<{
    type_id: string;
    name: string;
  } | null>(null);

  const [selectedId, setSelectedId] = useState<
    any | null
  >(null);
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
    package_id: selectedPackage?.package_id || "",
    type_id: selectedType?.type_id || "",
    direction_name: directionName,
    order_name: orderName,
    search: searchText,
  });

  useEffect(() => {
    if (selectedPackage) {
      refetch();
    }

    if(selectedType) {
      refetch()
    }
  }, [selectedPackage, selectedType, refetch]);

  const eventEditHandler = async (data: any) => {
    setSelectedId(data?.detail_id);
    setIsEditMode(true);
    openModal();
  };

  const eventSelectPackageHandler = (value: any) => {
    setSelectedPackage({
      ...selectedPackage,
      package_id: value?.package_id,
      name: value?.name,
    });
    setPage(1);
  };


  const eventDeleteHandler = async (data: any): Promise<void> => {
    if (
      window.confirm(
        `Apakah kamu yakin ingin menghapus detail tryout "${data.name}"?`
      )
    ) {
      try {
        const response = await deleteData(data?.detail_id).unwrap();
        toast.success(response?.message);
        refetch?.();
      } catch (error: any) {
        alert("Gagal menghapus detail tryout");
        console.error(error);
        if(error.status === 422) {
          toast.error(error.data.data[0].message)
        }
        else {
          toast.error(error.data.message);
        }
      }
    }
  };

  const eventViewHandler = async(data: any): Promise<void> => {
    navigate('/tryout-details/view', {
      state: {
        detailId: data?.detail_id
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
    openModal()
  }


  const eventRowSortHandler = (column: string | undefined) => {
    if (!column) return;

    if (directionName === column) {
      setOrderName(orderName === "asc" ? "desc" : "asc");
    } else {
      setDirectionName(column);
      setOrderName("asc");
    }
  };

  console.log({selectedPackage})

  return (
    <>
      <PageMeta
        title="Master Tryout | Detail Tryout"
        description="This is master tryout category on admin panel"
      />

      <BreadCrumb pageTitle="DETAIL TRYOUT" />
      <div className="space-y-6">
        <ComponentCard title="MASTER DETAIL TRYOUT">
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
                <div className="w-full">
                  <div className="w-full">
                    <label className="block -mt-5 mb-1 text-sm font-medium text-gray-700">
                      Paket Tryout
                    </label>
                    <PackageDropdown
                      value={selectedPackage}
                      onChange={eventSelectPackageHandler}
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
                      placeholder="Cari Nama Kategori/Organisasi/Keterangan..."
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
                          onClick={(e:any) => eventAddHandler(e)}
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

        </ComponentCard>
      </div>

     
    </>
  );
};