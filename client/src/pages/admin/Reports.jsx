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
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import logo from "../../assets/logo1.png";
import axios from "axios";

const lineChartData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
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
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
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
  setselectedfeedbackID,
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
  const [currentUser, setCurrentUser] = useState([]);
  const [lineChart, setLineChart] = useState(lineChartData);
  const [lineChartRevenue, setLineChartRevenue] =
    useState(lineChartRevenueData);
  const [totaRevenue, settotalRevenue] = useState([]);
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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
      setErrors([error.response?.data?.errors?.map((error) => error.msg)]);
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
      setErrors([error.response?.data?.errors?.map((error) => error.msg)]);
    }
  };

  const fetchUserLogsDate = async (toDate) => {
    const config = {
      url: `${serverUrl}/reports/search/userlog`,
      method: "POST",
      data: {
        from: fromDate,
        to: toDate,
      },
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
      setErrors([error.response?.data?.errors?.map((error) => error.msg)]);
    }
  };

  const fetchCurrentUser = async () => {
    const config = {
      url: `${serverUrl}/account/view-account`,
      method: "POST",
      data: {
        id: user.id,
      },
    };

    const { res, error } = await API(config);

    if (res) {
      setCurrentUser(res.data.useraccount);
    }

    if (error) {
      console.log(error);
      setErrors([error.response?.data?.errors?.map((error) => error.msg)]);
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
      setErrors([error.response?.data?.errors?.map((error) => error.msg)]);
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
      setErrors([error.response?.data?.errors?.map((error) => error.msg)]);
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
      setErrors([error.response?.data?.errors?.map((error) => error.msg)]);
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
      setErrors([error.response?.data?.errors?.map((error) => error.msg)]);
    }
  };
  // Function to create the Excel file
  async function createExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("User Logs");
    worksheet.columns = [
      { header: "", key: "acc_id", width: 30 },
      { header: "", key: "acc_username", width: 30 },
      { header: "", key: "acc_type", width: 30 },
      { header: "", key: "log_type", width: 30 },
      { header: "", key: "log_origin", width: 30 },
      { header: "", key: "log_ip_address", width: 30 },
      { header: "", key: "log_description", width: 30 },
      { header: "", key: "date_created", width: 30 },
    ];

    const company = worksheet.addRow({
      acc_id: "Company",
      acc_username: "Pugad Maharlika",
      acc_type: "",
      log_type: "",
      log_origin: "USER LOGS",
      log_ip_address: "",
      log_description: "",
      date_created: "",
    });
    const generated = worksheet.addRow({
      acc_id: "Generated By: ",
      acc_username: `${currentUser.acc_fname} ${currentUser.acc_mname} ${currentUser.acc_lname}`,
      acc_type: "",
      log_type: "",
      log_origin: "",
      log_ip_address: "",
      log_description: "",
      date_created: "",
    });
    const created_date = worksheet.addRow({
      acc_id: "Date Printed: ",
      acc_username: `${new Date().toLocaleString()}`,
      acc_type: "",
      log_type: "",
      log_origin: "",
      log_ip_address: "",
      log_description: "",
      date_created: "",
    });

    const headers = worksheet.addRow({
      acc_id: "User ID",
      acc_username: "Username",
      acc_type: "Role",
      log_type: "Type",
      log_origin: "Origin",
      log_ip_address: "IP Address",
      log_description: "Description",
      date_created: "Date Created",
    });

    // Style the header row
    headers.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: "center", vertical: "middle" };
    });
    // Style the header row
    company.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: "center", vertical: "middle" };
    });
    // Style the header row
    generated.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: "center", vertical: "middle" };
    });
    // Style the header row
    created_date.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: "center", vertical: "middle" };
    });
    // Populate table rows (starting at row 5)
    userlog.forEach((log) => {
      worksheet.addRow({
        acc_id: log.acc_id,
        acc_username: log.acc_username,
        acc_type: log.acc_type,
        log_type: log.log_type,
        log_origin: log.log_origin,
        log_ip_address: log.log_ip_address.split(",")[0].trim(),
        log_description: log.log_description,
        date_created: new Date(log.date_created).toLocaleString(),
      });
    });

    // Write buffer and trigger download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "user_logs.xlsx");
    console.log("Excel file created successfully.");
  }

  const handleFromDateChange = (event) => {
    const selectedFromDate = event.target.value;
    setFromDate(selectedFromDate);

    // Automatically validate the 'To' date if it's already filled
    if (toDate && new Date(selectedFromDate) > new Date(toDate)) {
      alert("'From' date cannot be greater than 'To' date!");
      setToDate(""); // Reset 'To' date
    }
  };

  const handleToDateChange = (event) => {
    const selectedToDate = event.target.value;
    setToDate(selectedToDate);

    // Validate that 'To' date is not earlier than 'From' date
    if (fromDate && new Date(fromDate) > new Date(selectedToDate)) {
      alert("'To' date cannot be earlier than 'From' date!");
      setToDate(""); // Reset 'To' date
    } else if (fromDate) {
      // Call a function if both dates are valid and filled
      onBothDatesFilled(selectedToDate);
    }
  };

  const onBothDatesFilled = (toDate) => {
    fetchUserLogsDate(toDate);
  };

  useEffect(() => {
    fetchFeedback();
    fetchUserLogs();
    fetchTopItems();
    fetchTopOffer();
    fetchtotalSales();
    fetchtotalRevenue();
    fetchCurrentUser();

    return () => {
      setFeedback([]);
      setUserLog();
      settopItem();
      settopOffer();
      settotalSales();
      settotalRevenue();
      fetchCurrentUser();
    };
  }, []);

  const handleChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className={`col-span-8 overflow-hidden rounded-lg sm:w-full`}>
          <div
            className={`flex w-full flex-col sm:flex-row justify-between items-center rounded-xl h-16 shadow-md  p-4 pl-10 font-bold bg-${theme}`}
          >
            <div className="mr-4"> REPORTS </div>
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
        <div>
          <div className="flex mb-5 gap-5 justify-center mt-4">
            <div
              className={`place-content-center  rounded-xl p-5 shadow-md flex flex-wrap flex-2 flex-col gap-5 w-full max-w-lg max-h-64 bg-${theme}`}
            >
              <LineChart data={lineChart} title_text={"Yearly Sales"} />
            </div>
            <div
              className={`rounded-xl p-5 shadow-md flex flex-2 flex-col gap-5 w-full max-w-[35rem] xl:max-w-lg max-h-64  bg-${theme}`}
            >
              <LineChart
                data={lineChartRevenue}
                title_text={"Yearly Revenue"}
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
          <FeedbackTable
            setSelected={setSelected}
            feedback={feedback}
            setselectedfeedbackID={setselectedfeedbackID}
          />
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
            onClick={() => {
              createExcel();
            }}
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
              value={fromDate}
              onChange={handleFromDateChange}
            />
            <label className="text-l font-bold">To: </label>
            <input
              type="date"
              className="border border-gray-300 p-2 rounded-lg"
              value={toDate}
              onChange={handleToDateChange}
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
