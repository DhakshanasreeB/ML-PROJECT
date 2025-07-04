from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

app = FastAPI()

# Load the model
model = joblib.load("model.pkl")
print("Expected features:", model.feature_names_in_)

# Print expected feature names (debug purpose)
print("Model expects features:", getattr(model, "feature_names_in_", "Unknown"))

class ExpenseInput(BaseModel):
    amount: float
    unexpected: float
    third_feature: float  # Replace this with actual feature name if you know

@app.post("/predict-expense")
async def predict_expense(data: ExpenseInput):
    # Provide all 3 features as a list in the right order
    features = [data.amount, data.unexpected, data.third_feature]
    prediction = model.predict([features])[0]
    return {"prediction": prediction}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

