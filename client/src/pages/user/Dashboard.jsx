import React, { useEffect, useState, useContext } from "react";
import DBCard from "../../components/ui/DBCard";
import AutoCarousel from "../../components/ui/AutoCarousel";
import useAuthCheck from "../../hooks/useAuthCheck";
import { ThemeContext } from "../../context/Theme";
import logo from "../../assets/logo1.png";
const serverUrl = process.env.REACT_APP_SERVER_URL;

function Dashboard() {
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

  return (
    <div className="w-full h-full flex flex-col flex-grow gap-5">
      <div
        className={`flex w-full text-md rounded-xl h-16 shadow-md  p-4 pl-10 font-bold bg-${theme}`}
      >
        DASHBOARD
      </div>
      <div className=" flex flex-wrap justify-center gap-5  ">
        <div
          className={`place-content-center  rounded-xl p-5 shadow-md flex flex-wrap flex-2 flex-col gap-5 w-full max-w-lg max-h-64 bg-${theme}`}
        >
          <div className="flex flex-col w-2/5 ">
            <label className="text-xs ">Username</label>
            <p className="text-sm font-bold md:text-md">SMOOSH3R</p>
          </div>
          <div className="flex flex-col w-2/5">
            <label className="text-xs  ">Perlas</label>
            <p className="text-sm font-bold md:text-md">100,000</p>
          </div>
          <div className="flex flex-col w-2/5">
            <label className="text-xs  ">Gold</label>
            <p className="text-sm font-bold md:text-md">200,000</p>
          </div>
          <div className="flex flex-col w-2/5">
            <label className="text-xs  ">Date Registered</label>
            <p className="text-sm font-bold md:text-md">9-23-2001</p>
          </div>
          <div className="flex flex-col w-2/5">
            <label className="text-xs  ">Winrate</label>
            <p className="text-sm font-bold md:text-md">97.5%</p>
          </div>
          <div
            className="radial-progress text-blue-500 text-"
            style={{ "--size": "7rem", "--value": 95 }}
            role="progressbar"
          >
            70%
          </div>
        </div>
        <div
          className={`rounded-xl p-5 shadow-md flex flex-2 flex-col gap-5 w-full max-w-lg bg-${theme}`}
        >
          <AutoCarousel images={images} />
        </div>
        <div
          className={`rounded-xl p-5 shadow-md flex flex-2 flex-col gap-5 w-full max-w-lg bg-${theme}`}
        >
          <p className="text-sm font-bold">Leaderboard</p>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Username</th>
                  <th>Win Rate</th>
                  <th>Matches</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>2</th>
                  <td>Rori</td>
                  <td>98%</td>
                  <td>5,000</td>
                </tr>
                {/* row 2 */}

                <tr>
                  <th>3</th>
                  <td>Siopai</td>
                  <td>97%</td>
                  <td>500</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>1</th>
                  <td>SMOOSH3R</td>
                  <td>69%</td>
                  <td>1,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-2 flex-col gap-5 w-full max-w-lg ">
          <div
            className={`rounded-xl p-5 shadow-md flex flex-2 flex-col  w-full max-w-lg bg-${theme}`}
          >
            <p className="text-sm font-bold pb-2 w-14">Progress</p>
            <div className="flex flex-row">
              <p className="text-xs text-nowrap w-24 ">Deigo Silang </p>
              <progress
                className="progress progress-info my-2 mx-4 w-full"
                value={50}
                max="100"
              ></progress>
            </div>
            <div className="flex flex-row">
              <p className="text-xs text-nowrap w-20 ">Gabriela Silang </p>
              <progress
                className="progress progress-info my-2 mx-4 w-full"
                value={50}
                max="100"
              ></progress>
            </div>
          </div>
          <div className={`flex w-full flex-col h-52 rounded-xl p-4 shadow-md bg-${theme}`}>
            <p className="text-sm font-bold pb-2 w-14 text-nowrap">Unlocked Characters</p>
            <div className="flex w-full gap-2 max-w-full overflow-x-auto overflow-y-hidden pb-2">
              {characters &&
                characters.map((character, index) => (
                  <img className=" h-32 object-contain rounded-lg" src={character} />
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* <DBCard /> <DBCard /> <DBCard /> <DBCard /> */}
    </div>
  );
}

export default Dashboard;
