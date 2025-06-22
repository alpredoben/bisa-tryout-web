import { useLocation } from "react-router-dom";
import { BreadCrumb } from "../../components/common/BreadCrumb";
import { PageMeta } from "../../components/common/PageMeta";
import { useFindDataByIdQuery } from "../../services/tryoutDetailApi";
import {
  formatCurrency,
  getListModeAnswer,
  getListModeLayout,
} from "../../utils/helpers";

const TryoutDetailView = () => {
  const location = useLocation();
  const { detailId } = location.state || {};

  const { data: rowData } = useFindDataByIdQuery(detailId!, {
    skip: !detailId,
  });

  console.log({rowData})

  if (!rowData) return null;



  return (
    <>
      <PageMeta
        title="Master Tryout | Detail Tryout"
        description="This is detail information of tryout detail"
      />
      <BreadCrumb
        pageTitle="DETAIL TRYOUT"
        segment={`View Detail Tryout`}
        activeTitle={`Master Detail Tryout`}
        url={`/tryout-packages`}
      />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          View Detail Tryout
        </h3>

        <div className="space-y-6">
          {/* Detail */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6 underline">
                  Detail Tryout
                </h4>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Jumlah Soal
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.total_questions || ""}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Jenis Jawaban
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {getListModeAnswer(
                        rowData.mode_answer
                      )?.name?.toUpperCase()}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Passing Grade
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.passing_grade || ""}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Durasi
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.total_duration
                        ? `${rowData?.total_duration} ${rowData?.satuan_duration}`
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

              {/* Paket */}
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
                      {rowData?.package?.package_name || ""}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Total Seluruh Soal
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.package?.total_questions || 0}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Jenis Layout
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {getListModeLayout(
                        rowData.mode_layout
                      )?.name?.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tipe Tryout */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6 underline">
                  Tipe Tryout
                </h4>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Nama
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.type?.name || ""}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Keterangan
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.statypege?.description || ""}
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
                      {rowData?.package?.category?.name}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Keterangan
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.package?.category?.description}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Tahun
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.package?.category?.year}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Harga
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.package?.category?.prices
                        ? `Rp. ${formatCurrency(
                            rowData?.package?.category?.prices
                          )}`
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      

          {/* Jenis Tes */}
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
                      {rowData?.package?.stage?.name || ""}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Keterangan
                    </p>
                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                      {rowData?.package?.stage?.description || ""}
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

export default TryoutDetailView;
