import React, { useState, useEffect } from "react";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BsGraphUp, BsNewspaper } from "react-icons/bs";
import { FaUser, FaEdit, FaTrash } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Dashboard = () => {
  const [data, setData] = useState([
    { id: 1, email: "user1@example.com" },
    { id: 2, email: "user2@example.com" },
  ]);

  const [newEmail, setNewEmail] = useState("");
  const [editEmail, setEditEmail] = useState(null);
  const [editValue, setEditValue] = useState("");

  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest" };

  const campaignMetrics = {
    sent: 100,
    opened: 56,
    clicked: 17,
    phished: 11,
  };

  // Add new email to the table
  const handleAdd = () => {
    if (!newEmail.trim()) return;
    setData([...data, { id: data.length + 1, email: newEmail }]);
    setNewEmail("");
  };

  // Delete email from the table
  const handleDelete = (id) => {
    const updatedData = data.filter((row) => row.id !== id);
    setData(updatedData);
  };

  // Edit email in the table
  const handleEdit = (id) => {
    const emailToEdit = data.find((row) => row.id === id);
    setEditEmail(id);
    setEditValue(emailToEdit.email);
  };

  // Save edited email
  const handleSave = () => {
    const updatedData = data.map((row) =>
      row.id === editEmail ? { ...row, email: editValue } : row
    );
    setData(updatedData);
    setEditEmail(null);
    setEditValue("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Phishing Simulation</h1>
        <ul className="space-y-4">
          <li className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded">
            <AiOutlineHome className="text-xl" />
            <span>Home</span>
          </li>
          <li className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded">
            <BsGraphUp className="text-xl" />
            <span>Dashboard</span>
          </li>
          <li className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded">
            <AiOutlineMail className="text-xl" />
            <span>Phishing</span>
          </li>
          <li className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded">
            <BsNewspaper className="text-xl" />
            <span>Policies</span>
          </li>
          <li className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded">
            <FaUser className="text-xl" />
            <span>Users</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Create Campaign
          </button>
        </div>

        {/* Campaign Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(campaignMetrics).map(([key, value]) => (
            <div
              key={key}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              <CircularProgressbar
                value={value}
                text={`${value}%`}
                styles={buildStyles({
                  textSize: "16px",
                  pathColor: key === "phished" ? "#e74c3c" : "#3498db",
                  textColor: "#333",
                  trailColor: "#eee",
                })}
              />
              <p className="text-lg font-semibold capitalize mt-2">{key}</p>
            </div>
          ))}
        </div>

        {/* Email Table */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Emails</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="px-4 py-2 border rounded-lg w-80 mr-2"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Email
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 shadow rounded-lg">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr
                    key={row.id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="py-2 px-4 text-center">{row.id}</td>
                    <td className="py-2 px-4">
                      {editEmail === row.id ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="px-2 py-1 border rounded-lg"
                        />
                      ) : (
                        row.email
                      )}
                    </td>
                    <td className="py-2 px-4 flex space-x-4 justify-center">
                      {editEmail === row.id ? (
                        <button
                          onClick={handleSave}
                          className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(row.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
