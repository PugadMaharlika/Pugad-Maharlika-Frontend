import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/Theme";

export const TransactionTable = ({
  transactions,
  setSelected,
  setTransactionSelected,
}) => {
  const [theme, setTheme] = useContext(ThemeContext);

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
            {transactions.map((transaction) => (
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
                <td className="px-4 py-2">{transaction.date_created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TransactionTable;
