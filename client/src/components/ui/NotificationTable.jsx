import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/Theme";

const NotificationTable = ({ setSelected }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const Sampledata = [
    {
      id: 1,
      title: "Game Update 1.1",
      type: "Global",
      datecreated: "2022-01-01",
      dateupdate: "2022-01-01",
    },
    {
      id: 2,
      title: "New Purchase",
      type: "Player",
      datecreated: "2022-02-15",
      dateupdate: "2022-02-15",
    },
    {
      id: 3,
      title: "New Offers ",
      type: "Global",
      datecreated: "2022-03-20",
      dateupdate: "2022-03-20",
    },
  ];
  const handleviewnotification = () => {
    setSelected("ViewNotification");
  };

  return (
    <div className="overflow-hidden rounded-lg items-center justify-center text-xs w-full">
      <div className="p-6 rounded-lg bg-white shadow-lg w-full">
        <div className="mb-4 flex flex-col items-center justify-between">
          <div className="w-full">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded-md w-full"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <table className="table-auto w-full mt-8 text-center">
            <thead>
              <tr>
                <th>Action</th>
                <th>Title</th>
                <th>Type</th>
                <th>Date Created</th>
                <th>Date Updated</th>
              </tr>
            </thead>
            <tbody>
              {Sampledata.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 justify-center">
                    <button
                      id="btn_Notification_action"
                      onClick={() => {
                        handleviewnotification();
                      }}
                      className="hover:text-blue-700  font-bold py-2 px-4 rounded"
                    >
                      <i class="fa-solid fa-eye"></i>
                    </button>
                  </td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.type}</td>
                  <td className="px-4 py-2">{item.datecreated}</td>
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
export default NotificationTable;
