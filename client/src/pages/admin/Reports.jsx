import React from "react";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState } from "react";
import { TransactionTable } from "../../components/ui/TransactionTable";
import { FeedbackTable } from "../../components/ui/FeedBackTable";
import { UserLogsTable } from "../../components/ui/UserLogsTable";
import { FeedBackDetails } from "../../pages/admin/FeedBackDetails";
import LineChart from "../../components/ui/LineChart";
import TopItem from "../../components/ui/TopTables";

export const Reports = ({
  setSelected,
  startYear = 2000,
  endYear = new Date().getFullYear(),
}) => {
  const [selectedYear, setSelectedYear] = useState("");
  const [theme] = useContext(ThemeContext);

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const sampleData = [
    {
      id: 1,
      name: "Johny Bravo",
      type: "Global",
    },
    {
      id: 2,
      name: "Johny Maskulado",
      type: "Player",
    },
    {
      id: 3,
      name: "Johny Brave",
      type: "Global",
    },
    {
      id: 3,
      name: "Johny Brave",
      type: "Global",
    },
    {
      id: 3,
      name: "Johny Brave",
      type: "Global",
    },
  ];

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
        data: [0, 20, 30, 40, 50, 60, 30, 40, 20, 50, 55, 15],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(75,192,192,1)",
      },
    ],
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
            <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">
              Generate
            </button>
          </div>
        </div>

        <div className="flex mb-5 gap-5 justify-center">
          <div
            className={`place-content-center  rounded-xl p-5 shadow-md flex flex-wrap flex-2 flex-col gap-5 w-full max-w-lg max-h-64 bg-${theme}`}
          >
            <LineChart data={lineChartData} />
          </div>
          <div
            className={`rounded-xl p-5 shadow-md flex flex-2 flex-col gap-5 w-full max-w-[35rem] xl:max-w-lg max-h-64  bg-${theme}`}
          >
            <LineChart data={lineChartData} />
          </div>
        </div>

        <div className="flex gap-40 justify-center">
          <div>
            <label className="text-2xl font-bold">Top 5 Items</label>
            <TopItem
              sampleData={sampleData}
              column={{ column1: "Item", column2: "Sold" }}
            />
          </div>
          <div>
            <label className="text-2xl font-bold">Top 5 Offers</label>
            <TopItem
              sampleData={sampleData}
              column={{ column1: "Item", column2: "Sold" }}
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
          <FeedbackTable setSelected={setSelected} />
        </div>

        <div
          className={`flex w-full rounded-xl h-16 shadow-md p-4 font-bold items-center mb-4 ${
            theme === "night" ? "bg-night text-white" : "bg-fantasy text-black"
          }`}
        >
          <label className="text-2xl font-bold">User Logs</label>
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
            <UserLogsTable setSelected={setSelected} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
