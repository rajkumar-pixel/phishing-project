import React, { useState, useEffect } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BsGraphUp, BsNewspaper, BsSendArrowDown } from "react-icons/bs";
import { FaUser, FaEdit, FaTrash } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
const EmailPage = () => {
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [smartPhishing, setSmartPhishing] = useState(true);
  const [emails, setEmails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState("");

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  useEffect(() => {
    axios.get("http://localhost:5000/api/emails").then((res) => {
      setEmails(res.data);
      console.log(res.data)
    });
  }, []);

  const templates = [
    { id: 1, title: "End of Year Taxes", img: "https://via.placeholder.com/150", description: "Jan 23 - Jan 29" },
    { id: 2, title: "Amazon", img: "https://via.placeholder.com/150", description: "Your order is on its way..." },
    { id: 3, title: "Sick Leave and Time Off", img: "https://via.placeholder.com/150", description: "" },
    { id: 4, title: "Tax Workshop!!!", img: "https://via.placeholder.com/150", description: "" },
    { id: 5, title: "Corporate Holidays", img: "https://via.placeholder.com/150", description: "" },
  ];

  const handleSendEmail = async () => {
   

    try {
      const response = await axios.post("http://localhost:5000/api/emails/send", {
        to: selectedRecipient,
        subject: "Phishing Sim Test Mail",
        body: "This is the Body of the Safe email, Your account is secure. This is a Phishing Simulator Test.",
      });

      alert(response.data.message);
      setShowModal(false);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <div className="flex  min-h-screen">
      
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

           <div className="mx-auto my-auto">
      {/* Header Section */}
      <div className="flex  justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create Campaign</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-gray-200 text-sm rounded-lg">Send Test Email</button>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg">Preview and Start</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 border-b border-gray-300 mb-6">
        <button className="text-blue-600 font-semibold pb-2 border-b-2 border-blue-600">Templates</button>
        <button className="text-gray-500">Recipients</button>
        <button className="text-gray-500">Delivery</button>
      </div>

      {/* Filter and Smart Phishing */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <select className="px-4 py-2 border rounded-lg">
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Smart Phishing</span>
            <button onClick={() => setSmartPhishing(!smartPhishing)}>
              {smartPhishing ? (
                <FaToggleOn className="text-blue-600 text-2xl" />
              ) : (
                <FaToggleOff className="text-gray-500 text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Month Selector */}
      <div className="flex space-x-2 overflow-x-auto mb-6">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`px-4 py-2 rounded-lg ${
              selectedMonth === month
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {month}
          </button>
        ))}
      </div>

      {/* Templates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {emails.map((template) => (
          <div key={template.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/150" className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{template.title}</h3>
              <p className="text-gray-600 text-sm">{template.body}</p>
              <p className="text-gray-600 text-sm">{template.subject}</p>
              <button onClick={()=>setShowModal(true)} className="flex items-center text-blue-600 mt-4">
                <BsSendArrowDown className="mr-2" /> Send This Email
              </button>
            </div>
          </div>
        ))}
        {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h2 className="text-2xl font-bold mb-4">Send Email</h2>

            <div className="mb-4">
  <label htmlFor="recipient" className="block text-gray-700 font-semibold mb-2">
    Select Recipient:
  </label>
  <select
    id="recipient"
    value={selectedRecipient} // This binds the selected value to state
    onChange={(e) => {
      console.log("Recipient selected:", e.target.value); // Debugging log
      setSelectedRecipient(e.target.value); // Updates the state
    }}
    className="w-full px-4 py-2 border rounded-lg"
  >
    <option value="">-- Select Recipient --</option>
    <option key={1} value="dev.bhanushali03@gmail.com">
      dev.bhanushali03@gmail.com
    </option>
    <option key={2} value="test@example.com">
      test@example.com
    </option>
  </select>
</div>


            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
    
    </div>
  );
};

export default EmailPage;
