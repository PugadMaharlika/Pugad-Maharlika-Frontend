import React, { useContext } from "react";
import LineChart from "../../components/ui/LineChart";
import DataTable from "../../components/ui/DataTable";
import { ThemeContext } from "../../context/Theme";

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
      label: "Player Activity",
      data: [120, 150, 180, 210, 230, 220, 250, 300, 270, 320, 310, 330],
      backgroundColor: "rgba(54, 162, 235, 0.4)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 2,
      pointBackgroundColor: "rgba(54, 162, 235, 1)",
    },
  ],
};

// Player data for the DataTable
const playerData = [
  {
    id: 1,
    username: "OhMama",
    email: "johny@gmail.com",
    date: "28 Jan, 12:30 AM",
    status: "Active",
  },
  {
    id: 2,
    username: "OhMuscle",
    email: "masku@gmail.com",
    date: "25 Jan, 10:40 PM",
    status: "Active",
  },
  {
    id: 3,
    username: "Alahooooo!",
    email: "abdul@gmail.com",
    date: "20 Jan, 10:40 PM",
    status: "Disabled",
  },
  {
    id: 4,
    username: "Lalalala",
    email: "wsmith@gmail.com",
    date: "15 Jan, 03:29 PM",
    status: "Disabled",
  },
  {
    id: 5,
    username: "Yeaaaahh!",
    email: "ESing@gmail.com",
    date: "14 Jan, 10:40 PM",
    status: "Active",
  },
  {
    id: 6,
    username: "sHANE",
    email: "johny@gmail.com",
    date: "28 Jan, 12:30 AM",
    status: "Active",
  },
  {
    id: 7,
    username: "ODWA",
    email: "masku@gmail.com",
    date: "25 Jan, 10:40 PM",
    status: "Active",
  },
  {
    id: 8,
    username: "lOWI!",
    email: "abdul@gmail.com",
    date: "20 Jan, 10:40 PM",
    status: "Disabled",
  },
  {
    id: 9,
    username: "Lalalala",
    email: "wsmith@gmail.com",
    date: "15 Jan, 03:29 PM",
    status: "Disabled",
  },
  {
    id: 10,
    username: "Yeaaaahh!",
    email: "ESing@gmail.com",
    date: "14 Jan, 10:40 PM",
    status: "Active",
  },
];

const PlayerManagement = ({ setSelected }) => {
  const [theme] = useContext(ThemeContext);

  const handleChangePage = () => {
    setSelected("PlayerAccount");
  };

  return (
    <div
      className={`col-span-8 overflow-hidden rounded-lg text-xs md:text-md w-64 px-8 sm:w-full`}
    >
      {/* Player Accounts Title and Add Player Button */}
      <div
        className={`flex flex-col sm:flex-row justify-between items-center w-full rounded-xl h-auto sm:h-16 shadow-md py-2 sm:p-3 font-bold ${
          theme === "night" ? "bg-night text-white" : "bg-fantasy text-black"
        } mb-4`}
      >
        <h1 className="text-2xl font-semibold">Player Management</h1>
      </div>

      {/* Line Chart Section */}
      <div className="flex justify-center items-center pt-4 mt-4 mb-8">
        <div
          className={`place-content-center rounded-xl p-5 shadow-md flex flex-wrap flex-col w-full max-w-2xl max-h-96 ${
            theme === "night" ? "bg-night" : "bg-fantasy"
          }`}
        >
          <LineChart title_text={"Recents"} data={lineChartData} />
        </div>
      </div>

      {/* DataTable Section */}
      <div className="mt-8">
        <DataTable selectedCallback={handleChangePage} accvalues={playerData} />
      </div>
    </div>
  );
};

export default PlayerManagement;
