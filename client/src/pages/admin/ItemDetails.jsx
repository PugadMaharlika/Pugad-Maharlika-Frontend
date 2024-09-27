import React from "react";
import ItemCard from "../../components/ui/ItemCard";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState } from "react";
import logo from "../../../src/assets/logo1.png";

export const ItemDetails = ({ setSelected, user }) => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div className="col-span-8 overflow-hidden rounded-lg text-xs md:text-md px-8 sm:w-full h-full">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold">Item Details</h1>
        <button
          id="btn_back_item_details"
          onClick={() => {
            setSelected("Items");
          }}
          className="rounded-lg px-4"
        >
          <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>
      </div>

      <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden w-full">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-contain m-2"
              src={logo}
              alt="Product"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Pinoy Pride
            </div>
            <p className="mt-2 text-gray-600">Product Description</p>
            <p className="mt-2 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              praesentium quas minus architecto? Vero sapiente iusto mollitia
            </p>
            <div className="mt-4">
              <span className="text-gray-600">Price: 250</span>
            </div>
            <div className="mt-4">
              <span className="text-gray-600">Status: Released</span>
            </div>
            <div className="mt-4">
              <span className="text-gray-600">Date Created: 2022-01-01</span>
            </div>
            <div className="mt-4">
              <span className="text-gray-600">Date Updated: 2022-01-15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
