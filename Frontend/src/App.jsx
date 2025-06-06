import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import SignUp from "./Components/Pages/SignUp";
import SignIn from "./Components/Pages/SignIn";
import DashBoard from "./Components/Pages/Dashboard";
import SendMoney from "./Components/Pages/SendMoney";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/dashboard" element={<DashBoard ownerAccount={{ balance: 10000 }} />} />
                <Route path="/send" element={<SendMoney />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
