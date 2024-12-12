import React, { useContext } from "react";
import { ThemeContext } from "../../context/Theme";
import logo from "../../assets/logo1.png";
const BatchCard = ({ batch, handleSelectBatch }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  return (
    <button
      className={`card bg-${theme} rounded-lg w-full max-w-[22rem] h-[15rem] text-left cursor-pointer text-white`}
      onClick={() => {
        handleSelectBatch(batch);
      }}
    >
      <div className="card-header bg-blue-900 relative p-4 h-1/3 rounded-t-lg bg-cover bg-center w-full">
        <h1 className="subject-name text-wrap text-lg leading-7 font-semibold">{batch.bth_name}</h1>
        <h2 className="section text-xs ">
          {batch.acc_fname + " " + (batch.acc_mname ? batch.acc_mname + " " : "") + batch.acc_lname}
        </h2>
        <span className="material-icons teacher-icon absolute bottom-[-30px] right-8 text-gray-500 bg-gray-400 rounded-full w-16 h-16 flex items-center justify-center text-10">
          <img
            className="object-cover rounded-full w-full h-full border-2 border-gray-100"
            src={batch.acc_profile ? batch.acc_profile : logo}
          ></img>
        </span>
      </div>
      <div className="card-body h-[30%] flex flex-col "></div>
      <div
        className={`card-footer w-full border-t border-gray-300 h-1/4 flex justify-between items-center px-3 text-${theme == "night" ? "fantasy" : "night"}`}
      >
        <label className="text-bold text-xs">Batch Code:</label>
        <h2 className="section text-md ">{batch.bth_code}</h2>
      </div>
    </button>
  );
};

export default BatchCard;
