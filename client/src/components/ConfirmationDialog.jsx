import React from "react";

const ConfirmationDialog = ({ theme, handleAction, id, message, buttonText }) => {
  return (
    <>
      <dialog
        id={id}
        className="modal backdrop-brightness-50 z-30 flex flex-grow w-screen place-self-center fixed  h-screen place-items-center "
      >
        <div
          className={`w-60 max-w-sm justify-center sm:w-full place-self-center p-8 mx-auto border border-gray-200 rounded-lg shadow  ${
            theme === "night" ? "bg-night text-white" : "bg-fantasy text-night"
          }`}
        >
          <h5 className="text-md w-full text-center space-y-4 font-medium mb-5 ">{message}</h5>

          <div className="flex flex-row gap-2">
            <button
              onClick={handleAction}
              type="button"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {buttonText}
            </button>
            <button
              onClick={() => {
                document.getElementById(id).close();
              }}
              type="button"
              className="w-full text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray    -300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ConfirmationDialog;
