import React from "react";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState } from "react";
import { TransactionTable } from "../../components/ui/Table";
import { FeedbackTable } from "../../components/ui/FeedBackTable";
import { UserLogsTable } from "../../components/ui/UserLogsTable";

export const Reports = ({ setSelected }) => {
  const [theme] = useContext(ThemeContext);

  return (
    <>
      <div className="container mx-auto p-4">
        <div
          className={`flex w-full rounded-xl h-16 shadow-md bg-fantasy p-4 pl-4 py-4 font-bold items-center mb-4 ${
            theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
          }`}
        >
          <div className="flex items-center w-full space-x-4">
            <label className="text-2xl">Reports</label>
          </div>
        </div>
        <div className="flex flex-col mb-5">
          <div className="flex items-center w-full space-x-4">
            <label className="text-l font-bold">Select Date:</label>
            <input
              type="date"
              className="border border-gray-300 p-2 rounded-l-lg mr-2"
            />
            <div className="flex-grow"></div>
            <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">
              Generate
            </button>
          </div>
        </div>
        <div>
          <TransactionTable setSelected={setSelected} />
        </div>
        <div>
          <TransactionTable setSelected={setSelected} />
        </div>

        <div
          className={`flex w-72 rounded-xl h-16 shadow-md bg-fantasy p-4 pl-4 py-4 font-bold items-center mb-4 gap-5 ${
            theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
          }`}
        >
          <label>Feedbacks</label>

          <select className="border border-gray-300 p-2 rounded-r-lg">
            <option disabled selected>
              Choose Type
            </option>
            <option>Latest</option>
            <option>Oldest</option>
          </select>
        </div>
        <div>
          <FeedbackTable setSelected={setSelected} />
        </div>

        <div className="flex flex-col mb-10">
          <div className="flex items-center w-full space-x-4 mb-5">
            <label className="text-2xl font-bold">User Logs</label>
          </div>
          <div>
            <UserLogsTable setSelected={setSelected} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
