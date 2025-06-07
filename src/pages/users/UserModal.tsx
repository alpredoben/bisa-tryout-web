/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal } from "../../components/ui/modal";
import type { I_UserInput } from "../../interfaces/userInterface";
import type { I_RoleFormatted } from "../../interfaces/roleInterface";

import {
  useCreateUserMutation,
  useFindUserByIdQuery,
  useUpdateUserMutation,
  useUploadPhotoMutation,
} from "../../services/userApi";
import {toast } from "react-toastify";

interface I_UserModal {
  isOpen: boolean;
  closeModal: () => void;
  isEditMode?: boolean;
  selectedUserId?: string | null;
  refetchTable?: () => void;
  onSuccess?: (message: string) => void; 
  roles: I_RoleFormatted[]; 
}

export function UserModal({
  isOpen,
  closeModal,
  isEditMode = false,
  selectedUserId = null,
  refetchTable,
  onSuccess,
  roles
}: I_UserModal) {
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState("");

  const {
    data: userData,
  } = useFindUserByIdQuery(selectedUserId!, {
    skip: !isEditMode || !selectedUserId,
  });

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [fileId, setFileId] = useState<string>("");
  const [uploadPhoto, { isLoading: isUploading }] = useUploadPhotoMutation();

  const handleUploadPhoto = async (file: File) => {
    try {
      const response= await uploadPhoto(file).unwrap();
      console.log(response);
      setFileUrl(response.file_url);
      setFileName(response.file_name);
      setFileId(response.file_id);
      toast.success("Foto berhasil di-upload!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Gagal mengunggah foto");
    }
  };

  useEffect(() => {
    if (isEditMode && userData) {
      setNameUser(userData.name || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
      setSelectedRoleId(userData.role.role_id || "");
      setFileUrl(userData.photo?.file_url || "");
      setFileId(userData.photo?.file_id || "");
    } else if (!isOpen) {
      setNameUser("");
      setEmail("");
      setPhone("");
      setSelectedRoleId(""); 
      setFileUrl("");
      setFileId("");
    }
  }, [userData, isEditMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const payload: I_UserInput = { name: nameUser, email: email, file_id: fileId, phone: phone, password: "password", role_id: selectedRoleId};

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
              // value={photoFile}
              // onChange={(e) => {
              //   const file = e.target.files?.[0] || null;
              //   setPhotoFile(file);
              // }}
              onChange={(e) => {
                const file = e.target.files?.[0] || undefined;
                if (file) {
                  handleUploadPhoto(file);
                }
              }}
              // onChange={(e) => setPhoto(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="Masukkan photo user"
            />
            {
              isUploading ? "Uploading..." : ""
            }
            {fileUrl && (
              <img
                src={fileUrl}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mt-2"
              />
            )}
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
            <select
              name="role_id"
              id="role_id"
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Pilih Role</option>
              {roles.map((role: I_RoleFormatted) => (
                <option key={role.role_id} value={role.role_id}>
                  {role.role_name}
                </option>
              ))}
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
