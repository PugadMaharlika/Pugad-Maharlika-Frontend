import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/Theme";

export const FeedbackTable = ({ setSelected, feedback, setselectedfeedbackID }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page

  // Calculate the indices for slicing
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Paginated data
  const paginatedData = feedback ? feedback.slice(startIndex, endIndex) : [];

  // Calculate total pages
  const totalPages = feedback ? Math.ceil(feedback.length / rowsPerPage) : 0;

  useEffect(() => {
    setCurrentPage(1);
  }, [feedback]);

  // Handlers for pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
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
                  <th>Action</th>
                  <th>Username</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData &&
                  paginatedData.map((Fback) => {
                    return (
                      <tr key={Fback.id}>
                        <td className="px-4 py-2 justify-center">
                          <button
                            id="btn_view_feedback"
                            onClick={() => {
                              setSelected("FeedBackDetails");
                              setselectedfeedbackID(Fback.fdbk_id);
                            }}
                            className="hover:text-blue-700  font-bold py-2 px-4 rounded"
                          >
                            <i className="fa-solid fa-eye"></i>
                          </button>
                        </td>
                        <td className="px-4 py-2">{Fback.acc_username}</td>
                        <td className="px-4 py-2">{Fback.fdbk_type}</td>
                        <td className="px-4 py-2">{Fback.fdbk_title}</td>
                        <td className="px-4 py-2">
                          {new Date(Fback.fdbk_date_created).toLocaleString}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
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
                  currentPage === totalPages ? "bg-gray-500 text-white" : "bg-blue-900 text-white"
                }`}
                disabled={currentPage === totalPages}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackTable;
