import React, { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import logo from "../../assets/logo1.png";
import { AlertsContext } from "../../context/Alerts";
import { SuccessContext } from "../../context/Success";
import { UserContext } from "../../context/User";
import LineChart from "../../components/ui/LineChart";
import API from "../../service/API";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import TopItem from "../../components/ui/TopTables";
import useAuthCheck from "../../hooks/useAuthCheck";
const lineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Sales",
      data: localStorage.getItem("report") ? JSON.parse(localStorage.getItem("report"))[0] : [],
      backgroundColor: "rgba(255, 22, 49, 0.9)",
      borderColor: "rgba(216, 23, 45, 0.9)",
      borderWidth: 2,
      pointBackgroundColor: "rgba(216, 23, 45, 0.9)",
    },
    {
      label: "Revenue",
      data: localStorage.getItem("report") ? JSON.parse(localStorage.getItem("report"))[1] : [],
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
  const [topItem, settopItem] = useState([]);
  const [topOffer, settopOffer] = useState([]);
  const [year, setYear] = useState(JSON.parse(localStorage.getItem("reportYear")));
  useAuthCheck();
  const reloadComponent = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    fetchCurrentUser();
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
    if (!user) {
      return;
    }
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
    if (!user) {
      return;
    }
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

  const fetchTopItems = async () => {
    if (!user) {
      return;
    }
    const config = {
      url: `${serverUrl}/reports/view/topitembyyear?year=${year}`,
      method: "GET",
      data: {},
    };

    const { res, error } = await API(config);

    if (res) {
      if (res.data.topitemDataByYear) {
        console.log(res.data.topitemDataByYear);
        settopItem(res.data.topitemDataByYear);
      }
    }

    if (error) {
      console.log(error);
    }
  };

  const fetchTopOffer = async () => {
    if (!user) {
      return;
    }
    const config = {
      url: `${serverUrl}/reports/view/topofferbyyear?year=${year}`,
      method: "GET",
      data: {},
    };

    const { res, error } = await API(config);

    if (res) {
      if (res.data.topofferDataByYear) {
        settopOffer(res.data.topofferDataByYear);
      }
    }

    if (error) {
      console.log(error);
    }
  };

  const fetchCurrentUser = async () => {
    if (!user) {
      return;
    }
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

  const onButtonClick = () => {
    let domElement = document.getElementById("custom-sales-and-revenue-report");

    // Use htmlToImage to generate the image
    htmlToImage
      .toPng(domElement)
      .then(function (dataUrl) {
        console.log(dataUrl);

        // Create a new jsPDF instance
        const pdf = new jsPDF();

        // Adjust the image size and position based on the page dimensions
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Adjust the scaling if the content is too large for the page
        const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
        const scaledWidth = imgProps.width * ratio;
        const scaledHeight = imgProps.height * ratio;

        // Add the image to the PDF
        pdf.addImage(dataUrl, "PNG", 5, 20, scaledWidth, scaledHeight);

        // Save the generated PDF
        pdf.save("SalesAndRevenueReport.pdf");
      })
      .catch(function (error) {
        console.error("Oops, something went wrong!", error);
      });
  };

  useEffect(() => {
    fetchTopItems();
    fetchTopOffer();

    return () => {
      settopItem();
      settopOffer();
    };
  }, []);

  return !user ? (
    <></>
  ) : (
    <div className="flex place-content-center mx-auto w-full">
      <div id="custom-sales-and-revenue-report" className="w-8/12">
        <button
          onClick={onButtonClick}
          type="button"
          className="fixed bottom-5 right-5 z-10 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          <i className="fa-regular fa-circle-down"></i> Download
        </button>
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

          {/* Chart */}
          <div className="flex mb-5 gap-5 justify-center mt-4">
            <LineChart data={lineChart} title_text={"Yearly Sales"} isLegend={true} />
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
            <div>
              <h3 style={{ textAlign: "center", fontWeight: "bold" }}>Offers</h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  color: themeColors.textColor,
                }}
              >
                <thead>
                  <tr>
                    <TopItem
                      column={{
                        column1: "Offer",
                        column2: "Unit Sold",
                        column3: "Date Created",
                      }}
                      topItem={topOffer}
                    />
                  </tr>
                </thead>
              </table>
            </div>

            {/* Top Items Table */}
            <div>
              <h3 style={{ textAlign: "center", fontWeight: "bold" }}>Items</h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  color: themeColors.textColor,
                }}
              >
                <thead>
                  <tr>
                    <TopItem
                      column={{
                        column1: "Item",
                        column2: "Unit Sold",
                        column3: "Date Created",
                      }}
                      topItem={topItem}
                    />
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          {/* Generated Info Section */}
          <div
            style={{
              textAlign: "left",
              marginBottom: "20px",
              fontSize: "0.9rem",
              color: themeColors.textColor,
              marginTop: "30px",
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
        </div>
      </div>
    </div>
  );
};

export default SalesAndRevenueChart;
