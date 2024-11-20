import React from "react";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState, useEffect } from "react";
import { TransactionTable } from "../../components/ui/TransactionTable";
import { FeedbackTable } from "../../components/ui/FeedBackTable";
import { UserLogsTable } from "../../components/ui/UserLogsTable";
import { FeedBackDetails } from "../../pages/admin/FeedBackDetails";
import LineChart from "../../components/ui/LineChart";
import TopItem from "../../components/ui/TopTables";
import { AlertsContext } from "../../context/Alerts";
import { SuccessContext } from "../../context/Success";
import { UserContext } from "../../context/User";
import API from "../../service/API";
import axios from "axios";

const lineChartData = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 2,
      pointBackgroundColor: "rgba(75,192,192,1)",
    },
  ],
};

const lineChartRevenueData = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 2,
      pointBackgroundColor: "rgba(75,192,192,1)",
    },
  ],
};

export const Reports = ({
  setSelected,
  startYear = 2000,
  endYear = new Date().getFullYear(),
}) => {
  const [selectedYear, setSelectedYear] = useState("");
  const [theme] = useContext(ThemeContext);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const [user, setUser] = useContext(UserContext);
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [feedback, setFeedback] = useState([]);
  const [userlog, setUserLog] = useState([]);
  const [topItem, settopItem] = useState([]);
  const [topOffer, settopOffer] = useState([]);
  const [totalSales, settotalSales] = useState([]);
  const [lineChart, setLineChart] = useState(lineChartData);
  const [lineChartRevenue, setLineChartRevenue] =
    useState(lineChartRevenueData);
  const [totaRevenue, settotalRevenue] = useState([]);
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const fetchFeedback = async () => {
    const config = {
      url: `${serverUrl}/reports/view/feedback`,
      method: "GET",
      data: {},
    };

    const { res, error } = await API(config);

    if (res) {
      if (res.data.feedbackData) {
        setFeedback(res.data.feedbackData);
      } else {
        setErrors(["No data found"]);
      }
    }

    if (error) {
      console.log(error);
      setErrors([
        error.response?.data?.errors?.map((error) => error.msg) ||
          "An error occurred",
      ]);
    }
  };

  const fetchUserLogs = async () => {
    const config = {
      url: `${serverUrl}/reports/view/userlog`,
      method: "GET",
      data: {},
    };

    const { res, error } = await API(config);

    if (res) {
      if (res.data.userlogData) {
        setUserLog(res.data.userlogData);
      } else {
        setErrors(["No data found"]);
      }
    }

    if (error) {
      console.log(error);
      setErrors([
        error.response?.data?.errors?.map((error) => error.msg) ||
          "An error occurred",
      ]);
    }
  };

  const fetchTopItems = async () => {
    const config = {
      url: `${serverUrl}/reports/view/topitem`,
      method: "GET",
      data: {},
    };

    const { res, error } = await API(config);

    if (res) {
      if (res.data.topitemData) {
        settopItem(res.data.topitemData);
      } else {
        setErrors(["No data found"]);
      }
    }

    if (error) {
      console.log(error);
      setErrors([
        error.response?.data?.errors?.map((error) => error.msg) ||
          "An error occurred",
      ]);
    }
  };

  const fetchTopOffer = async () => {
    const config = {
      url: `${serverUrl}/reports/view/topoffer`,
      method: "GET",
      data: {},
    };

    const { res, error } = await API(config);

    if (res) {
      if (res.data.topofferData) {
        settopOffer(res.data.topofferData);
      } else {
        setErrors(["No data found"]);
      }
    }

    if (error) {
      console.log(error);
      setErrors([
        error.response?.data?.errors?.map((error) => error.msg) ||
          "An error occurred",
      ]);
    }
  };

  const fetchtotalSales = async () => {
    const config = {
      url: `${serverUrl}/reports/view/totalsales`,
      method: "GET",
      data: {},
    };

    const { res, error } = await API(config);

    if (res) {
      if (res.data.totalsalesData) {
        console.log(res.data.totalsalesData[0].total_sales_array);
        settotalSales([res.data.totalsalesData]);
        lineChartData.datasets[0].data =
          res.data.totalsalesData[0].total_sales_array;
        setLineChart(lineChartData);
      } else {
        setErrors(["No data found"]);
      }
    }

    if (error) {
      console.log(error);
      setErrors([
        error.response?.data?.errors?.map((error) => error.msg) ||
          "An error occurred",
      ]);
    }
  };

  const fetchtotalRevenue = async () => {
    const config = {
      url: `${serverUrl}/reports/view/totalrevenue`,
      method: "GET",
      data: {},
    };

    const { res, error } = await API(config);

    if (res) {
      if (res.data.totalrevenueData) {
        console.log(res.data.totalrevenueData[0].monthly_totals);
        settotalRevenue([res.data.totalrevenueData]);
        lineChartRevenueData.datasets[0].data =
          res.data.totalrevenueData[0].monthly_totals;
        setLineChartRevenue(lineChartRevenueData);
      } else {
        setErrors(["No data found"]);
      }
    }

    if (error) {
      console.log(error);
      setErrors([
        error.response?.data?.errors?.map((error) => error.msg) ||
          "An error occurred",
      ]);
    }
  };

  useEffect(() => {
    fetchFeedback();
    fetchUserLogs();
    fetchTopItems();
    fetchTopOffer();
    fetchtotalSales();
    fetchtotalRevenue();

    return () => {
      setFeedback([]);
      setUserLog();
      settopItem();
      settopOffer();
      settotalSales();
      settotalRevenue();
    };
  }, []);

  const handleChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div
          className={`flex w-full rounded-xl h-16 shadow-md bg-fantasy p-4 pl-4 py-4 font-bold items-center mb-4 bg-${theme}`}
        >
          <div className="flex items-center w-full space-x-4">
            <label className="text-2xl">Reports</label>
            <div className=" border-gray-300 p-2 rounded-lg">
              <select
                value={selectedYear}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border border-gray-300 overflow-y-auto max-h-10"
              >
                <option value="" disabled>
                  Select a year
                </option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-grow"></div>
            <button
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600"
              onClick={() => window.open("/sales-revenue-chart", "_blank")}
            >
              Generate
            </button>
          </div>
        </div>

        <div className="flex mb-5 gap-5 justify-center">
          <div
            className={`place-content-center  rounded-xl p-5 shadow-md flex flex-wrap flex-2 flex-col gap-5 w-full max-w-lg max-h-64 bg-${theme}`}
          >
            <LineChart data={lineChart} title_text={"Total of Sales"} />
          </div>
          <div
            className={`rounded-xl p-5 shadow-md flex flex-2 flex-col gap-5 w-full max-w-[35rem] xl:max-w-lg max-h-64  bg-${theme}`}
          >
            <LineChart
              data={lineChartRevenue}
              title_text={"Total of Revenue"}
            />
          </div>
        </div>

        <div className="flex gap-40 justify-center">
          <div>
            <label className="text-2xl font-bold">Top 5 Items</label>
            <TopItem
              column={{
                column1: "Item",
                column2: "Unit Sold",
                column3: "Date Created",
              }}
              topItem={topItem}
            />
          </div>
          <div>
            <label className="text-2xl font-bold">Top 5 Offers</label>
            <TopItem
              column={{
                column1: "Offer",
                column2: "Unit Sold",
                column3: "Date Created",
              }}
              topItem={topOffer}
            />
          </div>
        </div>

        <div
          className={`flex w-full rounded-xl h-16 shadow-md bg-fantasy p-4 pl-4 py-4 font-bold items-center mb-4 gap-5 ${
            theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
          }`}
        >
          <label className="text-xl font-bold">Feedbacks</label>

          <select className="border border-gray-300 p-2 rounded-r-lg">
            <option disabled selected>
              Choose Type
            </option>
            <option>Latest</option>
            <option>Oldest</option>
          </select>
          <label className="text-l font-bold">From: </label>
          <input
            type="date"
            className="border border-gray-300 p-2 rounded-lg"
          />
          <label className="text-l font-bold">To: </label>
          <input
            type="date"
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div>
          <FeedbackTable setSelected={setSelected} feedback={feedback} />
        </div>

        <div
          className={`flex w-full rounded-xl h-16 shadow-md p-4 font-bold items-center mb-4 ${
            theme === "night" ? "bg-night text-white" : "bg-fantasy text-black"
          }`}
        >
          <label className="text-2xl font-bold">User Logs</label>
          <div className="flex-grow"></div>{" "}
          {/* Added this div to push the button to the right */}
          <button
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600"
            onClick={() => window.open("/user-logs-chart", "_blank")}
          >
            Generate
          </button>
        </div>
        <div className="flex flex-col mb-10">
          <div className="flex items-center space-x-4 mb-4">
            <label className="text-l font-bold">From: </label>
            <input
              type="date"
              className="border border-gray-300 p-2 rounded-lg"
            />
            <label className="text-l font-bold">To: </label>
            <input
              type="date"
              className="border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div>
            <UserLogsTable setSelected={setSelected} userlog={userlog} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
