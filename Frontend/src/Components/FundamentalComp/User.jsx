import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md mb-4">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2">
          <div className="flex justify-center items-center h-full text-xl font-semibold text-gray-700">
            {user.firstName[0]}
          </div>
        </div>
        <div>
          <div className="text-lg font-medium text-gray-800">{user.firstName} {user.lastName}</div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button
          label="Send Money"
          onClick={() => {
            navigate(`/send/`, { state: { user } });
          }}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default User;
