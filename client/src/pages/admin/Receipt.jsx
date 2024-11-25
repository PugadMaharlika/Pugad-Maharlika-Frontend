import React from "react";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState, useEffect } from "react";
import { AlertsContext } from "../../context/Alerts";
import { SuccessContext } from "../../context/Success";
import API from "../../service/API";

export const Receipt = ({ setSelected, transactionSelected }) => {
  const [theme] = useContext(ThemeContext);
  const [transaction, setTransaction] = useState([]);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const handleViewReceipt = async () => {
      setErrors([]);
      setSuccess(false);
      const config = {
        url: `${serverUrl}/transaction/viewreceipt`,
        method: "POST",
        data: { his_id: transactionSelected },
      };

      const { res, error } = await API(config);
      if (res) {
        setTransaction(res.data.transaction);
        setIsloading(false);
      }
      if (error) console.log(error);
    };
    handleViewReceipt();
  }, []);

  return (
    <>
      <div className="relative bg-white border rounded-lg shadow-lg px-6 py-8 flex-grow min-w-20 mx-auto mt-8">
        {/* Upper left button */}
        <button
          id="btn_back"
          onClick={() => {
            setSelected("Transactions");
          }}
          className="rounded-lg px-1"
        >
          <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>

        <h1 className="font-bold text-2xl my-4 text-center text-blue-600">
          Pugad Maharlika
        </h1>
        <hr className="mb-2" />

        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-bold">Invoice</h1>
          <div className="text-gray-700">
            <div>Date: {transaction && transaction.date_created}</div>
            <div>Invoice #: {transaction && transaction.his_id}</div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Bill To:</h2>
          <div className="text-gray-700 mb-2">
            {transaction && transaction.acc_username}
          </div>
          <div className="text-gray-700">
            {transaction && transaction.acc_email}
          </div>
        </div>

        <table className="w-full mb-8">
          <thead>
            <tr>
              <th className="text-left font-bold text-gray-700">Description</th>
              <th className="text-right font-bold text-gray-700">Amount</th>
            </tr>
          </thead>
          <tr>
            <td className="text-left text-gray-700">
              {transaction.his_type === "O"
                ? transaction.ofr_name
                : transaction.item_name}
            </td>
            <td className="text-right text-gray-700">
              ₱
              {transaction.his_type === "O"
                ? transaction.ofr_price
                : transaction.item_value}
            </td>
          </tr>
          <tfoot>
            <tr>
              <td className="text-left font-bold text-gray-700">Total</td>
              <td className="text-right font-bold text-gray-700">
                ₱
                {transaction.his_type === "O"
                  ? transaction.ofr_price
                  : transaction.item_value}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="text-gray-700 mb-2">Thank you for your business!</div>
        <div className="text-gray-700 text-sm">
          Please remit payment within 30 days.
        </div>
      </div>
    </>
  );
};

export default Receipt;
