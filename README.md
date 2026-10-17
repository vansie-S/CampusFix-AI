\# CampusFix AI — Smart Campus Complaint Management System



CampusFix AI is a web-based complaint management system designed to help students report campus issues and track their resolution. It uses machine learning to predict complaint categories and priorities, helping streamline complaint handling.



\## Features



\- \*\*Complaint Submission:\*\* Students can submit complaints through a React interface.

\- \*\*AI-Powered Classification:\*\* A machine learning model predicts complaint categories using TF-IDF and Logistic Regression.

\- \*\*Priority Prediction:\*\* AI service predicts complaint priority.

\- \*\*Complaint Tracking:\*\* View complaints and their current status.

\- \*\*Status Management:\*\* Update complaints to OPEN, IN-PROGRESS, or RESOLVED.

\- \*\*Database Integration:\*\* Spring Boot stores complaint records in PostgreSQL.

\- \*\*REST APIs:\*\* Backend communication through REST endpoints.



\## Technology Stack



| Component | Technologies |

|---|---|

| Frontend | React, Vite, JavaScript, CSS |

| Backend | Java, Spring Boot |

| AI Service | Python, FastAPI, scikit-learn |

| Machine Learning | TF-IDF, Logistic Regression |

| Database | PostgreSQL |

| API Testing | Swagger UI, Postman |

| Version Control | Git, GitHub |



\## System Architecture



1\. The user submits a complaint through the React frontend.

2\. The AI service predicts the complaint category and priority.

3\. The Spring Boot backend handles complaint operations.

4\. PostgreSQL stores complaint details and status information.

5\. The frontend displays complaints and their updated statuses.



\## Project Structure



```text

CampusFix/

├── campusfix-frontend/   # React frontend

├── campusfix-backend/    # Spring Boot REST API

└── ai-sevice/            # FastAPI machine learning service

```



\## Running Locally



\### Prerequisites



\- Node.js and npm

\- Java and Maven

\- Python and pip

\- PostgreSQL



\### 1. Start the AI service



```powershell

cd ai-sevice

python -m uvicorn app:app --host 127.0.0.1 --port 8001

```



AI API documentation: http://127.0.0.1:8001/docs



\### 2. Start the Spring Boot backend



Configure your PostgreSQL connection and set the `DB\_PASSWORD` environment variable before starting the backend.



```powershell

cd campusfix-backend

.\\mvnw.cmd spring-boot:run

```



Backend base URL: http://localhost:8080



\### 3. Start the React frontend



Open another terminal:



```powershell

cd campusfix-frontend

npm install

npm run dev

```



Open the local URL displayed by Vite, usually http://localhost:5173.



\## API Endpoints



| Method | Endpoint | Purpose |

|---|---|---|

| GET | `/api/complaints` | Retrieve complaints |

| PUT | `/api/complaints/{id}/status?status=RESOLVED` | Update a complaint's status |

| POST | `/predict` | Predict complaint category and priority through the AI service |



The AI prediction endpoint runs on port `8001`; the complaint endpoints run on port `8080`.



\## Future Improvements



\- Student, administrator, and technician dashboards

\- User authentication and role-based access control

\- Email or in-app notifications

\- Deployment with a hosted database

\- Automated tests and improved error handling



\## Developer



\*\*Vanshika Singh\*\*  

Electrical Engineering Student | Aspiring Software Development Engineer



GitHub: https://github.com/vansie-S



\---



\*Built to make campus issue reporting and resolution more organized and accessible.\*



