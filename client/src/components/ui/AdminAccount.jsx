import React, { useState, useEffect } from "react";

import shane from "/Github/Pugad Testing/Pugad-Maharlika-Frontend/client/src/assets/James-Reid.jpg";

const accvalues = [
  { id: 1, username: "OhMama", email: "johny@gmail.com", date: "2024-01-28T00:30", status: "Active" },
  { id: 2, username: "OhMuscle", email: "masku@gmail.com", date: "2024-01-25T22:40", status: "Active" },
  { id: 3, username: "Alahooooo!", email: "abdul@gmail.com", date: "2024-01-20T22:40", status: "Disabled" },
  { id: 4, username: "Lalalala", email: "wsmith@gmail.com", date: "2024-01-15T15:29", status: "Disabled" },
  { id: 5, username: "Yeaaaahh!", email: "ESing@gmail.com", date: "2024-01-14T22:40", status: "Active" }
];

export const AdminAccount = ({ setSelected }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [status, setStatus] = useState(true); // true for "Active", false for "Disabled"

  useEffect(() => {
    const selectedAccount = accvalues.find(account => account.id === 1);
    if (selectedAccount) {
      setUsername(selectedAccount.username);
      setEmail(selectedAccount.email);
      setDateCreated(selectedAccount.date);
      setStatus(selectedAccount.status === "Active"); // Convert string to boolean
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
    console.log("Save button clicked");
  };

  const handleToggleStatus = () => {
    setStatus(prevStatus => {
      const newStatus = !prevStatus; // Toggle between Active and Disabled
      console.log(newStatus ? "Account Activated" : "Account Disabled");
      return newStatus;
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg flex shadow-lg relative flex-col md:flex-row">
        
        {/* Back Button */}
        <button onClick={() => setSelected("Admin")} className="absolute top-4 left-4 text-black hover:text-gray-600">
          <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>

        {/* Image Holder */}
        <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
          <div className="mb-4">
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" className="w-full h-auto rounded-lg mb-4" />
            ) : (
              <img src={shane} alt="Default" className="w-full h-auto rounded-lg mb-4" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />
        </div>

        {/* Account Details */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Admin Account Details</h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="username">Username</label>
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
            <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
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
            <label className="block text-gray-700 mb-1" htmlFor="dateCreated">Date Created</label>
            <input
              id="dateCreated"
              type="datetime-local" // Date picker
              value={dateCreated}
              onChange={(e) => setDateCreated(e.target.value)}
              className="w-full mb-4 p-2 rounded-lg border border-gray-300"
            />
          </div>

          <div className="flex items-center mb-4">
            <span className="mr-2">{status ? "Active" : "Disabled"}</span>
            <button
              onClick={handleToggleStatus}
              className={`py-2 px-4 rounded ${status ? "bg-blue-500" : "bg-red-500"} text-white`}
            >
              {status ? "Deactivate" : "Activate"}
            </button>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Save
            </button> 
          </div>
        </div>
      </div>
    </div>
  );
};
