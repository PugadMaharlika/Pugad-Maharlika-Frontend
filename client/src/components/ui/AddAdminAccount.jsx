import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/Theme";

export const AddAdminAccount = ({ setSelected }) => {
const [theme, setTheme] = useContext(ThemeContext)
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg flex shadow-lg relative">
        <button onClick={ ()=> {setSelected("Admin")}} className="absolute top-4 left-4 text-black hover:text-gray-600">
          <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Add Admin Account</h2>
          <input type="text" placeholder="Username" className="w-full mb-4 p-2 rounded-lg border border-gray-300" />
          <input type="email" placeholder="Email" className="w-full mb-4 p-2 rounded-lg border border-gray-300" />
          <input type="password" placeholder="Password" className="w-full mb-4 p-2 rounded-lg border border-gray-300" />
          <input type="password" placeholder="Confirm Password" className="w-full mb-4 p-2 rounded-lg border border-gray-300" />
          <div className="flex justify-between">
            <button className="rounded-lg bg-green-500 text-white px-4 py-2 hover:bg-green-600">Add Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
