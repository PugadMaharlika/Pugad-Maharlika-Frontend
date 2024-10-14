import React, { useEffect, useState, useContext } from "react";
import DBCard from "../../components/ui/DBCard";
import AutoCarousel from "../../components/ui/AutoCarousel";
import useAuthCheck from "../../hooks/useAuthCheck";
import { ThemeContext } from "../../context/Theme";
import DonutChart from "../../components/ui/DonutChart";
import LineChart from "../../components/ui/LineChart";
const serverUrl = process.env.REACT_APP_SERVER_URL;

function AdminDashboard() {
  useAuthCheck();
  const [theme, setTheme] = useContext(ThemeContext);

  const images = [
    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
    "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
    "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
    "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp",
    "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp",
    "https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp",
    "https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp",
  ];
  const characters = [
    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
    "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
    "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
    "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp",
    "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp",
    "https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp",
    "https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp",
  ];

  const sales = [10, 20, 30, 40, 50, 60];
  const recent_transactions = [
    {
      acc_id: 1,
      acc_username: "SMOOSH",
      ofr_type: "Bundle",
      ofr_price: "200",
      date_created: "10-6-2024",
    },
    {
      acc_id: 2,
      acc_username: "JACKSON23",
      ofr_type: "Single Item",
      ofr_price: "50",
      date_created: "10-5-2024",
    },

    {
      acc_id: 3,
      acc_username: "NINA_SKY",
      ofr_type: "Subscription",
      ofr_price: "100",
      date_created: "10-4-2024",
    },
    {
      acc_id: 4,
      acc_username: "JAY_MART",
      ofr_type: "Bundle",
      ofr_price: "250",
      date_created: "10-3-2024",
    },
    {
      acc_id: 5,
      acc_username: "CRYPTO_KING",
      ofr_type: "Special Deal",
      ofr_price: "400",
      date_created: "10-2-2024",
    },
  ];

  const recent_registration = [
    {
      acc_id: 1,
      acc_username: "SMOOSH",
      acc_email: "smoosh@gmail.com",
      acc_type: "P",
      date_created: "10-6-2024",
    },
    {
      acc_id: 2,
      acc_username: "JACKSON23",
      acc_email: "jackson23@hotmail.com",
      acc_type: "P",
      date_created: "10-5-2024",
    },
    {
      acc_id: 3,
      acc_username: "NINA_SKY",
      acc_email: "nina_sky@yahoo.com",
      acc_type: "P",
      date_created: "10-4-2024",
    },
    {
      acc_id: 4,
      acc_username: "JAY_MART",
      acc_email: "jaymart@business.com",
      acc_type: "P",
      date_created: "10-3-2024",
    },
    {
      acc_id: 5,
      acc_username: "CRYPTO_KING",
      acc_email: "crypto_king@gmail.com",
      acc_type: "P",
      date_created: "10-2-2024",
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
        data: [10, 20, 30, 40, 50, 60],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className="w-full h-full flex flex-col flex-grow gap-5">
      <div
        className={`flex w-full text-md rounded-xl h-16 shadow-md  p-4 pl-10 font-bold bg-${theme}`}
      >
        DASHBOARD
      </div>
      <div className=" flex flex-wrap justify-center gap-x-5 gap-y-10 ">
        <DBCard
          theme={theme}
          title={"Player"}
          number={40}
          icon={<i className="fa-solid fa-users"></i>}
        />
        <DBCard
          theme={theme}
          title={"Admin"}
          number={40}
          icon={<i class="fa-solid fa-user-tie"></i>}
        />
        <DBCard
          theme={theme}
          title={"Item"}
          number={2}
          icon={<i class="fa-solid fa-hat-wizard"></i>}
        />
        <DBCard
          theme={theme}
          title={"Offer"}
          number={5}
          icon={<i class="fa-solid fa-sack-dollar"></i>}
        />

        <div
          className={`place-content-center  rounded-xl p-5 shadow-md flex flex-wrap flex-2 flex-col gap-5 w-full max-w-lg max-h-64 bg-${theme}`}
        >
          <LineChart data={lineChartData} />
        </div>
        <div
          className={`rounded-xl p-5 shadow-md flex flex-2 flex-col gap-5 w-full max-w-[35rem] xl:max-w-lg max-h-64  bg-${theme}`}
        >
          <p className="text-sm font-bold">Recent Transactions</p>
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
                {recent_transactions.map((transaction, index) => (
                  <tr key={transaction.acc_id}>
                    <th>{index + 1}</th>
                    <td>{transaction.acc_username}</td>
                    <td>{transaction.ofr_type}</td>
                    <td>{transaction.ofr_price}</td>
                    <td>{transaction.date_created}</td>
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
                {recent_registration.map((account, index) => (
                  <tr key={account.acc_id}>
                    <th>{index + 1}</th>
                    <td>{account.acc_username}</td>
                    <td>{account.acc_email}</td>
                    <td>{account.acc_type}</td>
                    <td>{account.date_created}</td>
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
