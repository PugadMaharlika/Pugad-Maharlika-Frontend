import React from "react";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState, useEffect, useRef } from "react";
import { AlertsContext } from "../../context/Alerts";
import { SuccessContext } from "../../context/Success";
import { UserContext } from "../../context/User";
import API from "../../service/API";

export const Feedbacks = ({ setSelected }) => {
  const [theme] = useContext(ThemeContext);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const [user, setUser] = useContext(UserContext);

  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handleInsertFeedback = async (url) => {
    const config = {
      url: `${serverUrl}/reports/add`,
      method: "POST",
      data: {
        fdbk_type: type,
        fdbk_title: title,
        fdbk_message: description,
      },
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setUser(res.data.account);
      setSuccess(true);
      setErrors(["Feedback uploaded successfully"]);
    }
    if (error) console.log(error);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className={`col-span-8 overflow-hidden rounded-lg`}>
          <div
            className={`flex flex-col sm:flex-row sm:justify-between items-center rounded-xl h-auto sm:h-16 shadow-md p-4 sm:pl-10 font-bold bg-${theme}`}
          >
            <div className="mb-2 sm:mb-0 sm:mr-4">Feedback</div>
          </div>

          <div className="flex flex-col items-center justify-center mt-10">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg mb-4"
                placeholder="Input title"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg mb-4"
              >
                <option value="1" disabled>
                  Feedback Type
                </option>
                <option value="Bugs">Bugs</option>
                <option value="Feedback">Feedback</option>
                <option value="Performance Issue">Performance Issue</option>
                <option value="Audio Issue">Audio Issue</option>
                <option value="Report">Report</option>
                <option value="Others">Others</option>
              </select>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg mb-4"
                rows="4"
                placeholder="Enter your description"
              ></textarea>
              <div className="flex justify-end w-5/6 mx-auto ml-24">
                <button
                  className="bg-green-500 px-6 py-2 text-white rounded-lg"
                  onClick={handleInsertFeedback}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedbacks;
