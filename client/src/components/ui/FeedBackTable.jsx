import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/Theme";

export const FeedbackTable = ({
  setSelected,
  feedback,
  setselectedfeedbackID,
}) => {
  const [theme, setTheme] = useContext(ThemeContext);

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
                <th>Action</th>
                <th>Username</th>
                <th>Type</th>
                <th>Title</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {feedback &&
                feedback.map((Fback) => {
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
                      <td className="px-4 py-2">{Fback.date_created}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeedbackTable;
