import { PageMeta } from "../../components/common/PageMeta";
import Radio from "../../components/ui/radio/Radio";

const Examination1Page = () => {
  return (
    <>
      <PageMeta title="Halaman Ujian" description="This is about examination 1 page" />
      <div className="min-h-screen flex flex-col py-3 lg:py-10 px-3 lg:px-20 text-lg">
       <section className="w-full flex flex-col xl:flex-row gap-3">
          <div className="w-full flex-shrink bg-white rounded-xl border border-gray-200">
            <div className="px-5 py-5">
              <tr>
                <td>Nama Peserta</td>
                <td className="pl-5 2xl:pl-20 pr-3 pb-2 sm:pb-2">:</td>
                <td>John Doe</td>
              </tr>
              <tr>
                <td>Nomor Peserta</td>
                <td className="pl-5 2xl:pl-20 pr-3 pb-2 sm:pb-2">:</td>
                <td>00000000</td>
              </tr>
              <p className="font-semibold">Tes Wawasan Kebangsaan (TWK)</p>              
            </div>
          </div>

          <div className=" bg-white rounded-xl border border-gray-200">
            <div className="px-4 sm:px-10 py-7 text-base md:text-xl font-semibold flex items-center justify-center md:justify-start space-x-6">
              <div className="flex flex-col space-y-1 items-center">
                <p className="text-lg">Waktu tersisa</p>
                <div className="bg-black text-white py-2.5 px-5 xs:py-4 xs:px-4 flex items-center">
                  <p className="text-xl md:text-3xl font-bold">01:23:30</p>
                </div>
              </div>
              <div className="flex flex-col space-y-1 items-center">
                <p className="text-lg">Ujian selesai?</p>
                <button className="bg-slate-500 hover:opacity-90  text-white py-2.5 px-3 xs:py-4 xs:px-4 flex items-center text-xl md:text-3xl font-bold">
                  Selesai
                </button>
              </div>
            </div>
          </div>
       </section>

       <section className="w-full flex flex-col items-start xl:flex-row gap-3 md:gap-4 mt-3">
          <div className="order-1 md:order-2 w-full md:xl:w-2/4 bg-white rounded-xl border border-gray-200 px-6 md:px-10 py-5">
            <div className="mt flex flex-col items-center">
              <p className="text-lg">Jumlah Soal</p>
              <p className="text-xl md:text-4xl font-semibold">100</p>
            </div>

            <div className="mt-5">
              <div className="flex flex-row space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-500"></div>
                  <span>Terjawab</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-red-500"></div>
                  <span>Belum dijawab</span>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-1 overflow-y-scroll">
                <div className="w-12 h-12 sm:w-15 md:h-15 bg-green-500 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">1</span>
                </div>

                <div className="w-12 h-12 sm:w-15 md:h-15 bg-green-500 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">2</span>
                </div>

                <div className="w-12 h-12 sm:w-15 md:h-15 bg-green-500 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">3</span>
                </div>

                <div className="w-12 h-12 sm:w-15 md:h-15 bg-green-500 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">4</span>
                </div>

                <div className="w-12 h-12 sm:w-15 md:h-15 bg-green-500 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">5</span>
                </div>

                <div className="w-12 h-12 sm:w-15 md:h-15 bg-red-500 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">6</span>
                </div>

                <div className="w-12 h-12 sm:w-15 md:h-15 bg-red-500 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">7</span>
                </div>

                <div className="w-12 h-12 sm:w-15 md:h-15 bg-red-500 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">7</span>
                </div>

                <div className="w-12 h-12 sm:w-15 md:h-15 bg-red-500 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">7</span>
                </div>

                <div className="w-12 h-12 sm:w-15 md:h-15 bg-red-500 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">7</span>
                </div>

                <div className="w-12 h-12 sm:w-15 md:h-15 bg-red-500 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">7</span>
                </div>

                <div className="w-12 h-12 sm:w-15 md:h-15 bg-red-500 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">7</span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-2 md:order-1 w-full bg-white rounded-xl border border-gray-200 px-6 sm:px-10 py-7">
              <p className="font-semibold">Soal No. 6</p>
            <div className="w-full border-t border-gray-200 mt-3 py-3">
              <p>Menurut UUD 1945, perekonomian disusun sebagai usaha bersama berdasarkan atas asas:</p>
              <ul className="mt-3 flex flex-col space-y-2">
                <li className="flex items-center">
                  <Radio name="soal6" value="A" label="A. Kebersamaan" />
                </li>
                <li className="flex items-center">
                  <Radio name="soal6" value="B" label="B. Kekeluargaan" />
                </li>
                <li className="flex items-center">
                  <Radio name="soal6" value="C" label="C. Demokrasi Pancasila" />
                </li>
                <li className="flex items-center">
                  <Radio name="soal6" value="D" label="D. Demokrasi ekonomi" />
                </li>
                <li className="flex items-center">
                  <Radio name="soal6" value="E" label="E. Gotong royong" />
                </li>
              </ul>

              <div className="mt-4 flex flex-col md:flex-row justify-between">
                <div className="mt-4 flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-2">
                  <button
                    type="button"
                    className="w-full md:w-fit rounded-lg bg-brand-700 p-2.5 md:py-3 md:px-3 text-sm md:text-base font-medium text-white hover:bg-brand-600"
                  >
                    SIMPAN DAN LANJUTKAN
                  </button>

                  <button
                    type="button"
                    className="w-full md:w-fit rounded-lg bg-brand-700 p-2.5 md:py-3 md:px-3 text-sm md:text-base font-medium text-white hover:bg-brand-600"
                  >
                    LEWATKAN SOAL INI
                  </button>
                </div>
              </div>
            </div>
          </div>
       </section>
      </div>
    </>
  );
};

export default Examination1Page;
