import axios from "axios";
import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SendMoney() {
    const location = useLocation();
    const { user } = location.state;

    const navigate = useNavigate();
    const amountRef = useRef(null);

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");

        const amount = amountRef.current?.value;
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                    amount: amount,
                    to: user._id,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert("Transfer Successful!");
            } else {
                alert("Transfer Failed!");
            }
        } catch (error) {
            console.error("Transfer error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setTimeout(() => {
                navigate("/dashboard");
            }, 500);
        }
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center text-gray-900">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{user.firstName[0]}</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800">{user.firstName}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium text-gray-700 leading-none"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="amount"
                                    placeholder="Enter amount"
                                    ref={amountRef}
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-300"
                            >
                                Initiate Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SendMoney;
