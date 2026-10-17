import pandas as pd

# Load dataset
data = pd.read_csv("complaints.csv")

# Show first 5 complaints
print(data.head())

# Show number of complaints in each category
print("\nCategory counts:")
print(data["category"].value_counts())

# Show total number of complaints
print("\nTotal complaints:", len(data))

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
import joblib

# Separate input and output
X = data["complaint"]
y = data["category"]

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nTraining samples:", len(X_train))
print("Testing samples:", len(X_test))

# Convert complaint text into numerical features
vectorizer = TfidfVectorizer()

X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

print("\nTF-IDF training shape:", X_train_tfidf.shape)
print("TF-IDF testing shape:", X_test_tfidf.shape)

# Create the classification model
model = LogisticRegression(max_iter=1000)

# Train the model
model.fit(X_train_tfidf, y_train)
# Save the trained model
joblib.dump(model, "campusfix_model.pkl")

# Save the TF-IDF vectorizer
joblib.dump(vectorizer, "tfidf_vectorizer.pkl")

print("Model and vectorizer saved successfully!")
print("\nModel training completed!")

# Predict categories for test complaints
y_pred = model.predict(X_test_tfidf)

print("\nPredicted categories:")
print(y_pred)

print("\nActual categories:")
print(y_test.values)
# Calculate model accuracy
accuracy = accuracy_score(y_test, y_pred)

print("\nModel Accuracy:", accuracy)
print("Model Accuracy (%):", accuracy * 100)

# Create confusion matrix
cm = confusion_matrix(y_test, y_pred, labels=model.classes_)

print("\nConfusion Matrix:")
print(cm)

# Test the model with a new complaint
new_complaint = ["The fan in my hostel room has stopped working"]

new_complaint_tfidf = vectorizer.transform(new_complaint)

prediction = model.predict(new_complaint_tfidf)

print("\nNew Complaint:", new_complaint[0])
print("Predicted Category:", prediction[0])