import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/Theme";

export const UserLogsTable = ({ setSelected }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const Sampledata = [
    {
      id: 1,
      name: "Johny Bravo",
      type: "Authorized",
      origin: "Offers",
      ipad: "192.168.1.1",
      description: "Add",
      datecreate: "2022-01-01",
    },
    {
      id: 2,
      name: "Johny Maskulado",
      type: "Authorized",
      origin: "Items",
      ipad: "192.168.1.1",
      description: "Add",
      datecreate: "2022-02-15",
    },
    {
      id: 3,
      name: "Johny Brave",
      type: "Unauthorized",
      origin: "Offers",
      ipad: "192.168.1.1",
      description: "Update",
      datecreate: "2022-02-15",
    },
  ];

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
                <th>Name</th>
                <th>Type</th>
                <th>Origin</th>
                <th>IP Address</th>
                <th>Description</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {Sampledata.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.type}</td>
                  <td className="px-4 py-2">{item.origin}</td>
                  <td className="px-4 py-2">{item.ipad}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2">{item.datecreate}</td>
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

export default UserLogsTable;
