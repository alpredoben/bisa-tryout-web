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
} from "../../services/tryoutDetailApi";
import { SearchableDropdown } from "../../components/common/SearchableDropdown";
import { getListModeAnswer, getListSatuanDuration } from "../../utils/helpers";
import { PackageDropdown } from "../tryout-package/PackageDropdown";
import { TypeDropdown } from "../tryout-type/TypeDropdown";

const listModeAnswer = getListModeAnswer();
const listSatuanDuration = getListSatuanDuration()

export function TryoutDetailModal({
  isOpen,
  closeModal,
  isEditMode = false,
  selectedId = null,
  refetchData,
  onSuccess,
  onError,
}: I_ModalProps) {
  const [formData, setFormData] = useState({
    package_id: "",
    type_id: "",
    total_questions: 0,
    total_duration: 0,
    satuan_duration: null,
    passing_grade: 0,
    order_number: 0,
    mode_answer: null,
  });

  const { data: rowData } = useFindDataByIdQuery(selectedId!, {
    skip: !isEditMode || !selectedId,
  });

  const [selectType, setSelectType] = useState<{
    type_id: any;
    name: string;
  } | null>(null);

  const [selectPackage, setSelectPackage] = useState<{
    package_id: any;
    name: string;
  } | null>(null);

  const [createData, { isLoading: isCreating }] = useCreateDataMutation();
  const [updateData, { isLoading: isUpdating }] = useUpdateDataMutation();

  const resetModalForm = () => {
    setFormData({
      ...formData,
      type_id: "",
      package_id: "",
      total_questions: 0,
      total_duration: 0,
      satuan_duration: null,
      passing_grade: 0,
      order_number: 0,
      mode_answer: null,
    });

    setSelectType({
      ...selectType,
      type_id: null,
      name: "",
    });

    setSelectPackage({
      ...selectPackage,
      package_id: null,
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
        type_id: rowData?.type.type_id,
        package_id: rowData?.package.package_id,
        total_questions: rowData?.total_questions,
        total_duration: Number(rowData?.total_duration || 0),
        satuan_duration: rowData?.satuan_duration,
        passing_grade: rowData?.passing_grade,
        order_number: rowData?.order_number != null ? rowData.order_number : "",
        mode_answer: rowData?.mode_answer,
      }));

      setSelectType((prev) => ({
        ...prev,
        type_id: rowData?.type?.type_id || null,
        name: rowData?.type?.name || "",
      }));

      setSelectPackage((prev) => ({
        ...prev,
        package_id: rowData?.package?.type_id || null,
        name: rowData?.package?.package_name || "",
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

    const data = formData;
    const orderNumber: any = data.order_number;
    const durationTime: any = data.total_duration;

    if(durationTime == '') {
      data.total_duration = 0;
    }

    if(orderNumber == '') {
      data.order_number = 0;
    }
    
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

  const eventSelectTypeHandler = (value: any) => {
    if(value != null) {
      setFormData((prev) => ({
        ...prev,
        type_id: value.type_id,
      }));
  
      setSelectType({
        ...selectType,
        type_id: value?.type_id,
        name: value?.name,
      });
    }
  };

  const eventSelectPackageHandler = (value: any) => {
    if(value != null) {
      setFormData((prev) => ({
        ...prev,
        package_id: value.package_id,
      }));
      setSelectPackage({
        ...selectPackage,
        package_id: value?.package_id,
        name: value?.name,
      });
    }
  };

  const eventChangeModeAnswerHandler = (value: any) => {
    setFormData({
      ...formData,
      mode_answer: value,
    });
  };


  const eventChangeSatuanDurationHandler = (value: any) => {
    setFormData({
      ...formData,
      satuan_duration: value,
    });
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
            {isEditMode ? "Ubah Detail Tryout" : "Tambah Detail Tryout"}
          </h5>
        </div>

        <div className="space-y-4">
          {/* Nama Paket */}
          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label className="py-4 text-sm font-medium text-gray-700 w-[150px]">
              Nama Paket
            </label>

            <PackageDropdown
              value={selectPackage}
              onChange={eventSelectPackageHandler}
            />
          </div>

          {/* Tipe Tryout */}
          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label className="py-3 text-sm font-medium text-gray-700 w-[150px]">
              Tipe Tryout
            </label>

            <TypeDropdown
              value={selectType}
              onChange={eventSelectTypeHandler}
            />
          </div>

          {/* Passing Grade */}
          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="passing_grade"
              className="py-4 text-sm font-medium text-gray-700 w-[150px]"
            >
              Passing Grade
            </label>
            <input
              id="passing_grade"
              name="passing_grade"
              type="number"
              value={formData.passing_grade}
              onChange={(e) => eventInputChangeHandler(e)}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm  text-sm h-10 focus:ring-primary focus:border-primary"
              placeholder="Masukkan Passing Grade...."
            />
          </div>

          {/* Nomor Urut */}
          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="order_number"
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

          {/* Duration */}
          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="total_duration"
              className="py-4 text-sm font-medium text-gray-700 w-[150px]"
            >
              Durasi Waktu
            </label>
            <input
              id="total_duration"
              name="total_duration"
              type="number"
              value={formData.total_duration}
              onChange={(e) => eventInputChangeHandler(e)}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm  text-sm h-10 focus:ring-primary focus:border-primary"
              placeholder="Masukkan Durasi Waktu...."
            />
          </div>

           {/* Satuan Durasi */}
           <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="description"
              className="py-3 text-sm font-medium text-gray-700 w-[150px]"
            >
              Satuan Waktu
            </label>

            <SearchableDropdown
              value={formData.satuan_duration}
              onChange={eventChangeSatuanDurationHandler}
              options={listSatuanDuration}
              isLoading={false}
              placeholder="Satuan Waktu"
            />
          </div>

          {/* Jenis Jawaban */}
          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="description"
              className="py-3 text-sm font-medium text-gray-700 w-[150px]"
            >
              Jenis Jawaban
            </label>

            <SearchableDropdown
              value={formData.mode_answer}
              onChange={eventChangeModeAnswerHandler}
              options={listModeAnswer}
              isLoading={false}
              placeholder="Jenis Layout"
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
