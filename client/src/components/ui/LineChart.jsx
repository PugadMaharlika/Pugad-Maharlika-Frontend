import React from 'react';
import { Chart } from "react-google-charts";


const LineChart = ({values, title, htitle,vtitle}) => {
  const data = values

  const options = {
    title: title,
    curveType: "function", // Smooth the lines
    hAxis: {
      title: htitle,
    },
    vAxis: {  
      title: vtitle,
    },
    legend: { position: "bottom" },
    colors: ["#1A56DB"], // Customize the color of the line
  };
  
  return (
    <div>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
        loader={<div>Loading Chart...</div>}
      />
    </div>
  );
};

export default LineChart;


// const data = [
//   ["Month", ""],
//   ["January", 500],
//   ["February", 436],
//   ["March", 846],
//   ["April", 245],
//   ["May", 500],
//   ["June", 475],
//   ["July", 500],
//   ["August", 500],
//   ["September", 500],
//   ["October", 1250],
//   ["November", 1250],
//   ["December", 1250],
// ];

// const options = {
//   title: "Recent",
//   curveType: "function", // Smooth the lines
//   hAxis: {
//     title: "Months",
//   },
//   vAxis: {
//     title: "Admin Accounts",
//   },
//   legend: { position: "bottom" },
//   colors: ["#1A56DB"], // Customize the color of the line
// };


