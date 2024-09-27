import React from "react";
import ItemCard from "../../components/ui/ItemCard";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState } from "react";

export const AddItem = ({ setSelected }) => {
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
          <h1 className="text-3xl font-bold">Add Item</h1>
          <button
            id="btn_back"
            onClick={() => {
              setSelected("Items");
            }}
            className="rounded-lg px-4"
          >
            <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
          </button>
        </div>

        <div className="flex bg-white items-center justify-center w-full p-8 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div>
              {image && <img src={image} alt="Uploaded" className="mt-4" />}
            </div>
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full border border-gray-300 p-2 rounded-lg mb-4"
              />
              <input
                type="number"
                placeholder="Value"
                className="w-full border border-gray-300 p-2 rounded-lg mb-4"
              />
              <select className="w-full border border-gray-300 p-2 rounded-lg mb-4">
                <option value="" disabled selected>
                  Item Type
                </option>
                <option value="Skin">Skin</option>
              </select>
              <textarea
                placeholder="Details"
                className="w-full border border-gray-300 p-2 rounded-lg mb-4"
              ></textarea>
              <div className="mb-5">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="flex w-full justify-end">
                <button className="bg-green-500 px-6 py-2 text-white rounded-lg">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItem;
