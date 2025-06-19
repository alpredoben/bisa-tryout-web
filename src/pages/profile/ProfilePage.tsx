import { useEffect, useState } from "react";
import { BreadCrumb } from "../../components/common/BreadCrumb";
import { PageMeta } from "../../components/common/PageMeta";
import { useSelector } from "react-redux";
import type { RootState } from "../../stores/rootReducer";
import { useModal } from "../../hooks/useModal";
import { Slide, toast } from "react-toastify";
import {
  PencilIcon,
  LockIcon
} from "../../assets/icons";
import { ChangePasswordModal } from "./ChangePasswordModal";

const ProfilePage: React.FC = () => {
  useEffect(() => {
    console.log("ProfilePage Mounted");
  }, []);

  const { isOpen, openModal, closeModal } = useModal();
  const [isChangePasswordMode, setIsChangePasswordMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  
  const {user} = useSelector((state: RootState) => state.auth);

  const eventChangePasswordHandler = async (data: any) => {
    setSelectedUserId(data?.user_id);
    setIsChangePasswordMode(true);
    openModal();
  };

  return (
    <>
      <PageMeta
        title="Profile"
        description="This is role page in admin panel"
      />

      <BreadCrumb pageTitle="Profile" />
      <div className="space-y-6">
          <div className="px-6 py-5 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                Profile
              </h3>
              <div className="flex space-x-1">
                <button
                    className="py-2 px-4 flex flex-row space-x-2 items-center justify-center text-gray-700 transition-colors bg-white border border-gray-200 rounded-3xl hover:text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                  >
                    <PencilIcon />
                    <span>Edit Profile</span> 
                </button>

                <button
                    onClick={() => eventChangePasswordHandler(user)}
                    className="py-2 px-4 flex flex-row space-x-2 items-center justify-center text-gray-700 transition-colors bg-white border border-gray-200 rounded-3xl hover:text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                  >
                    <LockIcon />
                    <span>Ganti Password</span> 
                </button>

              </div>
            </div>
            <div className="mt-5 p-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="flex space-x-5 items-center">
                <img src={user?.photo?.file_url ? user.photo.file_url : 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109'} alt="User" className="rounded-full h-15 w-15" />
                <div className="flex flex-col">
                  <span className="text-lg font-semibold bg-white dark:border-gray-800">{user?.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-500">{user?.role.role_name}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 p-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
              <p className="text-base font-semibold bg-white dark:border-gray-800">Informasi Pribadi</p>

              <div className="mt-5 flex space-x-10">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-gray-500">Email</span>
                  <span className="text-sm font-semibold text-gray-800">{user?.email}</span>
                </div>

                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-gray-500">Phone</span>
                  <span className="text-sm font-semibold text-gray-800">{user?.phone}</span>
                </div>
              </div>

            </div>
          </div>
      </div>

      {/* Modal Tambah */}
        <ChangePasswordModal
          isOpen={isOpen}
          closeModal={closeModal}
          selectedUserId={selectedUserId}
          onSuccess={(message: string) => {
            toast.success(message, { transition: Slide });
          }}
        />
    </>
  );
};

export default ProfilePage;
