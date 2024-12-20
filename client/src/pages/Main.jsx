import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import DrawerButton from "../components/ui/DrawerButton";
import logo from "../assets/logo1.png";
import ConfirmationDialog from "../components/ConfirmationDialog";
import Dashboard from "./user/Dashboard";
import Profile from "./user/Profile";
import { UserContext } from "../context/User";
import { AlertsContext } from "../context/Alerts";
import { SuccessContext } from "../context/Success";
import Alert from "../components/ui/Alert";
import useInactivityTimeout from "../hooks/useInactivityTimeout ";
import axios from "axios";
import { Notification } from "./admin/Notification";
import { AddNotification } from "./admin/AddNotification";
import { ViewNotification } from "./admin/ViewNotification";
import { EditNotification } from "./admin/EditNotification";
import { Item } from "./admin/Item";
import { Transactions } from "../pages/admin/Transactions";
import { Receipt } from "../pages/admin/Receipt";
import { Reports } from "../pages/admin/Reports";
import { FeedBackDetails } from "../pages/admin/FeedBackDetails";
import AddItem from "./admin/AddItem";
import ItemDetails from "./admin/ItemDetails";
import UpdateItem from "./admin/UpdateItem";
import { Offer } from "./admin/Offer";
import { ViewOffer } from "./admin/ViewOffer";
import { AddOffer } from "./admin/AddOffer";
import { UpdateOffer } from "./admin/UpdateOffer";
import NotificationTable from "../components/ui/NotificationTable";
import AdminDashboard from "./admin/AdminDashboard";
import { AdminManagement } from "./admin/AdminManagement";
import { AddAdminAccount } from "./admin/AddAdminAccount";
import { AdminAccount } from "./admin/AdminAccount";
import PlayerManagement from "./admin/PlayerManagement";
import PlayerAccount from "./admin/PlayerAccount";
import SalesAndRevenueChart from "./admin/SalesAndRevenueChart";
import UserLogsChart from "./admin/UserLogsChart";
import useAuthCheck from "../hooks/useAuthCheck";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function Main({ theme, toggleTheme }) {
  const [selected, setSelected] = useState("Dashboard");
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [user, setUser] = useContext(UserContext);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const [notificationselected, setNotificationselected] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [offerselected, setOfferselected] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [transactionSelected, setTransactionSelected] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [selectedadmin, setSelectedAdmin] = useState(null);
  const [selectedplayer, setSelectedPlayer] = useState(null);
  const [selectedFeedback, setselectedfeedbackID] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  useAuthCheck();
  const navigate = useNavigate();

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };
  const handleSelectedButton = (title) => {
    setSelected(title);
  };

  const handlePutRequest = async (route, data, success) => {
    axios
      .put(`${serverUrl}${route}`, data, {
        headers: {
          "x-auth-token": authToken,
          "x-refresh-token": refreshToken,
        },
      })
      .then((response) => {
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        setSuccess(true);
        setErrors([success]);
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
      });
  };

  const handleLogout = async () => {
    await handlePutRequest("/auth/logout", {}, "Logout Successful");
  };

  const displayUserNav = () => {
    return (
      <>
        <DrawerButton
          icon={<i className="fa-solid fa-house-chimney"></i>}
          selected={selected}
          theme={theme}
          sideBarOpen={sideBarOpen}
          title={"Dashboard"}
          handleSelectedButton={handleSelectedButton}
        />
        <DrawerButton
          icon={<i className="fa-solid fa-sack-dollar pl-0.5 md-pl-0"></i>}
          selected={selected}
          theme={theme}
          sideBarOpen={sideBarOpen}
          title={"Offer"}
          handleSelectedButton={handleSelectedButton}
        />
        <DrawerButton
          icon={<i className="fa-solid fa-bell pl-0.5 md-pl-0"></i>}
          selected={selected}
          theme={theme}
          sideBarOpen={sideBarOpen}
          title={"Notification"}
          handleSelectedButton={handleSelectedButton}
        />
        <DrawerButton
          icon={<i className="fa-solid fa-file-lines pl-0.5 md-pl-0"></i>}
          selected={selected}
          theme={theme}
          sideBarOpen={sideBarOpen}
          title={"Transactions"}
          handleSelectedButton={handleSelectedButton}
        />
        <DrawerButton
          icon={<i className="fa-solid fa-user pl-0.5 md-pl-0"></i>}
          selected={selected}
          theme={theme}
          sideBarOpen={sideBarOpen}
          title={"Profile"}
          handleSelectedButton={handleSelectedButton}
        />

        <DrawerButton
          icon={
            theme === "night" ? (
              <i className="fa-solid fa-cloud-moon"></i>
            ) : (
              <i className="fa-solid fa-cloud-sun"></i>
            )
          }
          selected={selected}
          theme={theme}
          sideBarOpen={sideBarOpen}
          title={"Mode"}
          handleSelectedButton={() => {
            toggleTheme();
          }}
        />
      </>
    );
  };
  const displaySuperAdminNav = () => {
    return (
      <>
        <DrawerButton
          icon={<i className="fa-solid fa-user-tie"></i>}
          selected={selected}
          theme={theme}
          sideBarOpen={sideBarOpen}
          title={"Admin"}
          handleSelectedButton={handleSelectedButton}
        />
      </>
    );
  };

  const displayAdminNav = () => {
    return (
      <>
        <DrawerButton
          icon={<i className="fa-solid fa-house-chimney pl-0.5 md-pl-0"></i>}
          selected={selected}
          theme={theme}
          sideBarOpen={sideBarOpen}
          title={"Dashboard"}
          handleSelectedButton={handleSelectedButton}
        />
        {user && user.role === "S" && displaySuperAdminNav()}
        <DrawerButton
          icon={<i className="fa-solid fa-users pl-0.5 md-pl-0"></i>}
          selected={selected}
          theme={theme}
          sideBarOpen={sideBarOpen}
          title={"Player"}
          handleSelectedButton={handleSelectedButton}
        />
        <DrawerButton
          icon={<i className="fa-solid fa-hat-wizard pl-0.5 md-pl-0"></i>}
          selected={selected}
          theme={theme}
          sideBarOpen={sideBarOpen}
          title={"Items"}
          handleSelectedButton={handleSelectedButton}
        />
        <DrawerButton
          icon={<i className="fa-solid fa-sack-dollar pl-0.5 md-pl-0"></i>}
          selected={selected}
          theme={theme}
          sideBarOpen={sideBarOpen}
          title={"Offer"}
          handleSelectedButton={handleSelectedButton}
        />
        <DrawerButton
          icon={<i className="fa-solid fa-bell pl-0.5 md-pl-0"></i>}
          selected={selected}
          theme={theme}
          sideBarOpen={sideBarOpen}
          title={"Notification"}
          handleSelectedButton={handleSelectedButton}
        />
        <DrawerButton
          icon={<i className="fa-solid fa-file-lines pl-0.5 md-pl-0"></i>}
          selected={selected}
          theme={theme}
          sideBarOpen={sideBarOpen}
          title={"Transactions"}
          handleSelectedButton={handleSelectedButton}
        />
        <DrawerButton
          icon={<i className="fa-solid fa-flag pl-0.5 md-pl-0"></i>}
          selected={selected}
          theme={theme}
          sideBarOpen={sideBarOpen}
          title={"Reports"}
          handleSelectedButton={handleSelectedButton}
        />
        <DrawerButton
          icon={<i className="fa-solid fa-user pl-0.5 md-pl-0"></i>}
          selected={selected}
          theme={theme}
          sideBarOpen={sideBarOpen}
          title={"Profile"}
          handleSelectedButton={handleSelectedButton}
        />
        <DrawerButton
          icon={
            theme === "night" ? (
              <i className="fa-solid fa-cloud-moon"></i>
            ) : (
              <i className="fa-solid fa-cloud-sun"></i>
            )
          }
          selected={selected}
          theme={theme}
          sideBarOpen={sideBarOpen}
          title={"Mode"}
          handleSelectedButton={() => {
            toggleTheme();
          }}
        />
      </>
    );
  };

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setSideBarOpen(false);
      setIsMobile(true);
    }
  }, []);

  useInactivityTimeout(handleLogout);

  return !user ? (
    <></>
  ) : (
    <>
      {/* Logout Dialog */}
      <ConfirmationDialog
        theme={theme}
        handleAction={() => {
          handleLogout();
        }}
        id={"logout_dialog"}
        message={"Confirm Logout?"}
        buttonText={"Logout"}
      />
      {/* Main Content */}
      <div className={`flex flex-row w-screen overflow-x-hidden`}>
        {/* Drawer */}
        <div
          className={`relative flex-1 h-svh flex-col bg-base-100 border-r-2 border-transparent text-fantasy  w-full max-w-[20rem] max-h-svh p-2 md:p-4 shadow-xl shadow-blue-gray-900/5 ${
            sideBarOpen ? "flex min-w-[240px]" : isMobile ? "hidden" : "w-20 flex"
          }`}
        >
          <div className="mb-2 px-2 py-4">
            <h5
              className={`flex gap-2 antialiased tracking-normal font-sans text-lg font-semibold leading-snug ${
                theme === "night" ? "text-fantasy " : "text-night "
              }`}
            >
              <img
                className="h-7 w-7 btn-square bg-contain  "
                alt="Pugad Maharlika Icon"
                src={logo}
              />
              {sideBarOpen ? "Pugad Maharlika" : ""}
            </h5>
          </div>
          {/* DRAWER */}
          <nav
            className={`flex flex-col mb-5 ${
              sideBarOpen ? "overflow-y-auto" : "overflow-hidden"
            } gap-1 p-0 `}
          >
            {user && user.role === "P" ? displayUserNav() : displayAdminNav()}
          </nav>
          <div className="flex-grow"></div>
          <DrawerButton
            icon={<i className="fa-solid fa-right-from-bracket"></i>}
            selected={selected}
            theme={theme}
            sideBarOpen={sideBarOpen}
            title={"Logout"}
            handleSelectedButton={() => {
              document.getElementById("logout_dialog").show();
            }}
          />
        </div>
        {/* NavigationBar */}
        <div className="flex flex-col rounded-lg h-svh w-svw">
          <NavBar
            theme={theme}
            toggleTheme={toggleTheme}
            setSelected={setSelected}
            toggleSideBar={toggleSideBar}
          />
          <div
            className={`relative  flex-2 flex-grow overflow-auto max-h-full ${
              theme === "night" ? "bg-space" : "bg-gray-200"
            }`}
          >
            <div className={`flex-grow flex justify-center m-3 pb-10 border-solid`}>
              {/* Content */}
              {selected === "Dashboard" && user.role != "P" && <AdminDashboard theme={theme} />}
              {selected === "Dashboard" && user.role === "P" && (
                <Dashboard setSelected={setSelected} theme={theme} />
              )}
              {selected === "Profile" && <Profile theme={theme} />}
              {selected === "Offer" && (
                <Offer
                  theme={theme}
                  setSelected={setSelected}
                  user={user}
                  setOfferselected={setOfferselected}
                />
              )}
              {selected === "Admin" && user.role === "S" && (
                <AdminManagement
                  theme={theme}
                  setSelectedAdmin={setSelectedAdmin}
                  setSelected={setSelected}
                />
              )}
              {selected === "AddAdminAccount" && user.role === "S" && (
                <AddAdminAccount theme={theme} setSelected={setSelected} />
              )}
              {selected === "AdminAccount" && user.role === "S" && (
                <AdminAccount
                  theme={theme}
                  selectedadmin={selectedadmin}
                  setSelected={setSelected}
                />
              )}
              {selected === "SalesAndRevenueChart" && user.role !== "P" && (
                <SalesAndRevenueChart theme={theme} />
              )}
              {selected === "UserLogsChart" && user.role !== "P" && <UserLogsChart theme={theme} />}
              {selected === "Player" && user.role !== "P" && (
                <PlayerManagement
                  theme={theme}
                  setSelected={setSelected}
                  setSelectedPlayer={setSelectedPlayer}
                />
              )}
              {selected === "PlayerAccount" && user.role !== "P" && (
                <PlayerAccount
                  theme={theme}
                  setSelected={setSelected}
                  selectedplayer={selectedplayer}
                />
              )}
              {selected === "AddOffer" && <AddOffer theme={theme} setSelected={setSelected} />}
              {selected === "ViewOffer" && (
                <ViewOffer
                  theme={theme}
                  setSelected={setSelected}
                  user={user}
                  setOfferselected={setOfferselected}
                  offerselected={offerselected}
                />
              )}
              {selected === "UpdateOffer" && (
                <UpdateOffer
                  theme={theme}
                  setSelected={setSelected}
                  user={user}
                  setOfferselected={setOfferselected}
                  offerselected={offerselected}
                />
              )}
              {selected === "Notification" && (
                <Notification
                  theme={theme}
                  setSelected={setSelected}
                  user={user}
                  setNotificationselected={setNotificationselected}
                />
              )}
              {selected === "AddNotification" && (
                <AddNotification theme={theme} setSelected={setSelected} />
              )}

              {selected === "ViewNotification" && (
                <ViewNotification
                  theme={theme}
                  setSelected={setSelected}
                  user={user}
                  setNotificationselected={setNotificationselected}
                  notificationselected={notificationselected}
                />
              )}
              {selected === "NotificationTable" && (
                <NotificationTable
                  setSelected={setSelected}
                  setNotificationselected={setNotificationselected}
                />
              )}
              {selected === "EditNotification" && (
                <EditNotification
                  theme={theme}
                  setSelected={setSelected}
                  user={user}
                  setNotificationselected={setNotificationselected}
                  notificationselected={notificationselected}
                />
              )}
              {selected === "Items" && (
                <Item
                  user={user}
                  theme={theme}
                  setSelected={setSelected}
                  setSelectedItem={setSelectedItem}
                />
              )}
              {selected === "AddItem" && <AddItem theme={theme} setSelected={setSelected} />}
              {selected === "ItemDetails" && (
                <ItemDetails theme={theme} setSelected={setSelected} selectedItem={selectedItem} />
              )}
              {selected === "UpdateItem" && (
                <UpdateItem theme={theme} setSelected={setSelected} selectedItem={selectedItem} />
              )}
              {selected === "Transactions" && (
                <Transactions
                  theme={theme}
                  setSelected={setSelected}
                  transactions={transactions}
                  setTransactionSelected={setTransactionSelected}
                />
              )}
              {selected === "Receipt" && (
                <Receipt
                  theme={theme}
                  setSelected={setSelected}
                  transactions={transactions}
                  transactionSelected={transactionSelected}
                />
              )}
              {selected === "Reports" && (
                <Reports
                  theme={theme}
                  setSelected={setSelected}
                  setselectedfeedbackID={setselectedfeedbackID}
                />
              )}
              {selected === "FeedBackDetails" && (
                <FeedBackDetails
                  theme={theme}
                  setSelected={setSelected}
                  selectedFeedback={selectedFeedback}
                />
              )}
            </div>
          </div>
        </div>
        {/* Alert container */}
        <div className="fixed z-40 bottom-5 right-2 md:right-3 lg:right-5">
          <div className="flex flex-col gap-3 justify-items-end justify-end items-end p-5">
            {errors.length > 0
              ? errors.map((error, index) => (
                  <Alert
                    key={index}
                    success={success}
                    index={index}
                    error={error}
                    errors={errors}
                    setErrors={setErrors}
                    theme={theme}
                  />
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
