import React from "react";

function Heading({ label }) {
  return (
    <div className="font-bold text-4xl pt-6 text-gray-900">
      {label}
    </div>
  );
}

export default Heading;
