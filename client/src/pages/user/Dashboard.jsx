import React, { useEffect, useState } from "react";
import DBCard from "../../components/ui/DBCard";
import useAuthCheck from "../../hooks/useAuthCheck";
import logo from "../../assets/logo1.png";
const serverUrl = process.env.REACT_APP_SERVER_URL;

function Dashboard({ theme }) {
  useAuthCheck();
  return (
    <div className="w-full h-full flex flex-grow gap-5">
      <div className="rounded flex flex-row gap-5 w-full p-5 bg-fantasy shadow-md">
        <img className="flex-1 w-40 object-contain" src={logo} />
        <div className=" flex flex-2 flex-col gap-5 w-full">
          <div className="flex flex-col">
            <label className="text-xs text-gray-500">Username</label>
            <p>SMOOSH3R</p>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500">Email</label>
            <p>pugadmaharlika@gmail.com</p>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500">Perlas</label>
            <p>100,000</p>
          </div>
        </div>
      </div>
      {/* <DBCard /> <DBCard /> <DBCard /> <DBCard /> */}
    </div>
  );
}

export default Dashboard;
