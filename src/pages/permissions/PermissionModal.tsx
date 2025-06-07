/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal } from "../../components/ui/modal";
import type { I_PermissionInput} from "../../interfaces/permissionInterface";
import {
  useCreatePermissionMutation,
  useFindPermissionByIdQuery,
  useUpdatePermissionMutation,
} from "../../services/permissionApi";
import {toast } from "react-toastify";

interface I_PermissionModal {
  isOpen: boolean;
  closeModal: () => void;
  isEditMode?: boolean;
  selectedPermissionId?: string | null;
  refetchTable?: () => void;
  onSuccess?: (message: string) => void; 
}

export function PermissionModal({
  isOpen,
  closeModal,
  isEditMode = false,
  selectedPermissionId = null,
  refetchTable,
  onSuccess
}: I_PermissionModal) {
  const [permissionName, setPermissionName] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const {
    data: permissionData,
  } = useFindPermissionByIdQuery(selectedPermissionId!, {
    skip: !isEditMode || !selectedPermissionId,
  });

  const [createPermission, { isLoading: isCreating }] = useCreatePermissionMutation();
  const [updatePermission, { isLoading: isUpdating }] = useUpdatePermissionMutation();

  useEffect(() => {
    if (isEditMode && permissionData) {
      setPermissionName(permissionData.name || "");
      setOrderNumber(permissionData.order_number || "");
    } else if (!isOpen) {
      setPermissionName("");
      setOrderNumber("");
    }
  }, [permissionData, isEditMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const payload: I_PermissionInput = { name: permissionName, order_number: orderNumber };

    try {
      let message: string = '';
      if (isEditMode && selectedPermissionId) {
        const response = await updatePermission({ permission_id: selectedPermissionId, data: payload }).unwrap();
        message = response?.message
      } else {
        const response = await createPermission(payload).unwrap();
        message = response?.message;
      }

      refetchTable?.(); // optional: untuk refresh tabel
      closeModal(); // tutup modal setelah sukses
      setPermissionName(""); // reset form
      // Biarkan parent menampilkan toast
      onSuccess?.(message); 
    } catch (error: any) {
      console.error("Error submitting permission:", error);
      toast.error(error.data.message);
    }
  };

  return (
    <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[500px] p-6 lg:p-10"
      >
        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              {isEditMode ? "Ubah Permission" : "Tambah Permission"}
            </h5>
          </div>

          <div className="mt-8 mb-4">
            <label
              htmlFor="permissionName"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Permission
            </label>
            <input
              id="permissionName"
              type="text"
              value={permissionName}
              onChange={(e) => setPermissionName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="Masukkan nama permission"
            />
          </div>

          <div className="mt-8 mb-4">
            <label
              htmlFor="orderNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Nomor Urut
            </label>
            <input
              id="orderNumber"
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="Masukkan nomor urut"
            />
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
              onClick={handleSubmit}
              disabled={isCreating || isUpdating}
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
    </div>
  );
}
