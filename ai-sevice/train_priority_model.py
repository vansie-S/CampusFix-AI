import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
data = pd.read_csv("priority_data.csv")

X = data["complaint"]
y = data["priority"]

# Convert complaint text into numerical features
vectorizer = TfidfVectorizer()

X_tfidf = vectorizer.fit_transform(X)

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X_tfidf,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Train model
model = LogisticRegression(max_iter=1000)

model.fit(X_train, y_train)

# Test model
predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("Priority Model Accuracy:", accuracy)

# Save model and vectorizer
joblib.dump(model, "priority_model.pkl")
joblib.dump(vectorizer, "priority_vectorizer.pkl")

print("Priority model saved successfully!")