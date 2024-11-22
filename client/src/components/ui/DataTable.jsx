import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/Theme";

const DataTable = ({ accvalues, selectedCallback }) => {
  const [theme] = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page

  // Calculate the indices for slicing
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Paginated data
  const paginatedData = accvalues.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(accvalues.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [accvalues]);

  // Handlers for pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Theme-based styles
  const textColor = theme === "night" ? "text-white" : "text-black";
  const bgColor = theme === "night" ? "bg-night" : "bg-fantasy";
  const headerColor = theme === "night" ? "bg-transparent" : "bg-transparent"; // Remove gray background

  return (
    <div className="p-6 w-full">
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
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
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
                  <td className="px-4 py-2">{new Date(item.date_created).toLocaleString()}</td>
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
              currentPage === totalPages ? "bg-gray-500 text-white" : "bg-blue-900 text-white"
            }`}
            disabled={currentPage === totalPages}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
