import axios from "axios";
import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

function SendMoney() {
    const location = useLocation();
    const { user } = location.state;

    const navigate = useNavigate();
    const amountRef = useRef(null);
    const [notification, setNotification] = React.useState("");
    const [notificationType, setNotificationType] = React.useState(""); // "success" or "error"

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");

        const amount = amountRef.current?.value;
        if (!amount || isNaN(amount) || amount <= 0) {
            setNotification("Please enter a valid amount greater than 0.");
            setNotificationType("error");
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
                setNotification("Transfer Successful!");
                setNotificationType("success");
            } else {
                let message = "Transfer Failed!";
                if (response.data && response.data.message) {
                    message = response.data.message;
                }
                setNotification(message);
                setNotificationType("error");
            }
        } catch (error) {
            console.error("Transfer error:", error);
            let message = "An error occurred. Please try again.";
            if (error.response && error.response.data && error.response.data.message) {
                message = error.response.data.message;
            } else if (error.message) {
                message = error.message;
            }
            setNotification(message);
            setNotificationType("error");
        } finally {
            setTimeout(() => {
                setNotification("");
                setNotificationType("");
                navigate("/dashboard");
            }, 1500);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex flex-col justify-center items-center w-full h-full">
                <div className="border text-card-foreground max-w-2xl p-10 space-y-10 w-[520px] min-h-[600px] bg-white shadow-2xl rounded-2xl flex flex-col justify-center mx-auto">
                    <div className="flex flex-col space-y-2 p-6 items-center">
                        <h2 className="text-4xl font-bold text-center text-gray-900">Send Money</h2>
                    </div>
                    <div className="p-6 flex flex-col gap-8 items-center">
                        {notification && (
                            <Notification $type={notificationType}>{notification}</Notification>
                        )}
                        <div className="flex flex-col items-center gap-4 w-full">
                            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-3xl text-white">{user.firstName[0]}</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 text-center w-full break-words">{user.firstName}</h3>
                        </div>
                        <div className="space-y-4 w-full">
                            <div className="space-y-2 w-full">
                                <label
                                    className="text-base font-medium text-gray-700 leading-none"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    type="number"
                                    className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="amount"
                                    placeholder="Enter amount"
                                    ref={amountRef}
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="justify-center rounded-md text-base font-medium ring-offset-background transition-colors h-12 px-6 py-3 w-full bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-300 mt-2"
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

const Notification = styled.div`
  background: ${props => props.$type === "success" ? "#dcfce7" : "#fee2e2"};
  color: ${props => props.$type === "success" ? "#166534" : "#b91c1c"};
  border: 1px solid ${props => props.$type === "success" ? "#86efac" : "#fca5a5"};
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  margin: 1rem 0 0.5rem 0;
  font-weight: 500;
  font-size: 1rem;
  text-align: left;
`;

export default SendMoney;
