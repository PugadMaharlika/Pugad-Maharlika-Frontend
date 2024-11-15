import React from "react";

import diegoloading from "../../src/assets/diegoloadingscreen.gif";
import gabrielaloading from "../../src/assets/gabrielaloadingscreen.gif";

const LoadingSpinner = ({ theme, id, message, handleAction }) => {
  return (
    <dialog
      id={id}
      className="modal backdrop-brightness-50 z-30 flex flex-grow w-screen place-self-center fixed  h-screen place-items-center "
    >
      <div
        className={`w-60 max-w-sm justify-center flex flex-col sm:w-full place-self-center p-8 mx-auto border border-gray-200 rounded-lg shadow  ${
          theme === "night" ? "bg-night text-white" : "bg-fantasy text-night"
        }`}
      >
        <div className="place-self-center flex h-32 w-32 ">
          <img
            src={gabrielaloading}
            alt="Loading..."
            className="w-32 h-32 mx-auto"
          />
        </div>
        <p className="mt-6 text-xl font-semibold">{message}</p>
        <button
          type="button"
          onClick={() => {
            handleAction();
            document.getElementById(id).close();
          }}
          className="w-full mt-7 text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray    -300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Cancel
        </button>
      </div>
    </dialog>
  );
};

export default LoadingSpinner;
