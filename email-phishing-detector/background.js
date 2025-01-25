chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "checkPhishing") {
    fetch("http://127.0.0.1:8000/predict/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_text: message.emailContent }),
    })
      .then((response) => response.json())
      .then((data) => sendResponse(data))
      .catch((error) => console.error("Error:", error));
  }
  return true; // Keep the message channel open for asynchronous response
});
