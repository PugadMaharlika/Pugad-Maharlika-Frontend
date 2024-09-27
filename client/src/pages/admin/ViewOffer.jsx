import React from "react";

export const ViewOffer = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex justify-between w-full px-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </button>
      </div>
      <div className="flex items-center mt-5">
        <img
          src="https://source.unsplash.com/random"
          alt="Item"
          className="w-1/2"
        />
        <div className="ml-5">
          <h2 className="text-2xl font-bold">Item Title</h2>
          <p className="text-gray-600 mt-2">Price: $100</p>
          <p className="text-gray-600">
            Description: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </p>
          <p className="text-gray-600">Date Created: 01/01/2022</p>
          <p className="text-gray-600">Date Updated: 01/02/2022</p>
        </div>
        <div className="flex w-full justify-end">
          {user.role != "P" && (
            <button
              id="btn_EditNotification"
              onClick={() => {
                setSelected("EditNotification");
              }}
              className="hover:bg-green-700   bg-green-500 text-white rounded-lg px-4 py-2 mt-4 "
            >
              <i class="fa-solid fa-pen mr-2"></i>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
