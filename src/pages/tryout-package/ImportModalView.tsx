/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Modal } from "../../components/ui/modal";
import { useImportFileMutation } from "../../services/packageTryoutApi";

interface I_ImportProps {
  isOpen: boolean;
  closeModal: () => void;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export function ImportModalView({
  isOpen,
  closeModal,
  onSuccess,
  onError,
}: I_ImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [importFile] = useImportFileMutation()
  const eventCloseModalHandler = () => {
    closeModal();
  };

  const eventSubmitHandler = async(e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    if(file) {
      try {
        const response = await importFile(file as File).unwrap();
        onSuccess?.(response.message);
        eventCloseModalHandler()
      } catch (error: any) {
        console.log({error})
        onError?.(error?.data?.message ?? "Upload file gagal");
      }
    }
    else {
      onError?.('Tidak ada file yang dipilih')
    }
    
  }

  const eventFileUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => eventCloseModalHandler()}
      className="max-w-[600px] p-6 lg:p-8 rounded-lg shadow-2xl shadow-slate-950 border border-slate-300 bg-white dark:border-slate-950 dark:bg-gray-900"
    >
      <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
        <div>
          <h5 className="font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl mb-4">
          Import Paket Tryout
          </h5>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-[auto,1fr] gap-4 mb-4">
            <label
              htmlFor="name"
              className="py-4 text-sm font-medium text-gray-700 w-[150px]"
            >
              Upload File (.xlsx, .xls)
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept=".xlsx, .xls"
              onChange={eventFileUploadHandler}
              className="mt-1 w-full shadow-sm p-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-gray-700 file:bg-gray-100 hover:file:bg-gray-200 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
          <button
            type="button"
            onClick={eventCloseModalHandler}
            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={(e:any) => eventSubmitHandler(e)}
            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
          >Import</button>
        </div>
      </div>
    </Modal>
  );
}
