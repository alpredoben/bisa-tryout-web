/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { Combobox } from "@headlessui/react";
import type { I_PackageDropdownProps } from "../../interfaces/tryoutInterface";
import { useEffect, useState } from "react";
import { useFetchDataQuery } from "../../services/tryoutPackageApi";

export const PackageDropdown: React.FC<I_PackageDropdownProps> = ({
  value,
  onChange,
}) => {
  const [query, setQuery] = useState("");
  const { data, isLoading, isError, refetch } = useFetchDataQuery({
    page: 1,
    limit: 100,
    search: query || undefined,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch();
    }, 300);
    return () => clearTimeout(timeout);
  }, [query, refetch]);

  const records = data?.records || [];

  return (
    <Combobox value={value} onChange={(v: any) => onChange(v)}>
      <div className="relative">
        <Combobox.Input
          aria-label="Assignee"
          className="px-3 py-2 border border-gray-300 rounded text-sm w-full focus:outline-noneshadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          displayValue={(item: any) => item?.name || ""}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Pilih Paket Tryout..."
        />
        <Combobox.Options className="absolute z-10 w-full mt-0 bg-white border border-gray-200 rounded-md max-h-60 overflow-auto shadow-lg" >
          {isLoading && (
            <div className="px-4 py-2 text-sm text-gray-500">Memuat...</div>
          )}
          {isError && (
            <div className="px-4 py-2 text-sm text-red-500">
              Gagal memuat data
            </div>
          )}
          {!isLoading && !isError && records.length === 0 && (
            <div className="px-4 py-2 text-sm text-gray-500">
              Tidak ditemukan
            </div>
          )}
          {!isLoading &&
            records.map((item: any) => {
              return (
                <Combobox.Option
                  key={item.package_id}
                  value={{
                    package_id: item.package_id,
                    name: `${item?.package_name}/${item?.category_name}/${item?.stage_name}`
                  }}
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2 text-sm ${
                      active ? "bg-blue-100 text-blue-900" : "text-slate-700"
                    }`
                  }
                >
                  {`${item?.package_name}/${item?.category_name}/${item?.stage_name}`}
                </Combobox.Option>
              )
            })}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};