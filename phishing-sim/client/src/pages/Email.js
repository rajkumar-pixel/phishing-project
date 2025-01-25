import React, { useState, useEffect } from "react";
import axios from "axios";

const Emails = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/emails").then((res) => {
      setEmails(res.data);
    });
  }, []);

  const sendEmail = (email) => {
    const to = prompt("Enter recipient email:");
    if (to) {
      axios
        .post("http://localhost:5000/api/emails/send", { to, subject: email.subject })
        .then((res) => {
          alert(res.data.message);
        });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Emails</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {emails.map((email) => (
          <div
            key={email.id}
            className="bg-white p-4 shadow-md rounded-lg border border-gray-200"
          >
            <h3 className="text-lg font-bold">{email.subject}</h3>
            <p className="text-gray-600">Type: {email.status}</p>
            <button
              onClick={() => sendEmail(email)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Send Email
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Emails;
