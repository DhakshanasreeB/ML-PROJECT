import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Dummy training data
data = {
    'food': [200, 300, 250, 400],
    'rent': [1000, 1200, 1100, 1300],
    'shopping': [300, 150, 400, 100],
    'salary': [5000, 6000, 5500, 7000]  # Target variable
}

df = pd.DataFrame(data)

# Features and target
X = df[['food', 'rent', 'shopping']]
y = df['salary']

# Train the model
model = LinearRegression()
model.fit(X, y)

# Save the trained model to file
joblib.dump(model, 'model.pkl')
print("✅ Model trained and saved as model.pkl")
