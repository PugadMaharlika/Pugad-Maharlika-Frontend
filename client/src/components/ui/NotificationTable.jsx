import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/Theme";

const NotificationTable = ({ setSelected, notifications, setNotificationselected }) => {
  const [theme, setTheme] = useContext(ThemeContext);

  const handleviewnotification = (note_id) => {
    setSelected("ViewNotification");
    setNotificationselected(note_id);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page

  // Calculate the indices for slicing
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Paginated data
  const paginatedData = notifications.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(notifications.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [notifications]);

  // Handlers for pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-center ">
        <div className="w-full max-h-80 overflow-y-auto">
          <table className="table-auto w-full mt-8 text-center  ">
            <thead>
              <tr>
                <th>Action</th>
                <th>Title</th>
                <th>Type</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData &&
                paginatedData.map((notification) => (
                  <tr key={notification.ntf_id}>
                    <td className="px-4 py-2 justify-center">
                      <button
                        id="btn_Notification_action"
                        onClick={() => {
                          handleviewnotification(notification.note_id);
                        }}
                        className="hover:text-blue-700  font-bold py-2 px-4 rounded"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                    </td>
                    <td className="px-4 py-2">{notification.note_title}</td>
                    <td className="px-4 py-2">
                      {notification.note_type == "G" ? "Global" : "Player"}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(notification.note_date_created).toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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
export default NotificationTable;
