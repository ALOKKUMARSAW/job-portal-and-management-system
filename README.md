# JobApplication - Job Portal System

A full-stack Job Portal and Management System built using **Spring Boot** and **React.js**.  
The application provides separate **User** and **Admin** modules with secure authentication, job posting management, and application tracking.

---

# 🚀 Features

## 👤 User Module
- ✅ User Registration and Login
- ✅ Browse and Search Jobs
- ✅ View Job Details
- ✅ Apply for Jobs
- ✅ JWT-Based Authentication
- ✅ Responsive User Interface

## 👨‍💼 Admin Module
- ✅ Admin Registration and Login
- ✅ Add New Job Postings
- ✅ Update Existing Jobs
- ✅ Delete Job Postings
- ✅ View All Applications
- ✅ Manage Applications
- ✅ Role-Based Access Control

---

# 📸 Screenshots

### 🏠 Home Page
![Home Page](images/home-page.png)

### 🔐 Login Page
![Login Page](images/login-page.png)

### 📝 Register Page
![Register Page](images/register-page.png)

### 👤 User Dashboard
![User Dashboard](images/user-dashboard.png)

### 👨‍💼 Admin Dashboard
![Admin Dashboard](images/admin-dashboard.png)

### ➕ Admin Add Job - Step 1
![Admin Add Job 1](images/admin-add-job-1.png)

### ➕ Admin Add Job - Step 2
![Admin Add Job 2](images/admin-add-job-2.png)

### ➕ Admin Add Job - Step 3
![Admin Add Job 3](images/admin-add-job-3.png)

### ➕ Admin Add Job - Step 4
![Admin Add Job 4](images/admin-add-job-4.png)

### 💾 Save Job Page
![Save Job](images/save-job.png)

### 📧 Application Email Notification
![Application Mail](images/application-mail.png)

---

# 🛠️ Tech Stack

## Backend
- **Framework:** Spring Boot 3.2.12
- **Language:** Java 21
- **Database:** MySQL
- **ORM:** JPA/Hibernate
- **Security:** Spring Security with JWT
- **Email:** Spring Boot Mail Starter
- **Utilities:** Lombok
- **Package:** `com.alok.jobApplication`

## Frontend
- **Framework:** React 18.2.0
- **UI Library:** Material-UI (MUI) 5.15.0
- **HTTP Client:** Axios
- **Routing:** React Router DOM 6.21.0
- **Animations:** React TSParticles

---

# 📋 Prerequisites

- Java 21 or higher
- Maven 3.6+
- Node.js 16+ and npm
- MySQL 8.0+
- IntelliJ IDEA / Eclipse / VS Code

---

# 🗄️ Database Setup

Create a MySQL database:

```sql
CREATE DATABASE jobapp;
```

Update database credentials in:

```properties
Backend-SpringBoot/src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jobapp?useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

---

# ⚙️ Backend Setup

Navigate to backend directory:

```bash
cd Backend-SpringBoot
```

Build the project:

```bash
mvn clean install
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

---

# 💻 Frontend Setup

Navigate to frontend directory:

```bash
cd Frontend-React
```

Install dependencies:

```bash
npm install
```

Run the React application:

```bash
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 🔐 Backend API Endpoints

## Authentication
```http
POST /auth/register
POST /auth/login
```

## Jobs (Public)
```http
GET /jobPosts
GET /jobPost/{postId}
GET /jobPosts/keyword/{keyword}
```

## Jobs (Admin Only)
```http
POST /jobPost
PUT /jobPost
DELETE /jobPost/{postId}
```

## Job Applications (User)
```http
POST /jobPost/{postId}/apply
```

## Job Applications (Admin)
```http
GET /applications
GET /applications/job/{jobId}
GET /applications/user/{userId}
PUT /applications/{applicationId}/status
```

---

# 👨‍💻 Usage

## For Users
1. Register a new account
2. Login using credentials
3. Browse available jobs
4. Search jobs using keywords
5. View detailed job descriptions
6. Apply for jobs

## For Admins
1. Register/Login as Admin
2. Add new jobs
3. Edit existing jobs
4. Delete job postings
5. View all applications
6. Manage candidate applications

---

📂 Project Structure

```bash
job-portal-and-management-system/
│
├── images/                         # Project screenshots
│   ├── home-page.png
│   ├── login-page.png
│   ├── register-page.png
│   ├── user-dashboard.png
│   ├── admin-dashboard.png
│   ├── admin-add-job-1.png
│   ├── admin-add-job-2.png
│   ├── admin-add-job-3.png
│   ├── admin-add-job-4.png
│   ├── save-job.png
│   └── application-mail.png
│
├── Backend-SpringBoot/             # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/alok/jobApplication/
│   │       │       ├── config/
│   │       │       ├── controller/
│   │       │       ├── enums/
│   │       │       ├── filter/
│   │       │       ├── model/
│   │       │       ├── repo/
│   │       │       ├── service/
│   │       │       └── util/
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   └── pom.xml
│
├── Frontend-React/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   ├── pages/
│   │   └── App.js
│   │
│   └── package.json
│
└── README.md

# 🔑 Key Features Implementation

## Authentication & Authorization
- JWT-Based Authentication
- Spring Security Integration
- Role-Based Access Control
- Protected Admin Routes
- Token Validation & Expiration Handling

## Job Management
- Full CRUD Operations
- Dynamic Job Details
- Search Functionality
- Registration Status Handling

## Application Management
- Users can apply for jobs
- Admins can manage all applications
- Application status tracking

---

# 🛠️ Troubleshooting

## Backend Issues
- Ensure MySQL is running
- Verify database credentials
- Check Java version:

```bash
java -version
```

- Ensure port `8080` is free

## Frontend Issues

Clear dependencies and reinstall:

```bash
rm -rf node_modules
npm install
```

Verify:
- Backend is running on port `8080`
- CORS allows `http://localhost:3000`

---

# 📝 Notes

- Uses `spring.jpa.hibernate.ddl-auto=update`
- JWT tokens stored in browser localStorage
- Admin routes are protected
- Email notifications supported
- Responsive UI for desktop and mobile

---

# 📄 License

This project is developed for learning and portfolio purposes.

---

# 📬 Contact

For issues or suggestions, feel free to connect.
