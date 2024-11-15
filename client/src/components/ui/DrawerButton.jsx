import React from "react";

function DrawerButton({ icon, theme, selected, sideBarOpen, title, handleSelectedButton }) {
  return (
    <button
      id={`btn_drawer_${title}`}
      onClick={() => {
        handleSelectedButton(title);
      }}
      tabIndex="0"
      className={`flex  justify-start flex-grow  p-3 rounded-lg max-h-10 text-center  leading-tight transition-all btn ${
        selected === title && theme === "night"
          ? "btn-outline border-gray-400 bg-blue-900 text-white "
          : "border-none bg-base-100"
      }} ${
        selected === title && theme === "fantasy"
          ? "btn-outline border-gray-400 bg-gray-1  text-white bg-night"
          : "border-none  bg-base-100"
      }`}
    >
      <div className="grid gap-3 grid-flow-col justify-center text-md items-start lg:text-lg">
        <div className="mx-auto p-1 pt-0">{icon}</div>

        {sideBarOpen ? title : ""}
      </div>
    </button>
  );
}

export default DrawerButton;
