import React from "react";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState } from "react";

export const UpdateOffer = ({ setSelected }) => {
  const [image, setImage] = useState(null);
  const [theme] = useContext(ThemeContext);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <>
      <div className="col-span-8 overflow-hidden rounded-lg text-xs md:text-md w-64 px-8 sm:w-full h-full">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-3xl font-bold">Update Offer</h1>
          <button
            id="btn_back"
            onClick={() => {
              setSelected("Offer");
            }}
            className=" hover:text-blue-700 font-bold px-4 rounded"
          >
            <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
          </button>
        </div>

        <div className="flex bg-white items-center w-full p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-5 w-1/3">
            <div className="relative">
              <img
                src={
                  image ||
                  "https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-10639.jpg?w=740"
                }
                alt="Uploaded"
                className="mt-4 w-40 h-40 object-cover rounded-lg"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <p className="mt-2 text-gray-600">Click to upload a new image</p>
          </div>

          <div className="w-2/3">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 rounded-lg mb-4 border border-gray-300 focus:border-green-500"
            />
            <input
              type="number"
              placeholder="Value"
              className="w-full p-2 rounded-lg mb-4 border border-gray-300 focus:border-green-500"
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full p-2 rounded-lg mb-4 border border-gray-300 focus:border-green-500"
            />
            <textarea
              placeholder="Details"
              className="w-full p-2 rounded-lg mb-4 border border-gray-300 focus:border-green-500"
            ></textarea>

            <div className="flex w-full justify-end">
              <button
                onClick={() => {
                  setSelected("Offer");
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                Update
              </button>

              <div className="ml-2">
                <button className="hover:bg-red-700   bg-red-500 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ">
                  <i class="fa-solid fa-trash mr-2"></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
