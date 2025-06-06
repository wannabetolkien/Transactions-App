import React from "react";

function InputBox({ label, placeholder, type, onChange, value }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2 text-gray-700">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="w-full px-4 py-2 border rounded-md border-slate-300 focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
    </div>
  );
}

export default InputBox;
