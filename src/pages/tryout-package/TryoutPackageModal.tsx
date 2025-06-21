/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal } from "../../components/ui/modal";
import type { I_ModalProps } from "../../interfaces/appInterface";
import {
  useCreateDataMutation,
  useFindDataByIdQuery,
  useUpdateDataMutation,
} from "../../services/tryoutPackageApi";
import { CategoryDropdown } from "../tryout-category/CategoryDropdown";
import { StageDropdown } from "../tryout-stage/StageDropdown";
import { SearchableDropdown } from "../../components/common/SearchableDropdown";
import { getListModeAnswer } from "../../utils/helpers";

const listModeAnswer = getListModeAnswer()

export function TryoutPackageModal({
  isOpen,
  closeModal,
  isEditMode = false,
  selectedId = null,
  refetchData,
  onSuccess,
  onError,
}: I_ModalProps) {
  const [formData, setFormData] = useState({
    package_name: "",
    category_id: "",
    stage_id: "",
    order_number: 1,
    mode_answer: null,
    total_questions: 0,
  });

  const { data: rowData } = useFindDataByIdQuery(selectedId!, {
    skip: !isEditMode || !selectedId,
  });

  const [selectCategory, setSelectCategory] = useState<{
    category_id: any;
    name: string;
  } | null>(null);

  const [selectStage, setSelectStage] = useState<{
    stage_id: any;
    name: string;
  } | null>(null);

  const [createData, { isLoading: isCreating }] = useCreateDataMutation();
  const [updateData, { isLoading: isUpdating }] = useUpdateDataMutation();

  const resetModalForm = () => {
    setFormData({
      ...formData,
      package_name: "",
      category_id: "",
      stage_id: "",
      order_number: 1,
      total_questions: 0,
    });

    setSelectCategory({
      ...selectCategory,
      category_id: null,
      name: "",
    });

    setSelectStage({
      ...selectStage,
      stage_id: null,
      name: "",
    });
  };

  useEffect(() => {
    if (isOpen) {
      resetModalForm();
    }

    if (isEditMode && rowData) {
      setFormData((prev) => ({
        ...prev,
        category_id: rowData?.category_id,
        stage_id: rowData?.stage_id,
        order_number: rowData?.order_number ? rowData.order_number : 0,
        total_questions: rowData?.total_questions ? rowData.total_questions : 0,
      }));

      setSelectCategory((prev) => ({
        ...prev,
        category_id: rowData?.category?.category_id || null,
        name: rowData?.category?.name || "",
      }));

      setSelectStage((prev) => ({
        ...prev,
        stage_id: rowData?.category?.category_id || null,
        name: rowData?.stage?.name || "",
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
      console.log("Error submit tryout package", error);
      if (error.status === 422) {
        onError?.(error.data.data[0].message);
      } else {
        onError?.(error.data.message);
      }
    }
  };

  const eventSelectCategoryHandler = (value: any) => {
    setFormData((prev) => ({
      ...prev,
      category_id: value.category_id,
    }));

    setSelectCategory({
      ...selectCategory,
      category_id: value?.category_id,
      name: value?.name,
    });
  };

  const eventSelectStageHandler = (value: any) => {
    setFormData((prev) => ({
      ...prev,
      stage_id: value.stage_id,
    }));

    setSelectStage({
      ...selectStage,
      stage_id: value?.stage_id,
      name: value?.name,
    });
  };

  const eventDropdownChangeHandler = (value: any) => {
    setFormData({
      ...formData,
      mode_answer: value,
    });
  };

  if (!isOpen) return null;

  console.log({formData})

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => eventCloseModalHandler()}
      className="max-w-[600px] p-6 lg:p-8 rounded-lg shadow-2xl shadow-slate-950 border border-slate-300 bg-white dark:border-slate-950 dark:bg-gray-900"
    >
      <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
        <div>
          <h5 className="font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl mb-4">
            {isEditMode ? "Ubah Paket Tryout" : "Tambah Paket Tryout"}
          </h5>
        </div>

        <div className="space-y-4">
          {/* Nomor Urut */}
          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="name"
              className="py-4 text-sm font-medium text-gray-700 w-[150px]"
            >
              Nama Paket
            </label>
            <input
              id="package_name"
              name="package_name"
              type="text"
              value={formData.package_name}
              onChange={(e) => eventInputChangeHandler(e)}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm  text-sm h-10 focus:ring-primary focus:border-primary"
              placeholder="Masukkan Nama Paket...."
            />
          </div>


          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="name"
              className="py-4 text-sm font-medium text-gray-700 w-[150px]"
            >
              Kategori Tryout
            </label>

            <CategoryDropdown
              value={selectCategory}
              onChange={eventSelectCategoryHandler}
            />
          </div>

          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="description"
              className="py-3 text-sm font-medium text-gray-700 w-[150px]"
            >
              Jenis Tes
            </label>

            <StageDropdown
              value={selectStage}
              onChange={eventSelectStageHandler}
            />
          </div>

          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="description"
              className="py-3 text-sm font-medium text-gray-700 w-[150px]"
            >
              Jenis Jawaban
            </label>

            <SearchableDropdown
              value={formData.mode_answer}
              onChange={eventDropdownChangeHandler}
              options={listModeAnswer}
              isLoading={false}
              placeholder="Pilih Jenis Jawaban"
            />
          </div>

          {/* Nomor Urut */}
          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="name"
              className="py-4 text-sm font-medium text-gray-700 w-[150px]"
            >
              No. Urut
            </label>
            <input
              id="order_number"
              name="order_number"
              type="number"
              value={formData.order_number}
              onChange={(e) => eventInputChangeHandler(e)}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm  text-sm h-10 focus:ring-primary focus:border-primary"
              placeholder="Masukkan No. Urut...."
            />
          </div>

          {/* Total Soal */}
          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="name"
              className="py-4 text-sm font-medium text-gray-700 w-[150px]"
            >
              Total Soal
            </label>
            <input
              id="total_questions"
              name="total_questions"
              type="number"
              value={formData.total_questions}
              onChange={(e) => eventInputChangeHandler(e)}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Masukkan No. Urut...."
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
