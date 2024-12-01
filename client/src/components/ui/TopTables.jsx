import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/Theme";

export const TopItem = ({ column, topItem }) => {
  const [theme, setTheme] = useContext(ThemeContext);

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
                <th>{column.column1}</th>
                <th>{column.column2}</th>
                <th>{column.column3}</th>
              </tr>
            </thead>
            <tbody>
              {topItem &&
                topItem.map((topItems) => (
                  <tr key={topItems.id}>
                    <td className="px-4 py-2">{topItems.item_name}</td>
                    <td className="px-4 py-2">{topItems.unit_sold}</td>
                    <td className="px-4 py-2">
                      {new Date(topItems.date_created).toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopItem;
