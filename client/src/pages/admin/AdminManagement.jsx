import React, { useContext } from "react";
import LineChart from "../../components/ui/LineChart";
import DataTable from "../../components/ui/DataTable";
import { ThemeContext } from "../../context/Theme";

const values = [
  ["Month", ""],
  ["January", 500],
  ["February", 436],
  ["March", 846],
  ["April", 245],
  ["May", 500],
  ["June", 475],
  ["July", 500],
  ["August", 500],
  ["September", 500],
  ["October", 1250],
  ["November", 1250],
  ["December", 1250],
];

const accvalues = [
  { id: 1, username: "OhMama", email: "johny@gmail.com", date: "28 Jan, 12:30 AM", status: "Active" },
  { id: 2, username: "OhMuscle", email: "masku@gmail.com", date: "25 Jan, 10:40 PM", status: "Active" },
  { id: 3, username: "Alahooooo!", email: "abdul@gmail.com", date: "20 Jan, 10:40 PM", status: "Disabled" },
  { id: 4, username: "Lalalala", email: "wsmith@gmail.com", date: "15 Jan, 03:29 PM", status: "Disabled" },
  { id: 5, username: "Yeaaaahh!", email: "ESing@gmail.com", date: "14 Jan, 10:40 PM", status: "Active" },
  { id: 6, username: "sHANE", email: "johny@gmail.com", date: "28 Jan, 12:30 AM", status: "Active" },
  { id: 7, username: "ODWA", email: "masku@gmail.com", date: "25 Jan, 10:40 PM", status: "Active" },
  { id: 8, username: "lOWI!", email: "abdul@gmail.com", date: "20 Jan, 10:40 PM", status: "Disabled" },
  { id: 9, username: "Lalalala", email: "wsmith@gmail.com", date: "15 Jan, 03:29 PM", status: "Disabled" },
  { id: 10, username: "Yeaaaahh!", email: "ESing@gmail.com", date: "14 Jan, 10:40 PM", status: "Active" },
];

const title = "Recent";
const htitle = "Months";
const vtitle = "Admin Accounts";

export const AdminManagement = ({ setSelected }) => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div className={`col-span-8 overflow-hidden rounded-lg text-xs md:text-md w-64 px-8 sm:w-full`}>
      <div className="pt-4">
        {/* Line chart */}
        <LineChart values={values} title={title} htitle={htitle} vtitle={vtitle} />

        {/* Admin Accounts Title and Add Account Button */}
        <div className="flex justify-between items-center my-4 ">
          <h1 className="text-2xl font-semibold">Admin Accounts</h1>
          <button id="add-account"
            onClick={() => { setSelected("AddAdminAccount"); }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 sm:px-4 sm:py-2 rounded text-xs sm:text-sm md:text-md"
          >
            + Add Account
          </button>
        </div>

        {/* DataTable */}
        <DataTable setSelected={setSelected} accvalues={accvalues} />
      </div>
    </div>
  );
};
