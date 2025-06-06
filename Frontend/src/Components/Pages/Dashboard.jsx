import React from "react";
import AppBar from "../FundamentalComp/AppBar";
import BalanceBar from "../FundamentalComp/BalanceBar";
import UserDisplay from "../FundamentalComp/UserDisplay";

function DashBoard() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <AppBar />
      <div className="px-4 py-6">
        <BalanceBar/>
        <UserDisplay />
      </div>
    </div>
  );
}

export default DashBoard;
