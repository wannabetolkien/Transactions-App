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
          className="w-full px-3 py-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() => setSearchCounter((prev) => prev + 1)}
          className="bg-slate-300 rounded-sm px-4 py-2 ml-2 hover:bg-gray-900 hover:text-white transition duration-200"
        >
          Search
        </button>
      </div>

      <div>
        {userArray.map((individualUser) => (
          <User user={individualUser} key={individualUser._id} />
        ))}
      </div>
    </div>
  );
}

export default UserDisplay;
