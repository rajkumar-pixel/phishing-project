from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
from sklearn.metrics import accuracy_score
from collections import Counter
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load client models
client_models = [joblib.load(f"client_model_{i}.pkl") for i in range(5)]

# Load the vectorizer
vectorizer = joblib.load("tfidf_vectorizer.pkl")

# Function for aggregating predictions using majority voting
def aggregate_predictions(models, X_input):
    predictions = np.array([model.predict(X_input) for model in models], dtype=object)
    final_predictions = []
    for i in range(predictions.shape[1]):
        sample_preds = predictions[:, i]
        most_common = Counter(sample_preds).most_common(1)[0][0]
        final_predictions.append(most_common)
    return np.array(final_predictions)

# Request model for email input
class EmailRequest(BaseModel):
    email_text: str

# Health check endpoint
@app.get("/")
def read_root():
    return {"message": "Phishing Email Detector API is running!"}

# Prediction endpoint
@app.post("/predict/")
def predict_email(request: EmailRequest):
    if not request.email_text.strip():
        raise HTTPException(status_code=400, detail="Email text is empty.")

    # Transform input using the TF-IDF vectorizer
    try:
        input_tfidf = vectorizer.transform([request.email_text])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing input: {str(e)}")

    # Get aggregated predictions
    try:
        final_prediction = aggregate_predictions(client_models, input_tfidf)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating prediction: {str(e)}")

    # Return the result
    return {"prediction": final_prediction[0]}
