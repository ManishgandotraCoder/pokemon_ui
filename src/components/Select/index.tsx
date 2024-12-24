import React from "react";
import { selectType } from "./type";

const Select: React.FC<selectType> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <select
        className="border border-gray-300 rounded p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {/* Options */}
        {options.map((option) => (
          <option key={option.url} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
