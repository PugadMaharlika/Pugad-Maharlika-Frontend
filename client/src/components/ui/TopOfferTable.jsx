import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/Theme";

export const TopOffer = ({ setSelected }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const Sampledata = [
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

  return (
    <div
      className={`flex col-span-8 overflow-hidden rounded-lg shadow-lg  text-xs md:text-md w-64 px-8 sm:w-full py-10 mb-5 ${
        theme === "night" ? "bg-night  text-white " : "bg-fantasy text-black"
      }`}
    >
      <div className="w-full">
        <div className="flex justify-center ">
          <table className="table-auto w-full text-center ">
            <thead>
              <tr>
                <th>Item</th>
                <th>Sold</th>
              </tr>
            </thead>
            <tbody>
              {Sampledata.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default TopOffer;
