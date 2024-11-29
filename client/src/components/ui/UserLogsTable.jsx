import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/Theme";

export const UserLogsTable = ({ setSelected, userlog }) => {
  const [theme] = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page

  // Calculate the indices for slicing
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Paginated data
  const paginatedData = userlog ? userlog.slice(startIndex, endIndex) : [];

  // Calculate total pages
  const totalPages = userlog ? Math.ceil(userlog.length / rowsPerPage) : 0;

  useEffect(() => {
    setCurrentPage(1);
  }, [userlog]);

  // Handlers for pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

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
              {paginatedData &&
                paginatedData.map((userlog) => (
                  <tr key={userlog.id}>
                    <td className="px-4 py-2">{userlog.acc_username}</td>
                    <td className="px-4 py-2">{userlog.log_type}</td>
                    <td className="px-4 py-2">{userlog.log_origin}</td>
                    <td className="px-4 py-2">
                      {userlog.log_ip_address.split(",")[0].trim()}
                    </td>
                    <td className="px-4 py-2">{userlog.log_description}</td>
                    <td className="px-4 py-2">
                      {new Date(userlog.date_created).toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}

        <div className="flex justify-between space-x-4 mt-5">
          {/* Table Legend */}
          <div className="flex justify-left">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-700"></div>
                <span className="text-xs">Disabled</span>
              </div>
            </div>
          </div>
          <span className="px-4 py-2 ">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-3">
            <button
              onClick={handlePrevPage}
              className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-500 text-white" : "bg-blue-900 text-white"}`}
              disabled={currentPage === 1}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              onClick={handleNextPage}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-500 text-white"
                  : "bg-blue-900 text-white"
              }`}
              disabled={currentPage === totalPages}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogsTable;
