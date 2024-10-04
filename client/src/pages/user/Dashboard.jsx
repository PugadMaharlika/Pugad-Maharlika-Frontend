import React, { useEffect, useState } from "react";
import DBCard from "../../components/ui/DBCard";
import useAuthCheck from "../../hooks/useAuthCheck";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function Dashboard({ theme }) {
  useAuthCheck();
  return (
    <div className="w-full h-full flex ">
      <DBCard />
    </div>
  );
}

export default Dashboard;
