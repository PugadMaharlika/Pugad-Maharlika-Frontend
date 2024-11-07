import React from "react";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState, useEffect } from "react";
import TransactionTable from "../../components/ui/TransactionTable";
import { AlertsContext } from "../../context/Alerts";
import { SuccessContext } from "../../context/Success";
import axios from "axios";

export const Transactions = ({ setSelected }) => {
  const [theme] = useContext(ThemeContext);
  const [transactions, setTransactions] = useState([]);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setErrors([]);
        setSuccess(false);

        await axios
          .get(`${serverUrl}/transaction/view`, {
            headers: {
              "x-auth-token": authToken,
              "x-refresh-token": refreshToken,
            },
          })
          .then((response) => {
            console.log(response);
            setTransactions(response.data.transactions);
            setSuccess(true);
          });
      } catch (error) {
        console.error(error);
        setSuccess(false);
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors.map((err) => err.msg));
        } else {
          setErrors(["An unexpected error occurred."]);
        }
      }
    };

    fetchTransactions();

    return () => {
      setTransactions([]);
    };
  }, []);

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
        <TransactionTable
          transactions={transactions}
          setSelected={setSelected}
        />
      </div>
    </>
  );
};

export default Transactions;
