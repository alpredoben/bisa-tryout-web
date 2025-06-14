/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import type { I_ModalProps } from "../../interfaces/appInterface";
import { FormModalView } from "./FormModalView";
import { ImportModalView } from "./ImportModalView";


export function TryoutPackageModal({
  isOpen,
  closeModal,
  isEditMode = false,
  selectedId = null,
  refetchData,
  onSuccess,
  onError,
  typeName = ''
}: I_ModalProps) {
  if (!isOpen) return null;

  if(typeName === 'import') {
    return <ImportModalView isOpen={isOpen} closeModal={closeModal} key={typeName} />
  } else {
    return <FormModalView isOpen={isOpen} isEditMode={isEditMode} closeModal={closeModal} key={`createAndUpdate`} onError={onError} onSuccess={onSuccess} refetchData={refetchData} selectedId={selectedId} />
  }
}
