import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/User";
import { AlertsContext } from "../../context/Alerts";
import { SuccessContext } from "../../context/Success";
import { ThemeContext } from "../../context/Theme";
import BatchCard from "../../components/ui/BatchCard";
import useAuthCheck from "../../hooks/useAuthCheck";
import API from "../../service/API";

export const Classroom = ({ setSelected, setSelectedBatch }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useContext(UserContext);
  const [batchName, setBatchName] = useState("");
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const [batches, setBatches] = useState([]);
  const [code, setCode] = useState(null);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  useAuthCheck();
  const handleSelectBatch = (id) => {
    setSelectedBatch(id);
    setSelected("Batch");
  };

  const handleGetBatches = async () => {
    setSuccess(true);
    setErrors([]);

    const config = {
      url: `${serverUrl}/classroom/get-batches`,
      method: "GET",
      data: {
        batchName: batchName,
      },
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setBatches(res.data.batches);
    }
    if (error) {
      setLoading(false);
      setSuccess(false);
      setErrors(error.response.data.errors.map((error) => error.msg));
    }
  };

  const handleCreateBatch = async () => {
    setSuccess(true);
    setErrors([]);

    if (!user.fname) {
      setSuccess(false);
      setErrors(["You must change your name first!"]);
      return;
    }

    const config = {
      url: `${serverUrl}/classroom/create-batch`,
      method: "POST",
      data: {
        batchName: batchName,
      },
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setLoading(false);
      setSuccess(true);
      setErrors(["Batch Created Successfully!"]);
      document.getElementById("create_batch").close();
      handleGetBatches();
    }
    if (error) {
      setLoading(false);
      setSuccess(false);
      setErrors(["Invalid Batch Name"]);
      document.getElementById("create_batch").close();
    }
  };

  const handleJoinBatch = async () => {
    setSuccess(true);
    setErrors([]);

    if (!user.fname) {
      setSuccess(false);
      setErrors(["You must change your name first!"]);
      return;
    }

    const config = {
      url: `${serverUrl}/classroom/join-batch`,
      method: "POST",
      data: {
        code: code,
      },
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setLoading(false);
      setSuccess(true);
      setErrors(["Joined Successfully!"]);
      document.getElementById("join_batch").close();
      handleGetBatches();
    }
    if (error) {
      setLoading(false);
      setSuccess(false);
      setErrors(["Batch does not exist"]);
      document.getElementById("join_batch").close();
    }
  };

  useEffect(() => {
    handleGetBatches();
  }, []);

  return (
    <div className="h-full w-full flex flex-col flex-grow xs:mr-20 gap-5">
      {/* CREATE BATCH */}
      <dialog id="create_batch" className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Create Batch</h3>{" "}
            <button
              onClick={() => {
                document.getElementById("create_batch").close();
              }}
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>

          <div className="pt-10">
            <label htmlFor="batchname" className="block mb-2 text-sm font-medium">
              <i className="fa-solid fa-users-between-lines mr-2"></i>
              Batch Name
            </label>
            <div
              className="tooltip w-full"
              data-tip="Batch name must only contain letters, numbers and a maximum of 50 characters."
            >
              <input
                type="text"
                name="batchname"
                className="bg-gray-50 border text-night border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="PugadMaharlika"
                required
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-action">
            <button
              onClick={handleCreateBatch}
              className="btn hover:bg-green-700 bg-green-500 text-white"
            >
              Create
            </button>
          </div>
        </div>
      </dialog>

      {/* JOIN BATCH */}
      <dialog id="join_batch" className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Join Batch</h3>{" "}
            <button
              onClick={() => {
                document.getElementById("join_batch").close();
              }}
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>

          <div className="pt-10">
            <label htmlFor="batchname" className="block mb-2 text-sm font-medium">
              <i className="fa-solid fa-user-secret mr-2"></i>
              Batch Code
            </label>
            <div
              className="tooltip w-full"
              data-tip="Batch code should be minimum of 5 characters."
            >
              <input
                type="text"
                name="batchcode"
                className="bg-gray-50 border text-night border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="ABCD123"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-action">
            <button
              onClick={handleJoinBatch}
              className="btn hover:bg-green-700 bg-green-500 text-white"
            >
              Join
            </button>
          </div>
        </div>
      </dialog>
      <div className={`fixed bottom-5 right-5 z-10 ${user && user.isteacher ? "hidden" : ""}`}>
        <div className="flex flex-col justify-center">
          <button
            onClick={() => {
              document.getElementById("join_batch").showModal();
            }}
            className="rounded-full w-14 h-14 hover:bg-green-700 bg-green-500 text-white"
          >
            <i class="fa-solid fa-users-rectangle"></i>
          </button>
        </div>
      </div>

      <div
        className={`flex w-full flex-row justify-between rounded-xl h-16 shadow-md p-4 pl-10 font-bold bg-${theme}`}
      >
        CLASSROOM
        <button
          id="btn_add_item"
          onClick={() => {
            document.getElementById("create_batch").showModal();
          }}
          className={`hover:bg-green-700 bg-green-500 text-white rounded-lg max-w-40 px-4 py-2 text-sm md:text-md ${user && user.isteacher ? "" : "hidden"}`}
        >
          Create Batch
        </button>
      </div>
      <div className={`flex flex-wrap justify-center gap-5 ${loading && "hidden"} `}></div>
      {/* MAIN CONTENT */}
      <div className="flex flex-wrap gap-10 mb-20">
        {batches &&
          batches.map((batch) => {
            return <BatchCard handleSelectBatch={handleSelectBatch} batch={batch} />;
          })}
      </div>
    </div>
  );
};
