import React, { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import logo from "../../assets/logo1.png";
import { AlertsContext } from "../../context/Alerts";
import { SuccessContext } from "../../context/Success";
import { UserContext } from "../../context/User";
import LineChart from "../../components/ui/LineChart";
import API from "../../service/API";

const lineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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

const SalesAndRevenueChart = ({
  theme,
  generatedBy = "N/A",
  printedDate = new Date().toLocaleDateString(),
}) => {
  const [lineChart, setLineChart] = useState(lineChartData);
  const [lineChartRevenue, setLineChartRevenue] = useState(lineChartRevenueData);
  const [user, setUser] = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState([]);
  const [errors, setErrors] = useContext(AlertsContext);
  const [data, setData] = useState();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [reloadKey, setReloadKey] = useState(0);

  const reloadComponent = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchtotalSales();
    fetchtotalRevenue();
  }, []);
  // Theme color definitions
  const themeColors =
    theme === "night"
      ? {
          bgColor: "#1F2937", // Dark background color for the night theme
          textColor: "#E5E7EB", // Light text color for the night theme
        }
      : {
          bgColor: "#FFFFFF", // White background for the light theme
          textColor: "#1F2937", // Dark text color for the light theme
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
        lineChartData.datasets[0].data = res.data.totalsalesData[0].total_sales_array;
        setLineChart(lineChartData);
      } else {
        setErrors(["No data found"]);
      }
    }

    if (error) {
      console.log(error);
      setErrors([error.response?.data?.errors?.map((error) => error.msg) || "An error occurred"]);
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
        lineChartRevenueData.datasets[0].data = res.data.totalrevenueData[0].monthly_totals;
        setLineChartRevenue(lineChartRevenueData);
      } else {
        setErrors(["No data found"]);
      }
    }

    if (error) {
      console.log(error);
      setErrors([error.response?.data?.errors?.map((error) => error.msg) || "An error occurred"]);
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
      setErrors([error.response?.data?.errors?.map((error) => error.msg) || "An error occurred"]);
    }
  };

  return (
    <div
      className="chart-container"
      style={{
        padding: "20px",
        backgroundColor: themeColors.bgColor,
        color: themeColors.textColor,
        borderRadius: "10px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Logo and Title Section */}
      <div
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <img src={logo} alt="Logo" style={{ height: "50px", marginRight: "15px" }} />
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "1.8rem",
            margin: 0,
            color: themeColors.textColor,
          }}
        >
          Pugad Maharlika
        </h1>
      </div>

      {/* Generated Info Section */}
      <div
        style={{
          textAlign: "left",
          marginBottom: "20px",
          fontSize: "0.9rem",
          color: themeColors.textColor,
        }}
      >
        <p>
          <strong>Generated by:</strong>{" "}
          {currentUser &&
            currentUser.acc_fname + " " + currentUser.acc_mname + " " + currentUser.acc_lname}
        </p>
        <p>
          <strong>Date Printed:</strong> {new Date().toLocaleString()}
        </p>
      </div>

      {/* Chart */}
      <div className="flex mb-5 gap-5 justify-center mt-4">
        <div
          className={`place-content-center  rounded-xl p-5 shadow-md flex flex-wrap flex-2 flex-col gap-5 w-full max-w-lg max-h-64 bg-${theme}`}
        >
          <LineChart data={lineChart} title_text={"Yearly Sales"} />
        </div>
        <div
          className={`rounded-xl p-5 shadow-md flex flex-2 flex-col gap-5 w-full max-w-[35rem] xl:max-w-lg max-h-64  bg-${theme}`}
        >
          <LineChart data={lineChartRevenue} title_text={"Yearly Revenue"} />
        </div>
      </div>

      {/* Bottom Tables Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        {/* Top Offers Table */}
        <div
          style={{
            width: "48%",
            backgroundColor: themeColors.bgColor,
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "15px",
          }}
        >
          <h3 style={{ textAlign: "center", fontWeight: "bold" }}>Top Offers</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: themeColors.textColor,
            }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Item</th>
                <th style={{ textAlign: "center" }}>Sold</th>
              </tr>
            </thead>
            <tbody>
              {[
                { item: "Offer 1", sold: 150 },
                { item: "Offer 2", sold: 120 },
                { item: "Offer 3", sold: 80 },
              ].map((offer, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>{offer.item}</td>
                  <td style={{ textAlign: "center" }}>{offer.sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Items Table */}
        <div
          style={{
            width: "48%",
            backgroundColor: themeColors.bgColor,
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "15px",
          }}
        >
          <h3 style={{ textAlign: "center", fontWeight: "bold" }}>Top Items</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: themeColors.textColor,
            }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Item</th>
                <th style={{ textAlign: "center" }}>Sold</th>
              </tr>
            </thead>
            <tbody>
              {[
                { item: "Item A", sold: 250 },
                { item: "Item B", sold: 200 },
                { item: "Item C", sold: 180 },
              ].map((item, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>{item.item}</td>
                  <td style={{ textAlign: "center" }}>{item.sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesAndRevenueChart;
