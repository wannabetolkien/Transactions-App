import React from "react";
import { useNavigate } from "react-router-dom";

function AppBar() {
    const navigate = useNavigate();
    return (
        <div className="shadow-lg h-14 flex justify-between items-center px-4 bg-gray-800">
            <div className="text-white text-lg font-semibold">Money Transfer App</div>
            <div>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        setTimeout(() => { navigate('/signin') }, 500);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default AppBar;
