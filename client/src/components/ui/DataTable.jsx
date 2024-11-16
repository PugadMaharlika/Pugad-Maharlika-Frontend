import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/Theme";

const DataTable = ({ accvalues, selectedCallback }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [theme] = useContext(ThemeContext);

  // Theme-based styles
  const textColor = theme === "night" ? "text-white" : "text-black";
  const bgColor = theme === "night" ? "bg-night" : "bg-fantasy";
  const headerColor = theme === "night" ? "bg-transparent" : "bg-transparent"; // Remove gray background

  return (
    <div
      className={`flex col-span-8 overflow-hidden rounded-lg shadow-lg text-xs md:text-md w-64 px-8 sm:w-full py-10 mb-5 ${bgColor} ${textColor}`}
    >
      <div className="p-6 w-full">
        {/* Search Input */}
        <div className="w-full sm:w-full p-1 py-1 px-7 mb-4 sm:mb-0">
          <div className="flex items-center border rounded-md w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 w-full rounded-l-md outline-none"
            />
            {/* Search Icon on the right */}
            <i className="fa-solid fa-magnifying-glass p-2"></i>
          </div>
        </div>

        {/* Table */}
        <div className="flex justify-center">
          <table className="table-auto w-full mt-8 text-center">
            <thead>
              <tr className={`${headerColor}`}>
                <th className="px-4 py-2">Action</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Date Created</th>
              </tr>
            </thead>
            <tbody>
              {accvalues.length > 0 ? (
                accvalues.map((item) => (
                  <tr
                    key={item.id}
                    className={item.acc_enabled === false ? "bg-red-700 text-white" : ""}
                  >
                    <td className="px-4 py-2">
                      <button
                        onClick={() => selectedCallback(item)}
                        className="hover:text-blue-700 font-bold py-2 px-4 rounded"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                    </td>
                    <td className="px-4 py-2">{item.acc_username}</td>
                    <td className="px-4 py-2">{item.acc_email}</td>
                    <td className="px-4 py-2">{item.date_created}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
