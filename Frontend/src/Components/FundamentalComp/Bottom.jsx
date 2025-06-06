import React from "react";
import { Link } from "react-router-dom";

function Bottom({ label, linkText, to }) {
  return (
    <div className="py-2 text-sm flex justify-center items-center">
      <div className="text-gray-700">{label}</div>
      <Link
        className="text-blue-500 underline pl-1 cursor-pointer hover:text-blue-600 transition duration-200"
        to={to}
      >
        {linkText}
      </Link>
    </div>
  );
}

export default Bottom;
