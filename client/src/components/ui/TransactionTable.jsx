import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/Theme";

export const TransactionTable = ({
  transactions,
  setSelected,
  setTransactionSelected,
}) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page

  // Calculate the indices for slicing
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Paginated data
  const paginatedData = transactions.slice(startIndex, endIndex);

  console.log("Paginated Data: ", paginatedData);
  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [transactions]);

  // Handlers for pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-center overflow-y-auto">
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
            {paginatedData.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-4 py-2 justify-center">
                  <button
                    id="btn_view_receipt"
                    onClick={() => {
                      setSelected("Receipt");
                      setTransactionSelected(transaction.his_id);
                    }}
                    className="hover:text-blue-700  font-bold py-2 px-4 rounded"
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                </td>
                <td className="px-4 py-2">{transaction.acc_username}</td>
                <td className="px-4 py-2">
                  {transaction.his_type === "I"
                    ? "Item"
                    : transaction.his_type === "O"
                      ? "Offer"
                      : ""}
                </td>
                <td className="px-4 py-2">{transaction.his_mode}</td>
                <td className="px-4 py-2">
                  {new Date(transaction.date_created).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}

      <div className="flex justify-between space-x-4 mt-5">
        {/* Table Legend */}
        <div className="flex justify-left"></div>
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
  );
};
export default TransactionTable;
