/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal } from "../../components/ui/modal";
import type { I_UserInput } from "../../interfaces/userInterface";
import {
  useCreateUserMutation,
  useFindUserByIdQuery,
  useUpdateUserMutation,
} from "../../services/userApi";
import {toast } from "react-toastify";

interface I_UserModal {
  isOpen: boolean;
  closeModal: () => void;
  isEditMode?: boolean;
  selectedUserId?: string | null;
  refetchTable?: () => void;
  onSuccess?: (message: string) => void; 
}

export function UserModal({
  isOpen,
  closeModal,
  isEditMode = false,
  selectedUserId = null,
  refetchTable,
  onSuccess
}: I_UserModal) {
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [phone, setPhone] = useState("");

  const {
    data: userData,
  } = useFindUserByIdQuery(selectedUserId!, {
    skip: !isEditMode || !selectedUserId,
  });

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (isEditMode && userData) {
      setNameUser(userData.name || "");
      setEmail(userData.email || "");
      setPhoto(userData.photo || "");
      setPhone(userData.phone || "");
    } else if (!isOpen) {
      setNameUser("");
      setEmail("");
      setPhoto("");
      setPhone("");
    }
  }, [userData, isEditMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const payload: I_UserInput = { name: nameUser, email: email, file: "photo", phone: phone, password: "password", role_id: "2554aa84-1a9f-4a09-8112-56b84b075e28"};

    try {
      let message: string = '';
      if (isEditMode && selectedUserId) {
        const response = await updateUser({ user_id: selectedUserId, data: payload }).unwrap();
        console.log({RESPONSE: response})
        message = response?.message
      } else {
        const response = await createUser(payload).unwrap();
        message = response?.message;
      }

      refetchTable?.(); // optional: untuk refresh tabel
      closeModal(); // tutup modal setelah sukses
      setNameUser(""); // reset form
      // Biarkan parent menampilkan toast
      onSuccess?.(message); 
    } catch (error: any) {
      console.error("Error submitting user:", error);
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
              htmlFor="nameUser"
              className="block text-sm font-medium text-gray-700"
            >
              Nama User
            </label>
            <input
              id="nameUser"
              type="text"
              value={nameUser}
              onChange={(e) => setNameUser(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="Masukkan nama user"
            />
          </div>

          <div className="mt-8 mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="Masukkan email user"
            />
          </div>

          <div className="mt-8 mb-4">
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700"
            >
              Photo
            </label>
            <input
              id="photo"
              type="file"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="Masukkan photo user"
            />
          </div>

          <div className="mt-8 mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="Masukkan nomor telpon/hp user"
            />
          </div>

          <div className="mt-8 mb-4">
            <label
              htmlFor="role_id"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select name="role_id" id="role_id" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary">
              <option value="" selected>Select Role</option>
            </select>
          
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
