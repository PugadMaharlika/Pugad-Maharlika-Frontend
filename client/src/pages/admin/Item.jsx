import React from "react";
import ItemCard from "../../components/ui/ItemCard";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState } from "react";

export const Item = ({ setSelected, user }) => {
  const [theme] = useContext(ThemeContext);

  return (
    <div className="col-span-8 overflow-hidden rounded-lg text-xs md:text-md w-64 px-8 sm:w-full h-full">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold">Items</h1>
        <button
          id="btn_add_item"
          onClick={() => {
            setSelected("AddItem");
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>
      <div className="flex flex-wrap overflow-y-auto h-auto">
        <div className="flex flex-wrap w-full">
          <ItemCard setSelected={setSelected} user={user} />
        </div>
      </div>
    </div>
  );
};
