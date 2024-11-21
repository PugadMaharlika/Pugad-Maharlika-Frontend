import React, { useContext, useState, useEffect } from "react";
import LineChart from "../../components/ui/LineChart";
import DataTable from "../../components/ui/DataTable";
import { ThemeContext } from "../../context/Theme";
import { UserContext } from "../../context/User";
import { SuccessContext } from "../../context/Success";
import { AlertsContext } from "../../context/Alerts";
import API from "../../service/API";

var lineChartData = {
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
      label: "Player Registration",
      data: [],
      backgroundColor: "rgba(54, 162, 235, 0.4)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 2,
      pointBackgroundColor: "rgba(54, 162, 235, 1)",
    },
  ],
};

const PlayerManagement = ({ setSelected, setSelectedPlayer }) => {
  const [theme] = useContext(ThemeContext);
  const [accvalues, setAccValues] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [charts, setCharts] = useState("");
  const [linecharts, setLineCharts] = useState(lineChartData);

  const handleChangePage = (account) => {
    setSelected("PlayerAccount");
    setSelectedPlayer(account);
  };

  useEffect(() => {
    handleViewPlayer();
  }, []);

  const handleViewPlayer = async () => {
    setErrors([]);
    setSuccess(false);
    const config = {
      url: `${serverUrl}/account/player`,
      method: "GET",
      data: {},
    };

    const { res, error } = await API(config);
    if (res) {
      setIsLoading(false);
      setAccValues(res.data.players);
      setCharts(res.data.charts);
      lineChartData.datasets[0].data = res.data.charts;
      setLineCharts(lineChartData);
      console.log(res.data.charts);
    }
    if (error) {
      setErrors(error.response.data.errors.map((error) => error.msg));
    }
  };
  const handleSearchPlayer = async () => {
    setErrors([]);
    setSuccess(false);
    if (!search) {
      handleViewPlayer();
    }

    setErrors([]);
    setSuccess(false);

    const config = {
      url: `${serverUrl}/account/search`,
      method: "POST",
      data: { search: search, isAdmins: false },
    };

    const { res, error } = await API(config);
    if (res) {
      setAccValues(res.data.users);
    }
    if (error) {
      setErrors(error.response.data.errors.map((error) => error.msg));
    }
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
          <LineChart title_text={"Recents"} data={linecharts} />
        </div>
      </div>

      {/* Search Input */}
      <div className="w-full sm:w-full p-1 py-1 px-7 mb-4 sm:mb-0">
        <div
          className={`flex col-span-8 flex-col overflow-hidden rounded-lg shadow-lg text-xs md:text-md w-64 px-8 sm:w-full py-10 mb-5 bg-${theme}`}
        >
          <div className="flex items-center border rounded-md w-full">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 w-full rounded-l-md outline-none"
            />
            {/* Search Icon on the right */}
            <button onClick={handleSearchPlayer}>
              <i className="fa-solid fa-magnifying-glass p-2"></i>
            </button>
          </div>
          {/* DataTable */}
          <DataTable
            selectedCallback={handleChangePage}
            accvalues={accvalues}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerManagement;
