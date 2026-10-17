# CampusFix AI - Smart Campus Complaint Management System



CampusFix AI is a web-based complaint management system that helps students report campus issues and track their resolution. It uses machine learning to predict complaint categories and priorities.



## Features



- **Complaint Submission:** Submit campus complaints through a React interface.

- **AI-Powered Classification:** Predict complaint categories using TF-IDF and Logistic Regression.

- **Priority Prediction:** Predict complaint priority using the AI service.

- **Complaint Tracking:** View complaints and their current status.

- **Status Management:** Update complaints to OPEN, IN-PROGRESS, or RESOLVED.

- **Database Integration:** Store complaint records in PostgreSQL through Spring Boot.

- **REST APIs:** Communicate between services using REST endpoints.



## Technology Stack

- **Frontend:** React, Vite, JavaScript, CSS
- **Backend:** Java, Spring Boot
- **AI Service:** Python, FastAPI, scikit-learn
- **Machine Learning:** TF-IDF, Logistic Regression
- **Database:** PostgreSQL
- **API Testing:** Swagger UI, Postman
- **Version Control:** Git, GitHub

## System Architecture



1. Users submit complaints through the React frontend.

2. The AI service predicts the complaint category and priority.

3. The Spring Boot backend handles complaint operations.

4. PostgreSQL stores complaint details and status information.

5. The frontend displays complaints and their updated statuses.



## Project Structure

```text
CampusFix/
|-- campusfix-frontend/   - React frontend
|-- campusfix-backend/    - Spring Boot REST API
|-- ai-sevice/            - FastAPI machine learning service
```


## Running Locally



### Prerequisites



- Node.js and npm

- Java and Maven

- Python and pip

- PostgreSQL



### 1. Start the AI service



Open a terminal in the project root and run:



```powershell

cd ai-sevice

python -m uvicorn app:app --host 127.0.0.1 --port 8001

```



AI API documentation: http://127.0.0.1:8001/docs



### 2. Start the Spring Boot backend



Open a second terminal in the project root. Configure PostgreSQL and set the `DB_PASSWORD` environment variable first.



```powershell

cd campusfix-backend

.\\mvnw.cmd spring-boot:run

```



Backend base URL: http://localhost:8080



### 3. Start the React frontend



Open a third terminal in the project root:



```powershell

cd campusfix-frontend

npm install

npm run dev

```



Open the local URL shown by Vite, usually http://localhost:5173.


## API Endpoints

### Spring Boot Backend

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/complaints` | Retrieve all complaints |
| PUT | `/api/complaints/{id}/status?status=RESOLVED` | Update a complaint's status |

Base URL: `http://localhost:8080`

### FastAPI AI Service

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/predict` | Predict complaint category and priority |

Base URL: `http://127.0.0.1:8001`

Interactive API documentation: `http://127.0.0.1:8001/docs`

The Spring Boot backend runs on port `8080`, while the AI service runs on port `8001`.



## Future Improvements



- Student, administrator, and technician dashboards

- User authentication and role-based access control

- Email or in-app notifications

- Deployment with a hosted database

- Automated tests and improved error handling



## Developer



**Vanshika Singh**  

Electrical Engineering Student | Aspiring Software Development Engineer



GitHub: https://github.com/vansie-S



---



*Built to make campus issue reporting and resolution more organized and accessible.*





