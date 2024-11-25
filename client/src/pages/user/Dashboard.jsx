import React, { useEffect, useState, useContext } from "react";
import DBCard from "../../components/ui/DBCard";
import AutoCarousel from "../../components/ui/AutoCarousel";
import useAuthCheck from "../../hooks/useAuthCheck";
import { UserContext } from "../../context/User";
import { ThemeContext } from "../../context/Theme";
import API from "../../service/API";
import logo from "../../assets/logo1.png";
import offer1 from "../../assets/offers/1.png";
import offer2 from "../../assets/offers/2.png";
import offer3 from "../../assets/offers/3.png";
import offer4 from "../../assets/offers/4.png";
import offer5 from "../../assets/offers/5.png";
import offer6 from "../../assets/offers/6.png";

import gabriela from "../../assets/characters/default_gabriela.png";
import diego from "../../assets/characters/default_diego.png";
import archer from "../../assets/characters/default_archer.png";
import elite from "../../assets/characters/default_elite.png";
import follower from "../../assets/characters/default_follower.png";
import manuel from "../../assets/characters/default_manuel.png";
import miguel from "../../assets/characters/default_miguel.png";
import pedro from "../../assets/characters/default_pedro.png";
import spaniard from "../../assets/characters/default_spaniard.png";

import diegoMaharlika from "../../assets/characters/diego_pinoy.png";
import gabrielaMaharlika from "../../assets/characters/gabriela_pinoy.png";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function Dashboard({ setSelected }) {
  useAuthCheck();
  const [theme, setTheme] = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const images = [offer1, offer2, offer3, offer4, offer5, offer6];
  const [user, setUser] = useContext(UserContext);
  const [leaderboard, setLeaderboard] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [skins, setSkins] = useState([]);
  const [displayCharacter, setDisplayCharacter] = useState(true);

  const all_characters = {
    "Diego Silang": diego,
    "Gabriela Silang": gabriela,
    "Tinguan Warrior": archer,
    "Becbec Follower": follower,
    "Filipino Elites": elite,
    "Manuel Urrutia": manuel,
    "Miguel Vicos": miguel,
    "Pedro Becbec": pedro,
    Spaniards: spaniard,
  };

  const all_skins = {
    "Diego Silang - Maharlika": diegoMaharlika,
    "Gabriela Silang - Maharlika": gabrielaMaharlika,
  };
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
          setLeaderboard(res.data.leaderboard);
          const char_names = res.data.account.progress.characters.map(
            (obj) => Object.values(obj)[0]
          );
          setCharacters(char_names);
          setSkins(res.data.account.progress.skins);
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
    <div className="h-full w-full flex flex-col flex-grow xs:mr-20 gap-5">
      <div
        className={`flex w-full flex-col sm:flex-row justify-between items-center rounded-xl h-16 shadow-md  p-4 pl-10 font-bold bg-${theme}`}
      >
        DASHBOARD
      </div>
      {/* <div className={` flex flex-wrap justify-center gap-5 ${loading && ""} `}></div> */}
      <div className={`flex flex-wrap justify-center gap-5 ${loading && "hidden"} `}>
        <div
          className={`place-content-center  rounded-xl p-5 shadow-md flex flex-wrap flex-2 flex-row sm:flex-col  gap-5 w-full max-w-md xl:max-w-lg max-h-64 bg-${theme}`}
        >
          <div className="flex flex-col w-2/5 ">
            <label className="text-xs ">Username</label>
            <p className="text-sm font-bold md:text-md">{user && user.username}</p>
          </div>
          <div className="flex flex-col w-2/5">
            <label className="text-xs  ">Perlas</label>
            <p className="text-sm font-bold md:text-md">{user && user.balance}</p>
          </div>
          {console.log(user)}
          <div className="flex flex-col w-2/5">
            <label className="text-xs  ">Gold</label>
            <p className="text-sm font-bold md:text-md">{user && user.gold}</p>
          </div>
          <div className="flex flex-col w-2/5">
            <label className="text-xs  ">Date Registered</label>
            <p className="text-sm font-bold md:text-md">
              {user && new Date(user.dateCreated).toDateString()}
            </p>
          </div>
          <div className="flex flex-col w-2/5">
            <label className="text-xs  ">Winrate</label>
            <p className="text-sm font-bold md:text-md">&nbsp;</p>
          </div>
          <div
            className="radial-progress text-blue-500"
            style={{
              "--size": "5rem",
              "--value": `${user && user.winrate ? user.winrate : 0}`,
            }}
            role="progressbar"
          >
            {user && user.winrate ? Math.trunc(user.winrate) : 0}%
          </div>
        </div>
        <div
          className={`rounded-xl place-items-center p-2 shadow-md flex flex-2 flex-col gap-5 w-full max-w-md max-h-64 bg-${theme}`}
        >
          <AutoCarousel images={images} setSelected={setSelected} />
        </div>
        <div
          className={`rounded-xl p-5 shadow-md flex flex-2 flex-col gap-5 w-full max-w-md xl2:max-w-lg  bg-${theme}`}
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
                {leaderboard &&
                  leaderboard.map((row, index) => {
                    if (row.win_rate)
                      return (
                        <tr key={index + 1}>
                          <th>{index + 1}</th>
                          <td>{row.acc_username}</td>
                          <td>{row.win_rate}%</td>
                          <td>{row.matches}</td>
                        </tr>
                      );
                  })}
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
                value={user.progress && (user.progress.stories.story1.completed / 6) * 100}
                max="100"
              ></progress>
            </div>
            <div className="flex flex-row">
              <p className="text-xs text-nowrap w-20 ">Gabriela Silang </p>
              <progress
                className="progress progress-info my-2 mx-4 w-full"
                value={user.progress && (user.progress.stories.story2.completed / 6) * 100}
                max="100"
              ></progress>
            </div>
          </div>
          <div className={`flex w-full flex-col h-52 `}>
            <div className="flex flex-row gap-1 mb-2 ">
              <button
                onClick={() => {
                  setDisplayCharacter(true);
                }}
                className={`text-sm font-bold text-nowrap rounded-lg w-32 h-10 ${displayCharacter && "bg-blue-500 text-white"}`}
              >
                <i class="fa-solid fa-person"></i> Characters
              </button>
              <button
                onClick={() => {
                  setDisplayCharacter(false);
                }}
                className={`text-sm font-bold text-nowrap rounded-lg w-32 h-10  ${!displayCharacter && "bg-blue-500 text-white"}`}
              >
                <i className="fa-solid fa-hat-wizard"></i> Skins
              </button>
            </div>
            <div
              className={`flex w-full gap-2 max-w-full min-h-40 overflow-x-auto rounded-xl p-4 shadow-md overflow-y-hidden pb-2 bg-${theme}`}
            >
              {displayCharacter &&
                characters &&
                characters.map((character, index) => (
                  <img
                    className=" h-32 object-contain rounded-lg"
                    src={all_characters[character]}
                  />
                ))}
              {!displayCharacter &&
                skins &&
                skins.map((skin, index) => (
                  <img className=" h-32 object-contain rounded-lg" src={all_skins[skin]} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
