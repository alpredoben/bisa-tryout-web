/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BreadCrumb } from "../../components/common/BreadCrumb";
import { ComponentCard } from "../../components/common/ComponentCard";
import { PageMeta } from "../../components/common/PageMeta";
import { PlusIcon } from "../../assets/icons";
import { useAppSelector } from "../../stores/hooks";
import { useDeleteMenuMutation, useFetchMenuQuery } from "../../services/menuApi";
import { MenuTreeView } from "./MenuTreeView";
import { MenuModal } from "./MenuModal";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
import { Slide, toast } from "react-toastify";

const MenuPage = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const listPermissions =
    useAppSelector((state) => state.auth.grantedPermissions) || [];
  const { data, isLoading, isError, refetch } = useFetchMenuQuery(undefined);

  const [selectedMenuId, setSelectedMenuId] = useState<any | null>(null);
  const [selectedParentId, setSelectedParentId] = useState<any | null> (null)
  const [isEditMode, setIsEditMode] = useState(false);


  const [deleteMenu] = useDeleteMenuMutation();

  // Edit Menu
  const eventEditMenuHandler = (menuId: string) => {
    setIsEditMode(true);
    setSelectedMenuId(menuId);
    openModal();
  };

  const eventAddMenuHandler = (menuId: any | null = null) => {
    setIsEditMode(false);
    setSelectedParentId(menuId)
    openModal();
  }

  const eventDeleteMenuHandler = async(data: any):Promise<void> => {
    if (window.confirm(`Apakah kamu yakin ingin menghapus menu "${data.name}" ini?`)) {
      try {
        const response = await deleteMenu(data.menu_id).unwrap();
        toast.success(response?.message); 
        refetch?.();
      } catch (error: any) {
        alert(`Gagal menghapus menu ${data.name}`)
        toast.error(`${error?.data?.message}`)
      }
    }
  }


  return (
    <>
      <PageMeta
        title="Konfigurasi | Master Menu"
        description="This is menu page in admin panel"
      />

      <BreadCrumb pageTitle="Menu" />
      <div className="space-y-6">
        <ComponentCard title="Master Data Menu">
          {/* Top Controls */}
          <div className="flex justify-end items-center mb-4 gap-2">
            {/* Tombol "Tambah" */}
            {listPermissions?.includes("create") && (
              <button
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm whitespace-nowrap"
                onClick={() => eventAddMenuHandler()}
              >
                <PlusIcon />
                <span>Tambah</span>
              </button>
            )}
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>
              Error: {(isError as any)?.data?.message || "Failed to load data"}
            </p>
          ) : (
            <MenuTreeView
              listPermissions={listPermissions}
              listMenu={data}
              onEdit={eventEditMenuHandler}
              onAdd={eventAddMenuHandler}
              onDelete={eventDeleteMenuHandler}
              onSuccess={(message: string) => {
                toast.success(message, { transition: Slide });
              }}
              refetchData={refetch}
            />
          )}
        </ComponentCard>
      </div>

      <MenuModal
        key={isOpen ? `modal-${isEditMode}-${selectedMenuId}-${selectedParentId}` : "modal-closed"}
        isOpen={isOpen}
        closeModal={closeModal}
        isEditMode={isEditMode}
        selectMenuId={selectedMenuId}
        selectedParentId={selectedParentId}
        refetchData={refetch}
        onSuccess={(message: string) => {
          toast.success(message, { transition: Slide });
        }}
      />
    </>
  );
};

export default MenuPage;
