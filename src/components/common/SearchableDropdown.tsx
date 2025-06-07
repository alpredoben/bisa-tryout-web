interface I_Option {
  id: string | number | null;
  name: string;
}

interface I_SearchableDropdownProps {
  label?: string;
  value: string | number | null;
  onChange: (value: string | number | null) => void;
  options: I_Option[];
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export const SearchableDropdown = ({
  label,
  value,
  onChange,
  options,
  isLoading = false,
  placeholder = "Pilih opsi",
  disabled = false,
}: I_SearchableDropdownProps) => {


  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
          {label}
        </label>
      )}
      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value === "" ? null : e.target.value)
        }
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        disabled={disabled || isLoading}
      >

        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.id ?? "null"} value={opt.id ?? ""}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};
