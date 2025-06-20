/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal } from "../../components/ui/modal";
import type { I_RoleInput } from "../../interfaces/roleInterface";
import {
  useCreateRoleMutation,
  useFindRoleByIdQuery,
  useUpdateRoleMutation,
} from "../../services/roleApi";
import { toast } from "react-toastify";
import type { I_ModalProps } from "../../interfaces/appInterface";
import {
  useCreateDataMutation,
  useFindDataByIdQuery,
  useUpdateDataMutation,
} from "../../services/organizationApi";

export function OrganizationModal({
  isOpen,
  closeModal,
  isEditMode = false,
  selectedId = null,
  refetchData,
  onSuccess,
  onError,
}: I_ModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const { data: rowData } = useFindDataByIdQuery(selectedId!, {
    skip: !isEditMode || !selectedId,
  });

  const [createData, { isLoading: isCreating }] =
    useCreateDataMutation();
  const [updateData, { isLoading: isUpdating }] =
    useUpdateDataMutation();

  const resetModalForm = () => {
    setFormData({
      ...formData,
      name: "",
      description: "",
    });
  };

  useEffect(() => {
    if (isOpen) {
      resetModalForm();
    }

    if (isEditMode && rowData) {
      setFormData((prev) => ({
        ...prev,
        name: rowData?.name,
        description: rowData?.description,
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

  const eventCloseModalHandler = () => {
    resetModalForm();
    closeModal();
  };

  const eventSubmitHandler = async (e: any) => {
    e.preventDefault();
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
      console.log("Error submit organization", error);
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
            {isEditMode ? "Ubah Organisasi" : "Tambah Organisasi"}
          </h5>
        </div>

        <div className="space-y-4">
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
              placeholder="Masukkan Nama Organisasi...."
            />
          </div>

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
        </div>
        <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
          <button
            type="button"
            onClick={() => eventCloseModalHandler()}
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
