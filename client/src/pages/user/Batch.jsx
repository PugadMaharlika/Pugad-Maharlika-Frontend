import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/User";
import { ThemeContext } from "../../context/Theme";
import { AlertsContext } from "../../context/Alerts";
import { SuccessContext } from "../../context/Success";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import API from "../../service/API";
import logo from "../../assets/logo1.png";

export const Batch = ({ setSelected, selectedBatch }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [showMission, setShowMission] = useState(false);
  const [mission, setMission] = useState({});
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const [story, setStory] = useState("story1");
  const [batch, setBatch] = useState(selectedBatch);

  const [notficationTitle, setNotficationTitle] = useState("");
  const [notficationMessage, setNotficationMessage] = useState("");

  //create
  const [createStory, setCreateStory] = useState("story1");
  const [createToDate, setCreateToDate] = useState(new Date().toLocaleDateString("fr-CA"));

  //update
  const [updateStory, setUpdateStory] = useState("story1");
  const [updateToDate, setUpdateToDate] = useState(new Date().toLocaleDateString("fr-CA"));

  //player missiom status
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(() => {
      const passDeadline =
        mission && new Date(mission.mis_end).getDate() < new Date().getDate() ? true : false;
      const onDeadline =
        mission && new Date(mission.mis_end).getDate() == new Date().getDate() ? true : false;

      const is_completed =
        user.progress.stories[story].completed == 6 &&
        user.progress.stories[story].quiz &&
        user.progress.stories[story].boss;

      if (is_completed) return "done";
      else if (!is_completed && passDeadline) return "unfinished";
      else if (!is_completed && onDeadline) return "danger";
    });
    return () => {};
  }, [mission]);

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const StudentComponent = (student) => {
    const is_completed =
      student.acc_progress.stories[story].completed == 6 &&
      student.acc_progress.stories[story].quiz &&
      student.acc_progress.stories[story].boss;

    const passDeadline =
      mission && new Date(mission.mis_end).getDate() < new Date().getDate() ? true : false;
    const onDeadline =
      mission && new Date(mission.mis_end).getDate() == new Date().getDate() ? true : false;
    return (
      <button
        className={`bg-gray-100 rounded-lg p-5 ${is_completed && "bg-green-200"} ${!is_completed && passDeadline && "bg-red-200"} ${!is_completed && onDeadline && "bg-yellow-200"}`}
        onClick={() => {
          setSelectedStudent(student);
          document.getElementById("student").showModal();
        }}
      >
        <div className="flex flex-row justify-between mb-2">
          <div className=" ">
            {student.acc_fname +
              " " +
              (student.acc_mname ? student.acc_mname : "") +
              " " +
              student.acc_lname}
          </div>
          <div>{student.acc_progress.stories[story].completed}/6</div>
        </div>
        <div className="text-sm flex w-full justify-self-start place-self-start ">
          <i className="fa-solid fa-envelope mr-2 mt-1"></i> &nbsp;
          {student.acc_email}
        </div>
        <div className="flex flex-col sm:flex-row w-full justify-start gap-5 mt-3">
          <progress
            className="progress progress-info w-full"
            value={
              student.acc_progress ? (student.acc_progress.stories[story].completed / 6) * 100 : 0
            }
            max="100"
          ></progress>
          <div className="flex flex-row gap-3 text-sm">
            <div className="flex flex-row">
              {student.acc_progress.stories[story].quiz ? (
                <i className="fa-solid fa-circle-check text-green-500 mr-2 mt-1"></i>
              ) : (
                <i class="fa-solid fa-circle-xmark text-red-500 mr-2 mt-1"></i>
              )}
              <i class="fa-solid fa-book-open-reader mr-2 mt-1"></i> Quiz
            </div>
            <div className="flex flex-row">
              {student.acc_progress.stories[story].boss ? (
                <i className="fa-solid fa-circle-check text-green-500 mr-2 mt-1"></i>
              ) : (
                <i class="fa-solid fa-circle-xmark text-red-500 mr-2 mt-1"></i>
              )}
              <i className="fa-solid fa-trophy mr-2 mt-1"></i>Boss
            </div>
          </div>
        </div>
      </button>
    );
  };

  const handleCreateToDateChange = (event) => {
    const selectedToDate = event.target.value;
    setCreateToDate(selectedToDate);
    if (new Date(selectedToDate).getDate() < new Date().getDate()) {
      alert("Deadline cannot be greater than current date!");
      setCreateToDate(new Date().toLocaleDateString("fr-CA")); // Reset 'To' date
    } else {
    }
  };

  const handleUpdateToDateChange = (event) => {
    const selectedToDate = event.target.value;
    setUpdateToDate(selectedToDate);
    if (new Date(selectedToDate).getDate() < new Date().getDate()) {
      alert("Deadline cannot be greater than current date!");
      setUpdateToDate(mission.mis_end); // Reset 'To' date
    } else {
    }
  };

  const handleGetBatch = async () => {
    const config = {
      url: `${serverUrl}/classroom/get-batch`,
      method: "POST",
      data: {
        batchId: batch.bth_id,
      },
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setMission(res.data.mission);
      setStudents(res.data.students);
      if (res.data.mission) {
        setStory(res.data.mission.mis_story);
        setUpdateStory(res.data.mission.mis_story);
        setUpdateToDate(res.data.mission.mis_end);
      }
      setShowMission(true);
    }
    if (error) {
      setLoading(false);
      setSuccess(false);
    }
  };

  const createMission = async () => {
    setSuccess(true);
    setErrors([]);

    const config = {
      url: `${serverUrl}/classroom/create-mission`,
      method: "POST",
      data: {
        batchId: batch.bth_id,
        story: createStory,
        end: createToDate,
      },
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setSuccess(true);
      setErrors(["Mission Added Successfully!"]);
      document.getElementById("add_mission").close();
      handleGetBatch();
    }
    if (error) {
      setLoading(false);
      setSuccess(false);
      setErrors(["Mission Failed To Be added"]);
      document.getElementById("add_mission").close();
    }
  };

  const updateMission = async () => {
    setSuccess(true);
    setErrors([]);

    const config = {
      url: `${serverUrl}/classroom/update-mission`,
      method: "PUT",
      data: {
        misId: mission.mis_id,
        story: updateStory,
        end: updateToDate,
      },
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setLoading(false);
      setSuccess(true);
      setErrors(["Mission Updated Successfully!"]);
      document.getElementById("update_mission").close();
      handleGetBatch();
    }
    if (error) {
      setLoading(false);
      setSuccess(false);
      setErrors(["Mission Failed To Be Updated"]);
      document.getElementById("update_mission").close();
    }
  };

  const endMission = async () => {
    setSuccess(true);
    setErrors([]);

    const config = {
      url: `${serverUrl}/classroom/end-mission`,
      method: "PUT",
      data: {
        misId: mission.mis_id,
      },
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setLoading(false);
      setSuccess(true);
      setErrors(["Mission Ended Successfully!"]);
      document.getElementById("update_mission").close();
      document.getElementById("end_mission_dialog").close();
      handleGetBatch();
    }
    if (error) {
      setLoading(false);
      setSuccess(false);
      setErrors(["Mission Failed To Be Ended"]);
      document.getElementById("update_mission").close();
      document.getElementById("end_mission_dialog").close();
    }
  };

  const removeStudent = async () => {
    setSuccess(true);
    setErrors([]);

    const config = {
      url: `${serverUrl}/classroom/remove-student`,
      method: "PUT",
      data: {
        studId: selectedStudent.stud_id,
      },
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setLoading(false);
      setSuccess(true);
      setErrors(["Student Removed Successfully!"]);
      document.getElementById("student").close();
      document.getElementById("remove_student_dialog").close();
      handleGetBatch();
    }
    if (error) {
      setLoading(false);
      setSuccess(false);
      setErrors(["Student Failed To Be Removed"]);
      document.getElementById("student").close();
      document.getElementById("remove_student_dialog").close();
    }
  };

  const notifyStudent = async () => {
    setSuccess(true);
    setErrors([]);

    const config = {
      url: `${serverUrl}/classroom/notify-student`,
      method: "POST",
      data: {
        accId: selectedStudent.acc_id,
        title: notficationTitle,
        message: notficationMessage,
      },
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setLoading(false);
      setSuccess(true);
      setErrors(["Student Notified Successfully!"]);
      document.getElementById("notify_student").close();

      handleGetBatch();
    }
    if (error) {
      setLoading(false);
      setSuccess(false);
      setErrors(error.response.data.errors.map((error) => error.msg));
      document.getElementById("notify_student").close();
    }
  };

  const disbandBatch = async () => {
    setSuccess(true);
    setErrors([]);

    const config = {
      url: `${serverUrl}/classroom/disband-batch`,
      method: "PUT",
      data: { batchId: batch.bth_id },
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setLoading(false);
      setSuccess(true);
      setErrors(["Batch Disbanded Successfully!"]);
      document.getElementById("disband_dialog").close();
      setSelected("Classroom");
    }
    if (error) {
      setLoading(false);
      setSuccess(false);
      document.getElementById("disband_dialog").close();
      setSelected("Classroom");
    }
  };

  const leaveBatch = async () => {
    setSuccess(true);
    setErrors([]);

    const config = {
      url: `${serverUrl}/classroom/leave-batch`,
      method: "PUT",
      data: {},
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setLoading(false);
      setSuccess(true);
      setErrors(["Left the Batch Successfully!"]);
      document.getElementById("leave_dialog").close();
      setSelected("Classroom");
    }
    if (error) {
      setLoading(false);
      setSuccess(false);
      document.getElementById("leave_dialog").close();
      setSelected("Classroom");
    }
  };

  useEffect(() => {
    handleGetBatch();
    return () => {
      handleGetBatch();
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col flex-grow xs:mr-20 gap-5">
      <ConfirmationDialog
        theme={theme}
        handleAction={() => {
          endMission();
        }}
        id={"end_mission_dialog"}
        message={"Are you sure you want to END this mission?"}
        buttonText={"Confirm"}
        is_danger={true}
      />
      <ConfirmationDialog
        theme={theme}
        handleAction={() => {
          removeStudent();
        }}
        id={"remove_student_dialog"}
        message={"Are you sure you want to REMOVE this student?"}
        buttonText={"Confirm"}
        is_danger={true}
      />
      <ConfirmationDialog
        theme={theme}
        handleAction={() => {
          disbandBatch();
        }}
        id={"disband_dialog"}
        message={"Are you sure you want to DISBAND this batch?"}
        buttonText={"Confirm"}
        is_danger={true}
      />
      <ConfirmationDialog
        theme={theme}
        handleAction={() => {
          leaveBatch();
        }}
        id={"leave_dialog"}
        message={"Are you sure you want to LEAVE this batch?"}
        buttonText={"Confirm"}
        is_danger={true}
      />

      {/* CREATE MISSION */}
      <dialog id="add_mission" className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Create Mission</h3>
            <button
              onClick={() => {
                document.getElementById("add_mission").close();
              }}
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>

          <div className="pt-10">
            <label htmlFor="batchname" className="block mb-2 text-sm font-medium">
              <i className="fa-solid fa-square-poll-horizontal mr-2"></i>
              History
            </label>
            <select
              value={createStory}
              onChange={(e) => {
                const selectedType = e.target.value;
                setCreateStory(selectedType);
              }}
              className="p-2 rounded-lg mb-4 border w-full border-gray-300"
            >
              <option default value="story1">
                Diego Silang
              </option>
              <option value="story2">Gabriela Silang</option>
            </select>
            <label htmlFor="batchname" className="block mb-2 text-sm font-medium">
              <i class="fa-solid fa-hourglass-end mr-2"></i>
              Deadline
            </label>
            <input
              type="date"
              className="border border-gray-300 p-2 rounded-lg w-full"
              value={createToDate}
              onChange={handleCreateToDateChange}
            />
          </div>

          <div className="modal-action">
            <button
              onClick={createMission}
              className="btn hover:bg-green-700 bg-green-500 text-white"
            >
              Create
            </button>
          </div>
        </div>
      </dialog>

      {/* NOTIFY STUDENT */}
      <dialog id="notify_student" className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Notify Student</h3>
            <button
              onClick={() => {
                document.getElementById("notify_student").close();
                document.getElementById("student").showModal();
              }}
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>

          <div className="pt-10 flex flex-col gap-5">
            <div>
              <label htmlFor="batchname" className="block text-xs font-medium">
                <i class="fa-solid fa-user mr-2"></i>
                Name
              </label>
              <p className="pl-2">
                {selectedStudent &&
                  selectedStudent.acc_fname +
                    " " +
                    (selectedStudent.acc_mname ? selectedStudent.acc_mname : "") +
                    " " +
                    selectedStudent.acc_lname}
              </p>
            </div>
            <div>
              <label htmlFor="batchname" className="block mb-2 text-sm font-medium">
                <i class="fa-solid fa-envelope mr-2"></i>
                Title
              </label>
              <input
                type="text"
                name="username"
                id="reg_username"
                className="bg-gray-50 border text-night border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Well Done."
                required
                value={notficationTitle}
                onChange={(e) => setNotficationTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="batchname" className="block mb-2 text-sm font-medium">
                <i class="fa-solid fa-comment mr-2"></i>
                Note
              </label>
              <textarea
                name="username"
                id="reg_username"
                className="bg-gray-50 border text-night border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Please complete the mission."
                required
                value={notficationMessage}
                onChange={(e) => setNotficationMessage(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-action">
            <button
              onClick={notifyStudent}
              className="btn hover:bg-green-700 bg-green-500 text-white"
            >
              Send
            </button>
          </div>
        </div>
      </dialog>

      {/* INTERACT STUDENT */}
      <dialog id="student" className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between mb-5">
            <h3 className="font-bold text-lg">Student</h3>
            <button
              onClick={() => {
                document.getElementById("student").close();
              }}
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>

          <div className=" flex flex-col gap-3 max-h-[15rem] overflow-y-auto">
            <div className="flex flex-row gap-2">
              <img
                className="rounded-full w-16 h-16 object-cover mx-auto"
                src={
                  selectedStudent && selectedStudent.acc_profile
                    ? selectedStudent.acc_profile
                    : logo
                }
              ></img>
            </div>
            <label htmlFor="batchname" className="block text-xs font-medium">
              <i class="fa-solid fa-user mr-2"></i>
              Name
            </label>
            <p className="pl-2">
              {selectedStudent &&
                selectedStudent.acc_fname +
                  " " +
                  (selectedStudent.acc_mname ? selectedStudent.acc_mname : "") +
                  " " +
                  selectedStudent.acc_lname}
            </p>
            <label htmlFor="batchname" className="block text-xs font-medium">
              <i class="fa-solid fa-tag mr-2"></i>
              Username
            </label>
            <p className="pl-2">{selectedStudent && selectedStudent.acc_username}</p>
            <label htmlFor="batchname" className="block text-xs font-medium">
              <i class="fa-solid fa-envelope mr-2"></i>
              Email
            </label>
            <p className="pl-2">{selectedStudent && selectedStudent.acc_email}</p>
            <label htmlFor="batchname" className="block 2 text-xs font-medium">
              <i class="fa-solid fa-gamepad mr-2"></i>
              Game
            </label>

            <div className="text-sm flex flex-col gap-3">
              <p className="pl-2">
                Deigo Silang :{" "}
                {selectedStudent && selectedStudent.acc_progress.stories.story1.completed}/6 &nbsp;{" "}
                {selectedStudent && selectedStudent.acc_progress.stories.story1.quiz ? (
                  <i class="fa-solid fa-book-open-reader mr-2 mt-1"></i>
                ) : (
                  ""
                )}
                &nbsp;
                {selectedStudent && selectedStudent.acc_progress.stories.story1.boss ? (
                  <i className="fa-solid fa-trophy mr-2 mt-1"></i>
                ) : (
                  ""
                )}
              </p>
              <p className="pl-2">
                Gabriela Silang:{" "}
                {selectedStudent && selectedStudent.acc_progress.stories.story2.completed}/6 &nbsp;
                {selectedStudent && selectedStudent.acc_progress.stories.story2.quiz ? (
                  <i class="fa-solid fa-book-open-reader mr-2 mt-1"></i>
                ) : (
                  ""
                )}
                &nbsp;
                {selectedStudent && selectedStudent.acc_progress.stories.story2.boss ? (
                  <i className="fa-solid fa-trophy mr-2 mt-1"></i>
                ) : (
                  ""
                )}
              </p>
              <p className="pl-2">
                Matches: {selectedStudent && selectedStudent.acc_win + selectedStudent.acc_lose}
              </p>
              <p className="flex flex-row gap-2 pl-2">
                <i class="fa-solid fa-trophy mt-1"> </i> Wins: &nbsp;
                {selectedStudent && selectedStudent.acc_win}
                <i class="fa-solid fa-heart-crack mt-1"></i> Loses: &nbsp;
                {selectedStudent && selectedStudent.acc_lose}
              </p>
            </div>
          </div>

          <div className="modal-action">
            <button
              onClick={() => {
                document.getElementById("remove_student_dialog").showModal();
              }}
              className="btn hover:bg-red-700 bg-red-500 text-white"
            >
              Remove
            </button>
            <button
              className="btn hover:bg-green-700 bg-green-500 text-white"
              onClick={() => {
                document.getElementById("student").close();
                document.getElementById("notify_student").showModal();
              }}
            >
              Notify
            </button>
          </div>
        </div>
      </dialog>

      {/* UPDATE MISSION */}
      <dialog id="update_mission" className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Update Mission</h3>
            <button
              onClick={() => {
                document.getElementById("update_mission").close();
              }}
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>

          <div className="pt-10">
            <label htmlFor="batchname" className="block mb-2 text-sm font-medium">
              <i className="fa-solid fa-square-poll-horizontal mr-2"></i>
              History
            </label>
            <select
              value={updateStory}
              onChange={(e) => {
                const selectedType = e.target.value;
                setUpdateStory(selectedType);
              }}
              className="p-2 rounded-lg mb-4 border w-full border-gray-300"
            >
              <option default value="story1">
                Diego Silang
              </option>
              <option value="story2">Gabriela Silang</option>
            </select>
            <label htmlFor="batchname" className="block mb-2 text-sm font-medium">
              <i class="fa-solid fa-hourglass-end mr-2"></i>
              Deadline
            </label>

            <input
              type="date"
              className="border border-gray-300 p-2 rounded-lg w-full"
              value={updateToDate ? new Date(updateToDate).toLocaleDateString("fr-CA") : ""}
              onChange={handleUpdateToDateChange}
            />
          </div>

          <div className="modal-action">
            <button
              onClick={updateMission}
              className="btn hover:bg-green-700 bg-green-500 text-white"
            >
              Update
            </button>
          </div>
        </div>
      </dialog>
      <div
        className={`flex w-full flex-row justify-between rounded-xl h-16 shadow-md p-4 pt-3 pl-10 font-bold bg-${theme}`}
      >
        <div className="flex align-middle flex-col gap-0 justify-between">
          <p className="text-sm">Batch: {batch && batch.bth_name} </p>{" "}
          <p className="text-sm">Code: {batch && batch.bth_code}</p>
        </div>
        <button
          id="btn_back"
          onClick={() => {
            setSelected("Classroom");
          }}
          className="rounded-lg px-4"
        >
          <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>
      </div>
      <div className={`flex flex-wrap gap-5  ${loading && "hidden"} `}>
        <div
          className={`flex w-full bg-${theme} border-b-8 ${batch.acc_id != user.id && status === "done" ? "border-green-500" : ""} ${batch.acc_id != user.id && status === "unfinished" ? "border-red-500" : ""} ${batch.acc_id != user.id && status === "danger" ? "border-yellow-500" : ""} max-h-[20rem] max-w-[22rem] rounded-md p-4 flex-col`}
        >
          <div className="flex justify-between ">
            <h3 className="font-bold text-[20px]">Mission:</h3>
            <button className="" onClick={() => setShowMission(!showMission)}>
              {showMission ? (
                <i className="fa-solid fa-chevron-up"></i>
              ) : (
                <i className="fa-solid fa-chevron-down"></i>
              )}
            </button>
          </div>
          <div
            className={`flex flex-col h-full ${!showMission && "hidden"} ${!mission && "hidden"}`}
          >
            <div className="border-b-2 underline my-5  "></div>
            <p className="mb-5 ">
              {batch.acc_id != user.id ? (
                status == "done" ? (
                  <i className="fa-solid fa-circle-check text-green-500 mr-2 mt-1"></i>
                ) : (
                  <i class="fa-solid fa-circle-xmark text-red-500 mr-2 mt-1"></i>
                )
              ) : (
                ""
              )}
              Complete the story of {mission && mission.mis_story == "story1" && "Diego Silang"}
              {mission && mission.mis_story == "story2" && "Gabriela Silang"} in within the
              deadline.
            </p>
            <p className="text-14">
              Started: {mission && new Date(mission.date_created).toLocaleDateString()}
            </p>
            <p>Deadline: {mission && new Date(mission.mis_end).toLocaleDateString()}</p>
            <div className="border-b-2 underline my-5"></div>
            <div className={`flex justify-end gap-2 ${batch.acc_id != user.id && "hidden"}`}>
              <button
                className="btn hover:bg-green-700 bg-green-500 text-white"
                onClick={() => {
                  document.getElementById("update_mission").showModal();
                }}
              >
                Update
              </button>
              <button
                onClick={() => {
                  document.getElementById("end_mission_dialog").showModal();
                }}
                className="btn hover:bg-red-700 bg-red-500 text-white"
              >
                End
              </button>
            </div>
          </div>
        </div>
        <div
          className={`bg-white rounded-lg w-full h-auto my-3 p-4 flex flex-col ${batch.acc_id != user.id && "hidden"}`}
        >
          <h3 className="font-bold text-[20px] mb-2 flex flex-row justify-between">
            Students
            <button
              id="btn_add_item"
              onClick={() => {
                document.getElementById("add_mission").showModal();
              }}
              className={`hover:bg-green-700 bg-green-500 text-white rounded-lg max-w-40 px-4 py-2 text-sm md:text-md ${batch.acc_id != user.id && "hidden"} ${mission && "hidden"}`}
            >
              Create Mission
            </button>
          </h3>

          <div className="flex flex-row justify-between">
            <p className="text-[15px] mb-5">Name</p> <p className="text-[15px] mb-5">Completed</p>
          </div>
          <div className="flex flex-col max-h-[22rem] overflow-x-auto gap-3">
            {students &&
              students.map((student) => {
                return StudentComponent(student);
              })}
          </div>
          {/* Table Legend */}
          <div className="flex justify-left mt-5">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs">Legend: </span>
                <div className="w-4 h-4 bg-green-200"></div>
                <span className="text-xs">Complete</span>
                <div className="w-4 h-4 bg-yellow-200"></div>
                <span className="text-xs">Danger</span>
                <div className="w-4 h-4 bg-red-200"></div>
                <span className="text-xs">Unfinished</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Exit Buttons */}
      <div className="flex flex-row justify-end gap-3">
        <button
          id="btn_add_item"
          onClick={() => {
            document.getElementById("disband_dialog").showModal();
          }}
          className={`hover:bg-green-700 bg-red-500 text-white rounded-lg max-w-40 px-4 py-2 text-sm md:text-md ${batch.acc_id != user.id && "hidden"}`}
        >
          Disband Batch
        </button>
        <button
          id="btn_add_item"
          onClick={() => {
            document.getElementById("leave_dialog").showModal();
          }}
          className={`hover:bg-green-700 bg-red-500 text-white rounded-lg max-w-40 px-4 py-2 text-sm md:text-md ${batch.acc_id == user.id && "hidden"}`}
        >
          Leave Batch
        </button>
      </div>
    </div>
  );
};
