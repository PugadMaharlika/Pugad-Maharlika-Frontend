import { React, useState } from "react";
import policy from "../assets/policy.txt";

function Cookie({ handleCoookie, theme }) {
  return (
    <section
      className={`z-30 fixed max-w-sm p-4 border right-0 mx-auto bottom-16 rounded-2xl ${
        theme === "night"
          ? "bg-gray-800  text-white border-gray-200"
          : "border-gray-400 bg-white text-gray-800"
      }`}
    >
      <h2 className="font-semibold ">🍪 Cookie Consent</h2>

      <p className="mt-4 text-sm ">
        We use cookies to ensure that we give you the best experience on our
        website.{" "}
        <a href={policy} download className="text-blue-500 hover:underline">
          Read cookies policies
        </a>
        .{" "}
      </p>

      <div className="flex items-center justify-between mt-4 gap-x-4 shrink-0">
        <div></div>

        <button
          onClick={handleCoookie}
          className=" text-xs bg-gray-900 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none"
        >
          Accept
        </button>
      </div>
    </section>
  );
}

export default Cookie;
