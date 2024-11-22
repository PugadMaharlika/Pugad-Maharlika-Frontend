import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import logo from "../../assets/logo1.png";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const SalesAndRevenueChart = ({ theme }) => {
  const [data, setData] = useState({
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
        label: "Sales",
        data: [120, 150, 200, 180, 250, 300, 350, 400, 450, 500, 550, 600],
        borderColor: "#42A5F5",
        backgroundColor: "rgba(66, 165, 245, 0.2)",
        fill: true,
      },
      {
        label: "Revenue",
        data: [
          1000, 1200, 1500, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000,
          3200,
        ],
        borderColor: "#66BB6A",
        backgroundColor: "rgba(102, 187, 106, 0.2)",
        fill: true,
      },
    ],
  });

  const [options, setOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales and Revenue Chart",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
        },
      },
    },
  });

  useEffect(() => {
    // Any dynamic data fetching or updates can go here
  }, []);

  // Define colors based on the theme
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

  const topOffers = [
    { item: "Offer 1", sold: 150 },
    { item: "Offer 2", sold: 120 },
    { item: "Offer 3", sold: 80 },
  ];

  const topItems = [
    { item: "Item A", sold: 250 },
    { item: "Item B", sold: 200 },
    { item: "Item C", sold: 180 },
  ];

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
          marginBottom: "20px",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ height: "50px", marginRight: "15px" }}
        />
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

      <Line data={data} options={options} />

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
          <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
            Top Offers
          </h3>
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
              {topOffers.map((offer, index) => (
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
              {topItems.map((item, index) => (
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