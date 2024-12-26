import React from "react";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState, useEffect } from "react";
import TransactionTable from "../../components/ui/TransactionTable";
import { AlertsContext } from "../../context/Alerts";
import { SuccessContext } from "../../context/Success";
import { UserContext } from "../../context/User";
import API from "../../service/API";
import axios from "axios";

export const Transactions = ({ setSelected, setTransactionSelected, transactionSelected }) => {
  const [theme] = useContext(ThemeContext);
  const [transactions, setTransactions] = useState([]);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const [user, setUser] = useContext(UserContext);
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("A");

  useEffect(() => {
    fetchTransactions();

    return () => {
      fetchTransactions();
    };
  }, []);

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
          setTransactions(response.data.transactionData);

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

  const handleSearchTransactionHis = async () => {
    if (search == "") {
      fetchTransactions();
      return;
    }
    setErrors([]);
    setSuccess(false);

    if (!search.trim()) {
      return;
    }

    const config = {
      url: `${serverUrl}/transaction/search?his_id=${search}`,
      method: "GET",
      data: {},
    };

    const { res, error } = await API(config);

    if (res) {
      if (res.data.transactionSearchID) {
        setTransactions([res.data.transactionSearchID]);
      } else {
        setErrors(["ID not found"]);
      }
    }

    if (error) {
      console.log(error);
      setErrors([error.response?.data?.errors?.map((error) => error.msg) || "An error occurred"]);
    }
  };

  useEffect(() => {
    const handleSearchItemOrOffer = async () => {
      setErrors([]);
      setSuccess(false);

      const config = {
        url: `${serverUrl}/transaction/search/itemtype?his_type=${selectedOption}`,
        method: "GET",
      };

      try {
        const { res, error } = await API(config);

        if (res) {
          if (res.data.transactionSearchItemType) {
            setTransactions(res.data.transactionSearchItemType);
          }
        }

        if (error) {
          console.log(error);
          setErrors([error.response?.data?.errors?.map((err) => err.msg) || "An error occurred"]);
        }
      } catch (err) {
        setErrors(["Failed to fetch results"]);
        console.error(err);
      }
    };
    if (selectedOption == "A") {
      fetchTransactions();
      return;
    } else handleSearchItemOrOffer();
  }, [selectedOption]);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <div className={`col-span-8 overflow-hidden rounded-lg sm:w-full`}>
        <div
          className={`flex w-full flex-col sm:flex-row justify-between items-center rounded-xl h-16 shadow-md  p-4 pl-10 font-bold bg-${theme}`}
        >
          TRANSACTIONS
        </div>
        <div
          className={`flex flex-col overflow-hidden rounded-lg shadow-lg  text-xs md:text-md w-64 px-8 mt-4 sm:w-full py-10 mb-5 ${
            theme === "night" ? "bg-night  text-white " : "bg-fantasy text-black"
          }`}
        >
          <div className="flex ">
            <div className="w-full sm:w-full p-1 py-1 px-7 mb-4 sm:mb-0">
              <div className="flex items-center border rounded-md w-full">
                {/* Search Input */}
                <input
                  type="number"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="p-2 w-full rounded-l-md outline-none"
                />
                {/* Search Icon */}
                <button onClick={() => handleSearchTransactionHis()}>
                  <i className="fa-solid fa-magnifying-glass p-2 "></i>
                </button>
              </div>
            </div>
            <select
              className="border border-gray-300 p-2 rounded-r-lg"
              onChange={(e) => handleSelectChange(e)}
            >
              <option default selected value="A">
                All
              </option>
              <option value="I">Item</option>
              <option value="O">Offer</option>
            </select>
          </div>

          <TransactionTable
            transactions={transactions}
            setSelected={setSelected}
            setTransactionSelected={setTransactionSelected}
          />
        </div>
      </div>
    </>
  );
};

export default Transactions;
