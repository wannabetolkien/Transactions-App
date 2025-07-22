import React, { useState, useEffect, useRef } from "react";
import User from "./User";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserDisplay() {
  const [userArray, setUserArray] = useState([{ firstName: 'Nabeel', lastName: 'Akhter', _id: 1 }]);
  const [searchCounter, setSearchCounter] = useState(0);
  const nameRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserArray = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/signin");
          return;
        }
        const filterValue = nameRef.current?.value || "";
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/bulk?filter=${encodeURIComponent(filterValue)}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        setUserArray(response.data.user);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUserArray();
  }, [searchCounter, navigate]);

  return (
    <div className="ml-4">
      <div className="font-bold mt-6 text-lg text-gray-800">Users</div>

      <div className="flex my-2">
        <input
          ref={nameRef}
          type="text"
          placeholder="Search User"
          className="w-full px-4 py-3 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />

        <button
          onClick={() => setSearchCounter((prev) => prev + 1)}
          className="bg-blue-600 rounded-lg px-6 py-3 ml-3 text-white font-semibold hover:bg-blue-800 transition duration-200 shadow"
        >
          Search
        </button>
      </div>

      <div>
        {userArray.length === 0 ? (
          <div className="text-gray-500 mt-4">No users found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
            {userArray.map((individualUser) => (
              <div
                key={individualUser._id}
                className="w-full h-64 bg-white border border-slate-200 rounded-xl shadow-lg flex flex-col items-center justify-center p-4 transition-transform hover:scale-105"
              >
                <User user={individualUser} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDisplay;
