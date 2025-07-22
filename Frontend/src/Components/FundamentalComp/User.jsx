import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md mb-4 w-56">
      <div className="rounded-full h-16 w-16 bg-slate-200 flex justify-center items-center mb-3">
        <div className="flex justify-center items-center h-full text-2xl font-semibold text-gray-700">
          {user.firstName[0]}
        </div>
      </div>
      <div className="text-lg font-medium text-gray-800 mb-2 text-center w-full whitespace-nowrap overflow-hidden text-ellipsis">
        {user.firstName} {user.lastName}
      </div>
      <Button
        label="Send Money"
        onClick={() => {
          navigate(`/send/`, { state: { user } });
        }}
      />
    </div>
  );
}

export default User;
