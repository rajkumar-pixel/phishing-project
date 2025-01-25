// Function to extract email content
const extractEmailContent = () => {
  // Adjust selector for Gmail content
  const emailBody = document.querySelector(".a3s.aiL");
  return emailBody ? emailBody.innerText.trim() : null;
};

// Function to send email content to the FastAPI endpoint
const checkForPhishing = (emailContent) => {
  chrome.runtime.sendMessage(
    { type: "checkPhishing", emailContent },
    (response) => {
      if (response.prediction === "Phishing Email") {
        alert("🚨 Warning: Phishing email detected!");
      } else {
        console.log("✅ Email is safe.");
      }
    }
  );
};

// Debounce function to prevent multiple rapid API calls
let debounceTimeout;
const debounce = (func, delay) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(func, delay);
};

// Monitor for changes in Gmail email content and run the phishing check
const observeEmailContent = () => {
  const targetNode = document.body; // Monitor the body for changes
  const config = { childList: true, subtree: true };

  const callback = (mutationsList) => {
    console.log("Detected DOM changes:", mutationsList);
    const emailContent = extractEmailContent();
    if (emailContent) {
      console.log("Extracted email content:", emailContent);
      debounce(() => checkForPhishing(emailContent), 1000);
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
};

// Start observing email content
observeEmailContent();
