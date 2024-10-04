import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/Theme";

export const TransactionTable = ({ setSelected }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const Sampledata = [
    {
      id: 1,
      name: "Johny Bravo",
      type: "Global",
      mode: "Gcash",
      dateupdate: "2022-01-01",
    },
    {
      id: 2,
      name: "Johny Maskulado",
      type: "Player",
      mode: "Gcash",
      dateupdate: "2022-02-15",
    },
    {
      id: 3,
      name: "Johny Brave",
      type: "Global",
      mode: "Gcash",
      dateupdate: "2022-03-20",
    },
  ];
  const handleviewnotification = () => {
    setSelected("ViewNotification");
  };

  return (
    <div
      className={`col-span-8 overflow-hidden rounded-lg shadow-lg  text-xs md:text-md w-64 px-8 sm:w-full py-10 ${
        theme === "night" ? "bg-night  text-white " : "bg-fantasy text-black"
      }`}
    >
      <div className="p-6 w-full">
        <div className="flex justify-center ">
          <table className="table-auto w-full mt-8 text-center ">
            <thead>
              <tr>
                <th>Action</th>
                <th>Name</th>
                <th>Type</th>
                <th>Mode</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {Sampledata.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 justify-center">
                    <button
                      id="btn_Notification_action"
                      onClick={() => {
                        setSelected("Receipt");
                      }}
                      className="hover:text-blue-700  font-bold py-2 px-4 rounded"
                    >
                      <i class="fa-solid fa-eye"></i>
                    </button>
                  </td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.type}</td>
                  <td className="px-4 py-2">{item.mode}</td>
                  <td className="px-4 py-2">{item.dateupdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-end mt-5">
          <div className="flex items-center">
            <button className="py-2 px-4 mr-2">&lt;</button>
            <button className="py-2 px-4">1</button>
            <button className="py-2 px-4 ml-2">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TransactionTable;
