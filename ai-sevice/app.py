from fastapi import FastAPI
import joblib
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ComplaintRequest(BaseModel):
    complaint: str


# Load category model
category_model = joblib.load("campusfix_model.pkl")
category_vectorizer = joblib.load("tfidf_vectorizer.pkl")

# Load priority model
priority_model = joblib.load("priority_model.pkl")
priority_vectorizer = joblib.load("priority_vectorizer.pkl")


@app.get("/")
def home():
    return {"message": "CampusFix AI Service is running"}


@app.post("/predict")
def predict_complaint(request: ComplaintRequest):

    complaint = request.complaint

    # Category prediction
    category_tfidf = category_vectorizer.transform([complaint])
    category = category_model.predict(category_tfidf)[0]

    # Priority prediction
    priority_tfidf = priority_vectorizer.transform([complaint])
    priority = priority_model.predict(priority_tfidf)[0]

    return {
        "complaint": complaint,
        "category": category,
        "priority": priority
    }