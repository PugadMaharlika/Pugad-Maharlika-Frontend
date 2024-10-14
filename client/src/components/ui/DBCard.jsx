import React from "react";

const DBCard = ({ theme, title, number, icon }) => {
  return (
    <div
      className={` rounded-lg shadow-lg h-36 w-full max-w-56 flex flex-col gap-3 py-5 px-10  bg-${theme}`}
    >
      <p className="font-bold text-md text-left opacity-50 w-full"> {title}</p>
      <div className="flex flex-full gap-6">
        <p className="text-4xl text-left "> {icon}</p>
        <p className="text-4xl text-left "> {number}</p>
      </div>
    </div>
  );
};

export default DBCard;
