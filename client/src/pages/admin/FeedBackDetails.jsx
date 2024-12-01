import React from "react";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState, useEffect } from "react";
import { AlertsContext } from "../../context/Alerts";
import { UserContext } from "../../context/User";
import { SuccessContext } from "../../context/Success";
import axios from "axios";

export const FeedBackDetails = ({ setSelected, selectedFeedback }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [user, setUser] = useContext(UserContext);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [feedback, setFeedbackID] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setErrors([]);
        setSuccess(false);

        await axios
          .get(`${serverUrl}/reports/view/feedbackID?id=${selectedFeedback}`, {
            headers: {
              "x-auth-token": authToken,
              "x-refresh-token": refreshToken,
            },
          })
          .then((response) => {
            console.log(response);
            setFeedbackID(response.data.feedbackDataID);
            setUser(response.data.account);
            setSuccess(true); // Set success only if the request succeeds
          });
      } catch (error) {
        console.error(error);
        setSuccess(false);
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors.map((err) => err.msg));
        } else {
          setErrors(["An unexpected error occurred."]); // Generic fallback
        }
      }
    };

    fetchItems();

    // Optionally return a cleanup function
    return () => {
      setFeedbackID([]); // Example cleanup, adjust as needed
    };
  }, []); // Dependencies to rerun effect only when these values change

  return (
    <div className="col-span-8 overflow-hidden rounded-lg text-xs md:text-md px-8 flex-grow h-full">
      <div
        className={`flex w-full rounded-xl h-16 shadow-md bg-fantasy p-4 pl-4 justify-between py-4 font-bold ${
          theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
        }`}
      >
        <h1 className="text-2xl font-bold">Feedback Details</h1>
        <button
          id="btn_back"
          onClick={() => {
            setSelected("Reports");
          }}
          className="rounded-lg px-4"
        >
          <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 p-6 bg-white rounded-lg shadow-md text-lg mt-5">
        {feedback &&
          feedback.map((feedbacks) => (
            <div key={feedbacks.item_id} className="grid grid-cols-2 gap-4">
              <label className="font-bold">Title:</label>
              <span className="text-left col-span-1">
                {feedbacks.fdbk_title}
              </span>

              <label className="font-bold">Username:</label>
              <span className="text-left col-span-1">
                {feedbacks.acc_username}
              </span>

              <label className="font-bold">Type:</label>
              <span className="text-left col-span-1">
                {feedbacks.fdbk_type}
              </span>

              <label className="font-bold">Date Created:</label>
              <span className="text-left col-span-1">
                {feedbacks.date_created}
              </span>

              <label className="font-bold">Description:</label>
              <span className="text-left col-span-1">
                {feedbacks.fdbk_message}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeedBackDetails;
