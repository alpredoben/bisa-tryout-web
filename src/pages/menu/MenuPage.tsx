/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BreadCrumb } from "../../components/common/BreadCrumb";
import { ComponentCard } from "../../components/common/ComponentCard";
import { PageMeta } from "../../components/common/PageMeta";
import { PlusIcon } from "../../assets/icons";
import { useAppSelector } from "../../stores/hooks";
import { useFetchMenuQuery } from "../../services/menuApi";
import { MenuTreeView } from "./MenuTreeView";
import { MenuModal } from "./MenuModal";
import { useModal } from "../../hooks/useModal";

const MenuPage = () => {
  const { isOpen, openModal, closeModal } = useModal();

  const listPermissions = useAppSelector((state) => state.auth.grantedPermissions) || [];

  const {data, isLoading, isError} = useFetchMenuQuery(undefined);

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
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm whitespace-nowrap" onClick={() => openModal()}>
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
            <MenuTreeView listPermissions={listPermissions} listMenu={data} />
          )}
        </ComponentCard>
      </div>

      <MenuModal isOpen={isOpen} closeModal={closeModal} isEditMode={false}  />

    </>
  );
};

export default MenuPage;
