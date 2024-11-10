import React, { useEffect, useState, useContext } from "react";
import DBCard from "../../components/ui/DBCard";
import AutoCarousel from "../../components/ui/AutoCarousel";
import useAuthCheck from "../../hooks/useAuthCheck";
import { ThemeContext } from "../../context/Theme";
import { UserContext } from "../../context/User";
import DonutChart from "../../components/ui/DonutChart";
import LineChart from "../../components/ui/LineChart";
import API from "../../service/API";
const serverUrl = process.env.REACT_APP_SERVER_URL;

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
      data: [],
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 2,
      pointBackgroundColor: "rgba(75,192,192,1)",
    },
  ],
};

function AdminDashboard() {
  useAuthCheck();
  const [theme, setTheme] = useContext(ThemeContext);
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [lineChart, setLineChart] = useState(lineChartData);
  const [counter, setCounter] = useState([]);
  const [monthlyPlayer, setMonthlyPlayer] = useState([]);
  const [recentTransaction, setRecentTransaction] = useState([]);
  const [recentRegistration, setRecentRegistration] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        url: `${serverUrl}/auth/dashboard`,
        method: "POST",
      };

      try {
        const { res, error } = await API(config);

        if (res) {
          setLoading(false);
          setUser(res.data.account);
          setCounter(res.data.counter);
          setMonthlyPlayer(res.data.monthly);
          setRecentTransaction(res.data.transactions);
          setRecentRegistration(res.data.registrations);
          lineChartData.datasets[0].data = res.data.monthly;
          setLineChart(lineChartData);
          console.log(res.data.transactions);
        }
        if (error) {
          console.log(error);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col flex-grow gap-5">
      <div
        className={`flex w-full text-md rounded-xl h-16 shadow-md  p-4 pl-10 font-bold bg-${theme}`}
      >
        DASHBOARD
      </div>
      <div className={`flex flex-wrap justify-center gap-x-5 gap-y-10 ${loading && "hidden"}`}>
        <DBCard
          theme={theme}
          title={"Player"}
          number={counter.player}
          icon={<i className="fa-solid fa-users"></i>}
        />
        <DBCard
          theme={theme}
          title={"Admin"}
          number={counter.admin}
          icon={<i className="fa-solid fa-user-tie"></i>}
        />
        <DBCard
          theme={theme}
          title={"Item"}
          number={counter.item}
          icon={<i className="fa-solid fa-hat-wizard"></i>}
        />
        <DBCard
          theme={theme}
          title={"Offer"}
          number={counter.offer}
          icon={<i className="fa-solid fa-sack-dollar"></i>}
        />

        <div
          className={`place-content-center  rounded-xl p-5 shadow-md flex flex-wrap flex-2 flex-col gap-5 w-[30rem] h-64 bg-${theme}`}
        >
          <LineChart data={lineChart} title_text={"Monthly Player Registration"} />
        </div>
        <div
          className={`rounded-xl p-5 shadow-md flex flex-2 flex-col gap-5 w-full max-w-[30rem] xl:max-w-lg max-h-64  bg-${theme}`}
        >
          <p className="text-sm font-bold">Recent Offer Transactions</p>
          <div className="overflow-y-auto text-nowrap">
            <table className="table table-zebra  w-full">
              {/* head */}
              <thead className={`sticky top-0 w-full bg-${theme}`}>
                <tr>
                  <th></th>
                  <th>Username</th>
                  <th>Offer</th>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className="">
                {recentTransaction.map((transaction, index) => (
                  <tr key={transaction.acc_id}>
                    <th>{index + 1}</th>
                    <td className="overflow-x-auto max-w-10">{transaction.acc_username}</td>
                    <td>{transaction.ofr_type}</td>
                    <td>{transaction.ofr_price}</td>
                    <td>{transaction.his_date_created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className={`rounded-xl p-5 shadow-md flex flex-2 flex-col gap-5 w-full max-w-screen-lg max-h-64 bg-${theme}`}
        >
          <p className="text-sm font-bold">Recent Registration</p>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead className={`sticky top-0 w-full bg-${theme}`}>
                <tr>
                  <th></th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentRegistration.map((account, index) => (
                  <tr key={account.acc_id}>
                    <th>{index + 1}</th>
                    <td>{account.acc_username}</td>
                    <td>{account.acc_email}</td>
                    <td>{account.acc_type}</td>
                    <td>{account.acc_date_created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
