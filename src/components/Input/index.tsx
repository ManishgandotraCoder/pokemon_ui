import React from "react";
import { InputType } from "./type";

const Input: React.FC<InputType> = ({
  label,
  type = "text", // Default type is text
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
      <input
        type={type}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
