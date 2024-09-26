import React, { useState } from "react";

const DataTable = ({ accvalues, setSelected }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Filter accvalues based on the search term
  const filteredData = accvalues.filter((row) => {
    const { username, email, date, status } = row;
    const dateMonthYear = new Date(date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    return (
      username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dateMonthYear.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="overflow-x-auto w-full p-6 bg-white">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <table className="min-w-full table-auto">
        <thead className="bg-white">
          <tr>
            <th className="px-4 py-2 text-center">Action</th>
            <th className="px-4 py-2 text-center">Username</th>
            <th className="px-4 py-2 text-center">Email</th>
            <th className="px-4 py-2 text-center">Date Created</th>
            <th className="px-4 py-2 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
            .map((row) => (
              <tr key={row.id} className="border-t">
                <td className="px-4 py-2 text-center">
                  <button 
                    onClick={() => setSelected("AdminAccount", row)} // Pass selected row to AdminAccount
                    className="account-info text-blue-500"
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                </td>
                <td className="px-4 py-2 text-center">{row.username}</td>
                <td className="px-4 py-2 text-center">{row.email}</td>
                <td className="px-4 py-2 text-center">{row.date}</td>
                <td className="px-4 py-2 text-center">
                  {row.status === "Active" ? (
                    <span className="text-green-500">{row.status}</span>
                  ) : (
                    <span className="text-red-500">{row.status}</span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`text-blue-500 px-4 py-2 ${currentPage === 1 && "opacity-50"}`}
        >
          Previous
        </button>

        <div className="text-gray-600">
          Page {currentPage} of {totalPages}
        </div>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`text-blue-500 px-4 py-2 ${currentPage === totalPages && "opacity-50"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;