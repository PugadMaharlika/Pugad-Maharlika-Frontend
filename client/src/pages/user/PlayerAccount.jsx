import React, { useState, useEffect } from "react";
import defaultPlayerImage from "/Github/Pugad Testing/Pugad-Maharlika-Frontend/client/src/assets/James-Reid.jpg";

const playerValues = [
  {
    id: 1,
    username: "PlayerOne",
    email: "playerone@gmail.com",
    date: "2024-01-28T00:30",
    status: "Online",
  },
  {
    id: 2,
    username: "MuscleMaster",
    email: "musclemaster@gmail.com",
    date: "2024-01-25T22:40",
    status: "Online",
  },
  {
    id: 3,
    username: "SilentHunter",
    email: "silenthunter@gmail.com",
    date: "2024-01-20T22:40",
    status: "Offline",
  },
  {
    id: 4,
    username: "Speedster",
    email: "speedster@gmail.com",
    date: "2024-01-15T15:29",
    status: "Offline",
  },
  {
    id: 5,
    username: "EpicGamer",
    email: "epicgamer@gmail.com",
    date: "2024-01-14T22:40",
    status: "Online",
  },
];

export const PlayerAccount = ({ setSelected }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [status, setStatus] = useState(true); // true for "Online", false for "Offline"

  useEffect(() => {
    const selectedPlayer = playerValues.find((player) => player.id === 1);
    if (selectedPlayer) {
      setUsername(selectedPlayer.username);
      setEmail(selectedPlayer.email);
      setDateCreated(selectedPlayer.date);
      setStatus(selectedPlayer.status === "Online"); // Convert string to boolean
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Player data saved successfully");
  };

  const handleToggleStatus = () => {
    setStatus((prevStatus) => {
      const newStatus = !prevStatus;
      console.log(newStatus ? "Player is now Online" : "Player is now Offline");
      return newStatus;
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg flex shadow-lg relative flex-col md:flex-row">
        {/* Back Button */}
        <button
          onClick={() => setSelected("Player")}
          className="absolute top-4 left-4 text-black hover:text-gray-600"
        >
          <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>

        {/* Image Holder */}
        <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
          <div className="mb-4">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-auto rounded-lg mb-4"
              />
            ) : (
              <img
                src={defaultPlayerImage}
                alt="Default"
                className="w-full h-auto rounded-lg mb-4"
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />
        </div>

        {/* Player Details */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Player Account Details</h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mb-4 p-2 rounded-lg border border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-2 rounded-lg border border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="dateCreated">
              Date Created
            </label>
            <input
              id="dateCreated"
              type="datetime-local"
              value={dateCreated}
              onChange={(e) => setDateCreated(e.target.value)}
              className="w-full mb-4 p-2 rounded-lg border border-gray-300"
            />
          </div>

          {/* Toggle Status Button */}
          <div className="flex justify-end items-center mb-4">
            <button
              onClick={handleToggleStatus}
              className={`py-2 px-4 rounded text-white ${
                status
                  ? "bg-red-500 hover:bg-red-700"
                  : "bg-green-500 hover:bg-green-700"
              }`}
            >
              {status ? "Set Offline" : "Set Online"}
            </button>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerAccount;
