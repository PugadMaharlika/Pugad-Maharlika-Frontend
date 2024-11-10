import React from "react";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState } from "react";
import { TransactionTable } from "../../components/ui/Table";

export const Transactions = ({ setSelected }) => {
  const [theme] = useContext(ThemeContext);

  return (
    <>
      <div className="container mx-auto p-4">
        <div
          className={`flex w-full rounded-xl h-16 shadow-md bg-fantasy p-4 pl-4 py-4 font-bold items-center mb-4 ${
            theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
          }`}
        >
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 p-2 rounded-l-lg mr-2"
          />
          <select className="border border-gray-300 p-2 rounded-r-lg">
            <option disabled selected>
              Choose Type
            </option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
        <TransactionTable setSelected={setSelected} />
      </div>
    </>
  );
};

export default Transactions;
