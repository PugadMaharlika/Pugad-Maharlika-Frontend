import React, { useEffect } from "react";

function Alert({ success, index, error, errors, setErrors, theme }) {
  if (success) {
    return (
      <div
        key={index}
        id="alert"
        className={`flex items-center p-4 rounded-lg ${
          theme === "night"
            ? "bg-gray-800 text-green-400"
            : "bg-green-100 text-green-800"
        }`}
        role="alert"
      >
        <i className="fa-regular fa-circle-check"></i>
        <span className="sr-only mr-10">Error</span>
        <div className="ms-3 text-sm text-wrap font-medium">{error}.</div>
        <button
          onClick={() => {
            const updatedErrors = [...errors];
            updatedErrors.splice(index, 1);
            setErrors(updatedErrors);
          }}
          type="button"
          className={`ms-auto -mx-1.5 -my-1.5   rounded-lg focus:ring-2 focus:ring-green-400 p-1.5  inline-flex items-center justify-center h-8 w-8 ${
            theme === "night"
              ? "bg-gray-800 hover:bg-green-700 text-green-400"
              : "bg-green-100 hover:bg-green-200 text-green-800"
          } `}
        >
          <span className="sr-only">Close</span>
          <i className="fa-solid fa-x"></i>
        </button>
      </div>
    );
  }
  return (
    <div
      key={index}
      className={`flex items-center p-4 rounded-lg  text-red-400 ${
        theme === "night"
          ? "bg-gray-800 text-red-400"
          : "bg-red-100 text-red-800"
      }`}
      role="alert"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="sr-only mr-10">Error</span>
      <div className="ms-3 text-sm text-wrap font-medium">{error}.</div>
      <button
        onClick={() => {
          const updatedErrors = [...errors];
          updatedErrors.splice(index, 1);
          setErrors(updatedErrors);
        }}
        type="button"
        className={`ms-auto -mx-1.5 -my-1.5  text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5  inline-flex items-center justify-center h-8 w-8  ${
          !success && theme === "night"
            ? "bg-gray-800 hover:bg-gray-700"
            : "bg-red-100 hover:bg-red-200"
        }`}
      >
        <span className="sr-only">Close</span>
        <i className="fa-solid fa-x"></i>
      </button>
    </div>
  );
}

export default Alert;
