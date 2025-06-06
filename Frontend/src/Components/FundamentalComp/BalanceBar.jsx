import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BalanceBar() {
  const [balance, setBalance] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBalance(response.data.balance);
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    };

    fetchBalance();
  }, [trigger, navigate]);

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg mx-4">
      <div>
        <div className="text-gray-700 font-medium">Your Balance</div>
        <div className="mt-1 text-2xl font-semibold text-gray-900">Rs {balance}</div>
      </div>

      <button
        onClick={() => setTrigger((prev) => prev + 1)}
        className="ml-6 flex-shrink-0 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
      >
        Update Balance
      </button>
    </div>
  );
}

export default BalanceBar;
