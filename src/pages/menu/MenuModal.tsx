/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Modal } from "../../components/ui/modal";

interface I_MenuModalProps {
  isOpen: boolean;
  closeModal: () => void;
  isEditMode?: boolean;
}

interface I_MenuInput {
  name: string;
  slug: string;
  order_number: number;
  parent_id?: any | null;
  image?: string | null;
  file?: any | null;
}

interface I_FileInput {
  module_name: string;
  file?: string | null;
}

export function MenuModal({
  isOpen,
  closeModal,
  isEditMode = false,
}: I_MenuModalProps) {
  const [formData, setFormData] = useState<I_MenuInput>({
    name: "",
    slug: "",
    order_number: 1,
    parent_id: null,
    file: null,
  });

  const [formFile, setFormFile] = useState<I_FileInput>({
    module_name: "menu",
    file: null,
  });

  const eventOnChangeInput = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFormFile({
        ...formFile,
        file: URL.createObjectURL(file),
      });
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
            {isEditMode ? "Ubah Menu" : "Tambah Menu"}
          </h5>
        </div>

        {/* Frame Image & Upload Button */}
        <div className="flex flex-col  items-center mb-4">
          <div className="w-[120px] h-[120px] border border-gray-300 rounded-md flex items-center justify-center overflow-hidden">
            {formFile.file ? (
              <img
                src={formFile.file}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-sm">No Image</span>
            )}
          </div>
          <label className="mt-2 text-sm text-gray-600">
            Format: .jpg, .png, .jpeg
          </label>
          <div className="flex justify-center mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block text-sm text-center mx-auto"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="name"
              className="py-4 text-sm font-medium text-gray-700 w-[80px]"
            >
              Nama
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) => eventOnChangeInput(e)}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="Masukkan Nama Menu"
            />
          </div>

          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="slug"
              className="py-3 text-sm font-medium text-gray-700 w-[80px]"
            >
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              value={formData.slug}
              onChange={(e) => eventOnChangeInput(e)}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="Masukkan Slug/Path Menu"
            />
          </div>

          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="order_number"
              className="py-3 text-sm font-medium text-gray-700 w-[80px]"
            >
              No. Urut
            </label>
            <input
              id="order_number"
              name="order_number"
              type="number"
              value={Number(formData.order_number)}
              onChange={(e) => eventOnChangeInput(e)}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="Masukkan Slug/Path Menu"
              min={1}
              max={100}
              step={1}
            />
          </div>

          {isEditMode && (
            <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
              <label
                htmlFor="parent_id"
                className="py-3 text-sm font-medium text-gray-700 w-[80px]"
              >
                Parent ID
              </label>
              <input
                id="parent_id"
                name="parent_id"
                type="text"
                value={formData.parent_id}
                onChange={(e) => eventOnChangeInput(e)}
                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              />
            </div>
          )}
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
            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
          >
            {isEditMode ? "Ubah" : "Simpan"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
