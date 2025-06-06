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

interface I_RoleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  isEditMode?: boolean;
  selectedRoleId?: string | null;
  refetchTable?: () => void;
  onSuccess?: (message: string) => void;
}

export function RoleModal({
  isOpen,
  closeModal,
  isEditMode = false,
  selectedRoleId = null,
  refetchTable,
  onSuccess,
}: I_RoleModalProps) {
  const [roleName, setRoleName] = useState("");

  const { data: roleData } = useFindRoleByIdQuery(selectedRoleId!, {
    skip: !isEditMode || !selectedRoleId,
  });

  const [createRole, { isLoading: isCreating }] = useCreateRoleMutation();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();

  useEffect(() => {
    if (isEditMode && roleData) {
      setRoleName(roleData.role_name || "");
    } else if (!isOpen) {
      setRoleName("");
    }
  }, [roleData, isEditMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const payload: I_RoleInput = { role_name: roleName };

    try {
      let message: string = "";
      if (isEditMode && selectedRoleId) {
        const response = await updateRole({
          role_id: selectedRoleId,
          data: payload,
        }).unwrap();
        message = response?.message;
      } else {
        const response = await createRole(payload).unwrap();
        message = response?.message;
      }

      refetchTable?.(); // optional: untuk refresh tabel
      closeModal(); // tutup modal setelah sukses
      setRoleName(""); // reset form
      // Biarkan parent menampilkan toast
      onSuccess?.(message);
    } catch (error: any) {
      console.error("Error submitting role:", error);
      toast.error(error.data.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-w-[500px] p-6 lg:p-8 rounded-lg shadow-2xl shadow-slate-950 border border-slate-300 bg-white dark:border-slate-950 dark:bg-gray-900"
    >
      <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
        <div>
          <h5 className="font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl mb-4">
            {isEditMode ? "Ubah Role" : "Tambah Role"}
          </h5>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="roleName"
              className="py-4 text-sm font-medium text-gray-700 w-[80px]"
            >
              Nama
            </label>
            <input
              id="roleName"
              name="roleName"
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="Masukkan Nama Role"
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
  );
}
