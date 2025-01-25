document.getElementById("checkButton").addEventListener("click", async () => {
  const emailContent = document.getElementById("emailContent").value;
  const resultElement = document.getElementById("result");

  // Clear previous results
  resultElement.textContent = "";
  resultElement.className = "";

  if (!emailContent.trim()) {
    alert("Please enter email content!");
    return;
  }

  // Show a loading message
  resultElement.textContent = "Checking email...";
  resultElement.className = "loading";

  try {
    const response = await fetch("http://127.0.0.1:8000/predict/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_text: emailContent }),
    });

    if (response.ok) {
      const data = await response.json();
      const prediction = data.prediction;

      // Display prediction result with dynamic styling
      if (prediction === "Phishing Email") {
        resultElement.textContent = "🚨 This email is likely phishing!";
        resultElement.className = "negative"; // Add styling for phishing
      } else {
        resultElement.textContent = "✅ This email seems safe.";
        resultElement.className = "positive"; // Add styling for safe emails
      }
    } else {
      // Handle non-200 responses
      const errorData = await response.json();
      console.error("Error from API:", errorData);
      resultElement.textContent = "❌ Error analyzing the email.";
      resultElement.className = "error";
    }
  } catch (error) {
    // Handle network or other errors
    console.error("Error connecting to the phishing detection API:", error);
    resultElement.textContent = "❌ Unable to connect to the API.";
    resultElement.className = "error";
  }
});