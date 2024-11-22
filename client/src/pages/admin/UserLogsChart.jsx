import React, { useState } from "react";
import logo from "../../assets/logo1.png";

const UserLogsChart = ({ theme }) => {
  const [logs, setLogs] = useState([
    {
      username: "Johny Bravo",
      type: "Authorized",
      origin: "Offers",
      ipAddress: "192.168.1.1",
      description: "Add",
      dateCreated: "2022-01-01",
    },
    {
      username: "Jane Doe",
      type: "Unauthorized",
      origin: "Settings",
      ipAddress: "192.168.1.2",
      description: "Attempted Edit",
      dateCreated: "2023-05-15",
    },
    {
      username: "Mark Smith",
      type: "Authorized",
      origin: "Dashboard",
      ipAddress: "192.168.1.3",
      description: "View",
      dateCreated: "2023-06-20",
    },
    {
      username: "Emma Stone",
      type: "Authorized",
      origin: "Offers",
      ipAddress: "192.168.1.4",
      description: "Delete",
      dateCreated: "2024-01-10",
    },
    {
      username: "Chris Evans",
      type: "Unauthorized",
      origin: "Admin Panel",
      ipAddress: "192.168.1.5",
      description: "Attempted Access",
      dateCreated: "2024-03-05",
    },
    {
      username: "Scarlett Johansson",
      type: "Authorized",
      origin: "Transactions",
      ipAddress: "192.168.1.6",
      description: "Update",
      dateCreated: "2024-02-18",
    },
    {
      username: "Robert Downey Jr.",
      type: "Unauthorized",
      origin: "Settings",
      ipAddress: "192.168.1.7",
      description: "Attempted Access",
      dateCreated: "2024-03-22",
    },
    {
      username: "Tom Hiddleston",
      type: "Authorized",
      origin: "Reports",
      ipAddress: "192.168.1.8",
      description: "View",
      dateCreated: "2024-04-10",
    },
    {
      username: "Natalie Portman",
      type: "Authorized",
      origin: "Dashboard",
      ipAddress: "192.168.1.9",
      description: "Edit",
      dateCreated: "2024-05-01",
    },
    {
      username: "Chris Hemsworth",
      type: "Unauthorized",
      origin: "Admin Panel",
      ipAddress: "192.168.1.10",
      description: "Attempted Edit",
      dateCreated: "2024-06-15",
    },
  ]);

  // Define colors based on the theme
  const themeColors =
    theme === "night"
      ? {
          bgColor: "#1F2937", // Dark background color for the night theme
          textColor: "#E5E7EB", // Light text color for the night theme
          borderColor: "#374151", // Border color for the night theme
        }
      : {
          bgColor: "#FFFFFF", // White background for the light theme
          textColor: "#1F2937", // Dark text color for the light theme
          borderColor: "#D1D5DB", // Border color for the light theme
        };

  return (
    <div
      className="user-logs-container"
      style={{
        padding: "20px",
        backgroundColor: themeColors.bgColor,
        color: themeColors.textColor,
        borderRadius: "10px",
        maxWidth: "900px",
        margin: "0 auto", // Centers the container horizontally
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

      <h2 style={{ textAlign: "center", fontWeight: "bold" }}>User Logs</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          color: themeColors.textColor,
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: "center",
                padding: "10px",
                border: `1px solid ${themeColors.borderColor}`,
              }}
            >
              Username
            </th>
            <th
              style={{
                textAlign: "center",
                padding: "10px",
                border: `1px solid ${themeColors.borderColor}`,
              }}
            >
              Type
            </th>
            <th
              style={{
                textAlign: "center",
                padding: "10px",
                border: `1px solid ${themeColors.borderColor}`,
              }}
            >
              Origin
            </th>
            <th
              style={{
                textAlign: "center",
                padding: "10px",
                border: `1px solid ${themeColors.borderColor}`,
              }}
            >
              IP Address
            </th>
            <th
              style={{
                textAlign: "center",
                padding: "10px",
                border: `1px solid ${themeColors.borderColor}`,
              }}
            >
              Description
            </th>
            <th
              style={{
                textAlign: "center",
                padding: "10px",
                border: `1px solid ${themeColors.borderColor}`,
              }}
            >
              Date Created
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  border: `1px solid ${themeColors.borderColor}`,
                }}
              >
                {log.username}
              </td>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  border: `1px solid ${themeColors.borderColor}`,
                }}
              >
                {log.type}
              </td>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  border: `1px solid ${themeColors.borderColor}`,
                }}
              >
                {log.origin}
              </td>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  border: `1px solid ${themeColors.borderColor}`,
                }}
              >
                {log.ipAddress}
              </td>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  border: `1px solid ${themeColors.borderColor}`,
                }}
              >
                {log.description}
              </td>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  border: `1px solid ${themeColors.borderColor}`,
                }}
              >
                {log.dateCreated}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserLogsChart;