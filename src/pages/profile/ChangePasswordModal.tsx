/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal } from "../../components/ui/modal";
import type { I_AuthManualChangePassword } from "../../interfaces/authInterface";
import {
  useManualChangePasswordMutation
} from "../../services/authApi";
import { toast } from "react-toastify";

interface I_ChangePasswordModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedUserId: string;
  onSuccess?: (message: string) => void;
}

export function ChangePasswordModal({
  isOpen,
  closeModal,
  selectedUserId,
  onSuccess,
}: I_ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [changePassword, { isLoading: isUpdating }] = useManualChangePasswordMutation();

  useEffect(() => {
     if (!isOpen) {
      setOldPassword(""); // reset form
      setNewPassword(""); // reset form
      setConfirmPassword(""); // reset form
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const payload: I_AuthManualChangePassword = { old_password: oldPassword, new_password: newPassword, confirm_password: confirmPassword };
    try {
      let message: string = "";
      const response = await changePassword(payload).unwrap();
      message = response?.message;

      closeModal(); // tutup modal setelah sukses
      setOldPassword(""); // reset form
      setNewPassword(""); // reset form
      setConfirmPassword(""); // reset form
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
            Ganti Password
          </h5>
        </div>

        <div className="mt-2 mb-4">
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Password Lama
          </label>
          <input
            id="oldPassword"
            name="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
            placeholder="Masukkan password lama"
          />
        </div>

        <div className="mt-2 mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Password Baru
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
            placeholder="Masukkan password baru"
          />
        </div>

        <div className="mt-2 mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Password Baru
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
            placeholder="Masukkan konfirmasi password baru"
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
            disabled={isUpdating}
            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
          >
            {isUpdating ? "Menyimpan..." : "Ubah"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
