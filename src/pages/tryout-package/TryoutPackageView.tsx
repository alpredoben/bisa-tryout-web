import { useLocation } from "react-router-dom";
import { BreadCrumb } from "../../components/common/BreadCrumb";
import { PageMeta } from "../../components/common/PageMeta";
import { useFindDataByIdQuery } from "../../services/tryoutPackageApi";
import { formatCurrency, getListModeAnswer } from "../../utils/helpers";

const TryoutPackageView = () => {
  const location = useLocation();
  const { packageId } = location.state || {};

  const { data: rowData } = useFindDataByIdQuery(packageId!, {
    skip: !packageId,
  });
  
  if (!rowData) return null;

  return (
    <>
      <PageMeta
        title="Master Tryout | Paket Tryout"
        description="This is detail information of tryout package"
      />
      <BreadCrumb
        pageTitle="PAKET TRYOUT"
        segment={`Detail Paket`}
        activeTitle={`Master Paket Tryout`}
        url={`/tryout-packages`}
      />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Detail Paket Tryout
        </h3>

        <div className="space-y-6">
          {/* Jenis Tes 2 */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6 underline">
                  Paket
                </h4>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Nama
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.package_name || ""}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Total Soal
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.total_questions || 0}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      No. Urut
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.order_number || 0}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Jenis Jawaban
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                    {getListModeAnswer(rowData.mode_answer)?.name?.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Jenis Tes 2 */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6 underline">
                  Jenis Tes
                </h4>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Nama
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.stage?.name || ""}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Keterangan
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.stage?.description || ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kategori */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6 underline">
                  Kategori
                </h4>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Nama
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.category?.name || ''}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Keterangan
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.category?.description || ''}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Tahun
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.category?.year || ''}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Harga
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.category?.prices === null ? `Rp. 0` : `Rp. ${formatCurrency(rowData?.category?.prices)}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TryoutPackageView;
