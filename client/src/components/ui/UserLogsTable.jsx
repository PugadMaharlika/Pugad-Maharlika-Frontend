import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/Theme";

export const UserLogsTable = ({ setSelected, userlog }) => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div
      className={`flex col-span-8 overflow-hidden rounded-lg shadow-lg  text-xs md:text-md w-64 px-8 sm:w-full py-10 mb-5 ${
        theme === "night" ? "bg-night  text-white " : "bg-fantasy text-black"
      }`}
    >
      <div className="p-6 w-full">
        <div className="flex justify-center ">
          <table className="table-auto w-full mt-8 text-center ">
            <thead>
              <tr>
                <th>Username</th>
                <th>Type</th>
                <th>Origin</th>
                <th>IP Address</th>
                <th>Description</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {userlog &&
                userlog.map((userlog) => (
                  <tr key={userlog.id}>
                    <td className="px-4 py-2">{userlog.acc_username}</td>
                    <td className="px-4 py-2">{userlog.log_type}</td>
                    <td className="px-4 py-2">{userlog.log_origin}</td>
                    <td className="px-4 py-2">{userlog.log_ip_address}</td>
                    <td className="px-4 py-2">{userlog.log_description}</td>
                    <td className="px-4 py-2">{userlog.date_created}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserLogsTable;
