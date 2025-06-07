/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal } from "../../components/ui/modal";
import { toast } from "react-toastify";
import {
  useCreateMenuMutation,
  useFetchMenuQuery,
  useFindMenuByIdQuery,
  useUpdateMenuMutation,
} from "../../services/menuApi";
import { SearchableDropdown } from "../../components/common/SearchableDropdown";
import type {
  I_MenuInput,
  I_MenuModalProps,
} from "../../interfaces/menuInterface";
import {
  useSaveFileMutation,
  useUpdateFileMutation,
} from "../../services/fileApi";

interface I_FileInput {
  module_name: string;
  file?: File | string | null;
  previewUrl?: string | null
}

export function MenuModal({
  isOpen,
  closeModal,
  isEditMode = false,
  selectMenuId,
  selectedParentId,
  refetchData,
  onSuccess,
}: I_MenuModalProps) {
  const { data: menuData } = useFindMenuByIdQuery(selectMenuId!, {
    skip: !isEditMode || !selectMenuId,
  });

  const [formData, setFormData] = useState<I_MenuInput>({
    name: "",
    slug: "",
    order_number: 1,
    parent_id: null,
    file_id: null,
  });

  const [formFile, setFormFile] = useState<I_FileInput>({
    module_name: "menu",
    file: null,
    previewUrl: null
  });

  const [updateMenu, { isLoading: isUpdating }] = useUpdateMenuMutation();
  const [createMenu, { isLoading: isCreating }] = useCreateMenuMutation();
  const [saveFile] = useSaveFileMutation();
  const [updateFile] = useUpdateFileMutation();

  const { data: menuList, isLoading: isLoadingMenuList } = useFetchMenuQuery();
  const parentMenuOptions = [
    { id: null, name: "Tidak ada" },
    ...(menuList?.map((item: any) => ({
      id: item.menu_id,
      name: item.name,
    })) ?? []),
  ];

  const resetModal = () => {
    setFormData({
      ...formData,
      name: "",
      slug: "",
      order_number: 1,
      parent_id: null,
      file_id: null
    })

    setFormFile({
      ...formFile,
      file: null
    })
  }

  useEffect(() => {
    if (formFile.file instanceof File) {
      const objectUrl = URL.createObjectURL(formFile.file);
      setFormFile({...formFile, previewUrl: objectUrl})
      return () => URL.revokeObjectURL(objectUrl); // clean up
    } else if (typeof formFile.file === "string") {
      setFormFile({...formFile, previewUrl: formFile.file})
    }
  }, [formFile.file]);


  useEffect(() => {
    if(isOpen) {
      resetModal();
    }

    if (isEditMode && menuData) {
      setFormData({
        ...formData,
        name: menuData.name,
        slug: menuData.slug,
        order_number: menuData.order_number,
        parent_id: menuData.parent_id,
      });
      if(menuData?.icon?.file_url) {
        setFormFile({...formFile, previewUrl: menuData.icon.file_url})
      }
      
    } else if (selectedParentId != null) {
      setFormData({
        ...formData,
        parent_id: selectedParentId,
      });
    } else if (!isOpen) {
      setFormData({
        ...formData,
        name: "",
        slug: "",
        order_number: 1,
        parent_id: null,
      });
    }
  }, [menuData, isEditMode, isOpen]);

  const eventOnChangeInput = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const eventUploadFileHandler = async (e: any) => {
    e.preventDefault();
    const file: File = e.target.files[0];
  
    if (!file) return;
  
    setFormFile((prev) => ({
      ...prev,
      file,
    }));

  
    let message: string = "";
    try {
      if (!isEditMode) {
        // ✅ Gunakan langsung `file` dari input
        const response = await saveFile(file).unwrap();
        message = response?.message;
  
        setFormData((prev) => ({
          ...prev,
          file_id: response?.data?.file_id,
        }));
      } else {
        const response = await updateFile({
          id: selectMenuId,
          module_name: "menu",
          file, // ✅ Gunakan langsung `file` dari input
        }).unwrap();
        message = response?.message;
      }
  
      onSuccess?.(message);
    } catch (error: any) {
      console.error("Error upload file", error);
      toast.error(error?.data?.message ?? "Upload file gagal");
    }
  };
  

  const eventSubmitHandler = async () => {
    const payload: I_MenuInput | any = formData;

    if (payload?.file_id == null) {
      delete payload?.file_id;
    }

    if (payload?.parent_id == null) {
      delete payload?.parent_id;
    }

    try {
      let message: string = "";
      if (isEditMode) {
        const response = await updateMenu({
          menu_id: selectMenuId,
          data: payload,
        }).unwrap();
        message = response?.message;
      } else {
        const response = await createMenu(payload).unwrap();
        message = response?.message;
      }

      refetchData?.();
      eventCloseModal()
      onSuccess?.(message);
    } catch (error: any) {
      console.error("Error submit - update menu", error);
      toast.error(error.data.message);
    }
  };

  const eventDropdownChangeHandler = (value: string | number | null) => {
    setFormData({
      ...formData,
      parent_id: value,
    });
  };

  const eventCloseModal = () => {
    resetModal();
    closeModal();
  }

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => eventCloseModal()}
      className="max-w-[500px] p-6 lg:p-8 rounded-lg shadow-2xl shadow-slate-950 border border-slate-300 bg-white dark:border-slate-950 dark:bg-gray-900"
    >
      <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
        <div>
          <h5 className="font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl mb-4">
            {isEditMode ? "Ubah Menu" : "Tambah Menu"}
          </h5>
        </div>
filesApi
        {/* Frame Image & Upload Button */}
        <div className="flex flex-col  items-center mb-4">
          <div className="w-[120px] h-[120px] border border-gray-300 rounded-md flex items-center justify-center overflow-hidden">
            {formFile?.previewUrl ? (
              <img
                src={formFile.previewUrl}
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
              onChange={eventUploadFileHandler}
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

          {(formData?.parent_id != null || isEditMode) && (
            <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
              <label
                htmlFor="parent_id"
                className="py-3 text-sm font-medium text-gray-700 w-[80px]"
              >
                Parent ID
              </label>
              <SearchableDropdown
                value={formData.parent_id}
                onChange={eventDropdownChangeHandler}
                options={parentMenuOptions}
                isLoading={isLoadingMenuList}
                placeholder="Pilih Menu"
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
            onClick={eventSubmitHandler}
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
