/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import type { I_ModalProps } from "../../interfaces/appInterface";
import {
  useCreateDataMutation,
  useFindDataByIdQuery,
  useUpdateDataMutation,
} from "../../services/tryoutCategoryApi";
import type { I_TryoutCategoryInput } from "../../interfaces/tryoutInterface";
import { Modal } from "../../components/ui/modal";
import { OrganizationDropdown } from "../organization/OrganizationDropdown";

export function TryoutCategoryModal({
  isOpen,
  closeModal,
  isEditMode = false,
  selectedId = null,
  refetchData,
  onSuccess,
  onError
}: I_ModalProps) {
  const [formData, setFormData] = useState<I_TryoutCategoryInput>({
    name: "",
    description: "",
    organization_id: null,
    prices: 0,
    year: null,
  });

  const [selectedOrganization, setSelectedOrganization] = useState<{
    organization_id: any | null;
    name: string;
  } | null>(null);

  const { data: rowData } = useFindDataByIdQuery(selectedId!, {
    skip: !isEditMode || !selectedId,
  });

  const [createData, { isLoading: isCreating }] = useCreateDataMutation();
  const [updateData, { isLoading: isUpdating }] = useUpdateDataMutation();

  const resetFormModal = () => {
    setFormData({
      ...formData,
      name: "",
      description: "",
      organization_id: null,
      prices: 0,
      year: null,
    });

    setSelectedOrganization({
      ...selectedOrganization,
      organization_id: null,
      name: "",
    });
  };

  useEffect(() => {
    if (isOpen) {
      resetFormModal();
    }

    if (isEditMode && rowData) {
      setFormData((prev) => ({
        ...prev,
        name: rowData?.name,
        organization_id: rowData?.organization.organization_id,
        description: rowData?.description,
        prices: rowData?.prices || 0,
        year: rowData?.year,
      }));

      setSelectedOrganization((prev) => ({
        ...prev,
        organization_id: rowData?.organization.organization_id,
        name: rowData?.organization?.name || "",
      }));
    }
  }, [rowData, isEditMode, isOpen]);

  const eventInputChangeHandler = (e: any) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const eventSelectChangeHandler = (value: any) => {
    setFormData((prev) => ({
      ...prev,
      organization_id: value.organization_id,
    }));

    setSelectedOrganization({
      ...selectedOrganization,
      organization_id: value?.organization_id,
      name: value?.name,
    });
  };

  const eventCloseModalHandler = () => {
    resetFormModal();
    closeModal();
  };

  const eventSubmitHandler = async (e: any) => {
    e.preventDefault();

    console.log({formData})
    try {
      let message: string = "";
      if (isEditMode) {
        const response = await updateData({
          id: selectedId,
          data: formData,
        }).unwrap();
        message = response?.message;
      } else {
        const response = await createData(formData).unwrap();
        message = response?.message;
      }

      refetchData?.();
      eventCloseModalHandler();
      onSuccess?.(message);
    } catch (error: any) {
      console.log("Error submit tryout category", error);
      if(error.status === 422) {
        onError?.(error.data.data[0].message)
      }
      else {
        onError?.(error.data.message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => eventCloseModalHandler()}
      className="max-w-[600px] p-6 lg:p-8 rounded-lg shadow-2xl shadow-slate-950 border border-slate-300 bg-white dark:border-slate-950 dark:bg-gray-900"
    >
      <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
        <div>
          <h5 className="font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl mb-4">
            {isEditMode ? "Ubah Kategori Tryout" : "Tambah Kategori Tryout"}
          </h5>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="name"
              className="py-4 text-sm font-medium text-gray-700 w-[150px]"
            >
              Nama
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) => eventInputChangeHandler(e)}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="Masukkan Nama Kategori Tryout...."
            />
          </div>

          {/* Description */}
          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="description"
              className="py-3 text-sm font-medium text-gray-700 w-[150px]"
            >
              Keterangan
            </label>

            <textarea
              id="description"
              name="description"
              className="mt-1 w-full h-32 resize-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              value={formData.description}
              onChange={(e) => eventInputChangeHandler(e)}
              placeholder="Keterangan ..."
            />
          </div>

          {/* Prices */}
          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="prices"
              className="py-3 text-sm font-medium text-gray-700 w-[150px]"
            >
              Prices
            </label>
            <input
              id="prices"
              name="prices"
              type="text"
              value={formData?.prices}
              onChange={(e) => eventInputChangeHandler(e)}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="Masukkan Harga..."
            />
          </div>

          {/* Name */}
          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="name"
              className="py-4 text-sm font-medium text-gray-700 w-[150px]"
            >
              Tahun
            </label>
            <input
              id="year"
              name="year"
              type="text"
              value={formData.year}
              onChange={(e) => eventInputChangeHandler(e)}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="Tahun...."
            />
          </div>

          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="parent_id"
              className="py-3 text-sm font-medium text-gray-700 w-[150px]"
            >
              Organisasi
            </label>
            <OrganizationDropdown
              value={selectedOrganization}
              onChange={eventSelectChangeHandler}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={(e) => eventSubmitHandler(e)}
            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
          >
            {isEditMode
              ? isUpdating
                ? "Menyimpan..."
                : "Ubah"
              : isCreating
              ? "Menyimpan..."
              : "Simpan"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
