import React from "react";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState, useEffect, useRef } from "react";
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

export const Reports = ({
  setSelected,
  setselectedfeedbackID,
  startYear = 2000,
  endYear = new Date().getFullYear(),
}) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
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
  const [lineChart, setLineChart] = useState({
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
  });
  const [lineChartRevenue, setLineChartRevenue] = useState({
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
  });

  const [totaRevenue, settotalRevenue] = useState([]);
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [type, setType] = useState("All");

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
      }
    }

    if (error) {
      console.log(error);
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
      }
    }

    if (error) {
      console.log(error);
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
      }
    }

    if (error) {
      console.log(error);
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
      }
    }

    if (error) {
      console.log(error);
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
      }
    }

    if (error) {
      console.log(error);
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
        settotalSales(res.data.totalsalesData[0].sales_per_month);
        setLineChart((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: res.data.totalsalesData[0].sales_per_month, // New data
            },
          ],
        }));
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
        settotalRevenue(res.data.totalrevenueData[0].monthly_totals);
        setLineChartRevenue((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: res.data.totalrevenueData[0].monthly_totals, // New data
            },
          ],
        }));
      }
    }

    if (error) {
      console.log(error);
      setErrors([error.response?.data?.errors?.map((error) => error.msg)]);
    }
  };

  const fetchtotalSalesSearch = async () => {
    const config = {
      url: `${serverUrl}/reports/view/totalsaleSearch?year=${selectedYear}`,
      method: "GET",
      data: {},
    };

    const { res, error } = await API(config);

    if (res) {
      if (res.data.totsaleSearch) {
        settotalSales(res.data.totsaleSearch);
        setLineChart((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: res.data.totsaleSearch,
            },
          ],
        }));
      }
    }

    if (error) {
      console.log(error);
      setErrors([error.response?.data?.errors?.map((error) => error.msg)]);
    }
  };

  const fetchtotalRevenueSearch = async () => {
    const config = {
      url: `${serverUrl}/reports/view/totalrevenueSearch?year=${selectedYear}`,
      method: "GET",
      data: {},
    };

    const { res, error } = await API(config);

    if (res) {
      if (res.data.totrevenueSearch) {
        console.log(res.data.totrevenueSearch);
        settotalRevenue(res.data.totrevenueSearch);
        setLineChartRevenue((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets,
              data: res.data.totrevenueSearch,
            },
          ],
        }));
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

  // HANDLE Fedback TYPE SEARCH
  useEffect(() => {
    const feedbackSearch = async () => {
      const config = {
        url: `${serverUrl}/reports/view/feedbackType?type=${type}`,
        method: "GET",
        data: {},
      };

      const { res, error } = await API(config);
      if (res) {
        if (res.data.feedbackType) {
          console.log(res.data.feedbackType);
          setFeedback(res.data.feedbackType);
        }
      }
      if (error) {
        console.log(error);
        setErrors(error.response.data.errors.map((error) => error.msg));
      }
    };

    if (type !== "All") {
      feedbackSearch();
    } else {
      fetchFeedback();
    }
  }, [type]);

  useEffect(() => {
    fetchFeedback();
    fetchUserLogs();
    fetchTopItems();
    fetchTopOffer();
    fetchtotalSales();
    fetchtotalRevenue();
    fetchCurrentUser();
    localStorage.setItem("reportYear", JSON.stringify(selectedYear));

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

  useEffect(() => {
    fetchtotalSalesSearch();
    fetchtotalRevenueSearch();
    return () => {
      fetchtotalSalesSearch();
      fetchtotalRevenueSearch();
    };
  }, [selectedYear]);

  const handleYearSearch = async (year) => {
    setErrors([]);
    setSuccess(false);

    const config = {
      url: `${serverUrl}/reports/search-year?date_created=${year}`,
      method: "GET",
      data: {},
    };

    try {
      const { res } = await API(config);
      if (res) {
        setUser(res.data.account);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setErrors(
        error.response?.data?.errors.map((err) => err.msg) || [
          "An error occurred.",
        ]
      );
    }
  };

  const handleChange = async (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    localStorage.setItem("reportYear", JSON.stringify(year));
    if (year) {
      await handleYearSearch(year); // Call the search function when a year is selected
    }
  };

  const handleFeedBackChange = async (e) => {
    setType(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className={`col-span-8 overflow-hidden rounded-lg`}>
          <div
            className={`flex flex-col sm:flex-row sm:justify-between items-center rounded-xl h-auto sm:h-16 shadow-md p-4 sm:pl-10 font-bold bg-${theme}`}
          >
            <div className="mb-2 sm:mb-0 sm:mr-4">REPORTS</div>
            <div className="w-full sm:w-auto sm:mb-0 border-gray-300 p-2 rounded-lg">
              <select
                value={selectedYear}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border border-gray-300"
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
              onClick={() => {
                window.open("/sales-revenue-chart", "_blank");
                localStorage.setItem(
                  "report",
                  JSON.stringify([totalSales, totaRevenue])
                );
              }}
            >
              Generate
            </button>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-5 justify-center mt-4">
            <div
              className={`rounded-xl p-5 shadow-md flex flex-col gap-5 w-full sm:w-[48%] lg:max-w-lg max-h-64 bg-${theme} items-center justify-center`}
            >
              {lineChart.datasets[0].data && (
                <div className="w-full h-full flex items-center justify-center">
                  <LineChart data={lineChart} title_text={"Yearly Sales"} />
                </div>
              )}
            </div>
            <div
              className={`rounded-xl p-5 shadow-md flex flex-col gap-5 w-full sm:w-[48%] lg:max-w-lg max-h-64 bg-${theme} items-center justify-center`}
            >
              {lineChartRevenue.datasets[0].data && (
                <div className="w-full h-full flex items-center justify-center">
                  <LineChart
                    data={lineChartRevenue}
                    title_text={"Yearly Revenue"}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-5 justify-center mt-4">
            <div className="w-full sm:w-[48%] lg:w-[500px]">
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
            <div className="w-full sm:w-[48%] lg:w-[500px]">
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
          className={`flex flex-col sm:flex-row items-center rounded-xl h-auto sm:h-16 shadow-md p-4 font-bold mb-4 gap-5 ${
            theme === "night" ? "bg-night text-white" : "bg-fantasy text-black"
          }`}
        >
          <label className="text-xl font-bold">Feedbacks</label>
          <div className="w-full sm:w-auto">
            <select
              value={type}
              onChange={handleFeedBackChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
            >
              <option disabled selected>
                Choose Type
              </option>
              <option>All</option>
              <option>Bug</option>
              <option>Feedback</option>
              <option>Performance Issue</option>
              <option>Audio Issue</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div>
          <FeedbackTable
            setSelected={setSelected}
            feedback={feedback}
            setselectedfeedbackID={setselectedfeedbackID}
          />
        </div>

        <div
          className={`flex flex-col sm:flex-row items-center rounded-xl h-auto sm:h-16 shadow-md p-4 font-bold mb-4 gap-5 ${
            theme === "night" ? "bg-night text-white" : "bg-fantasy text-black"
          }`}
        >
          <label className="text-2xl font-bold">User Logs</label>
          <div className="flex-grow"></div>
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
          <div className="flex flex-wrap gap-4 items-center mb-4">
            <div className="w-full sm:w-auto">
              <label className="text-l font-bold">From:</label>
              <input
                type="date"
                className="border border-gray-300 p-2 rounded-lg w-full"
                value={fromDate}
                onChange={handleFromDateChange}
              />
            </div>
            <div className="w-full sm:w-auto">
              <label className="text-l font-bold">To:</label>
              <input
                type="date"
                className="border border-gray-300 p-2 rounded-lg w-full"
                value={toDate}
                onChange={handleToDateChange}
              />
            </div>
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
