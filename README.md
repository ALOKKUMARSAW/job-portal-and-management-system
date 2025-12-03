# JobApplication - Job Portal System

A full-stack job portal application with User and Admin modules, featuring job posting, application management, and role-based access control.

## Features

### User Module
- ✅ User Registration and Login
- ✅ Browse and Search Jobs
- ✅ View Job Details
- ✅ Apply for Jobs

### Admin Module
- ✅ Admin Registration and Login
- ✅ Add New Job Postings
- ✅ Update Existing Jobs
- ✅ Delete Job Postings
- ✅ View All Applications
- ✅ Manage Applications

## Tech Stack

### Backend
- **Framework**: Spring Boot 3.2.12
- **Language**: Java 21
- **Database**: MySQL
- **ORM**: JPA/Hibernate
- **Package**: `com.alok.jobApplication`

### Frontend
- **Framework**: React 18.2.0
- **UI Library**: Material-UI (MUI) 5.15.0
- **HTTP Client**: Axios
- **Routing**: React Router DOM 6.21.0

## Prerequisites

- Java 21 or higher
- Maven 3.6+
- Node.js 16+ and npm
- MySQL 8.0+
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE jobapp;
```

2. Update database credentials in `spring-boot-rest/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jobapp?useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

## Backend Setup

1. Navigate to the backend directory:
```bash
cd spring-boot-rest
```

2. Build the project:
```bash
mvn clean install
```

3. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Backend API Endpoints

#### Authentication
- `POST /auth/register` - Register new user/admin
- `POST /auth/login` - Login user/admin

#### Jobs (Public)
- `GET /jobPosts` - Get all jobs
- `GET /jobPost/{postId}` - Get job by ID
- `GET /jobPosts/keyword/{keyword}` - Search jobs by keyword

#### Jobs (Admin Only)
- `POST /jobPost` - Create new job (requires ADMIN role)
- `PUT /jobPost` - Update job (requires ADMIN role)
- `DELETE /jobPost/{postId}` - Delete job (requires ADMIN role)

#### Job Applications (User)
- `POST /jobPost/{postId}/apply` - Apply for a job (requires USER role, header: `X-User-Id`)

#### Job Applications (Admin)
- `GET /applications` - Get all applications (requires ADMIN role)
- `GET /applications/job/{jobId}` - Get applications for a job (requires ADMIN role)
- `GET /applications/user/{userId}` - Get applications by user (requires ADMIN role)
- `PUT /applications/{applicationId}/status` - Update application status (requires ADMIN role)

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd React-UI-with-CRUD-master
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## Usage

### For Users

1. **Register**: Click "Register" in the navbar, fill in your details, and select "User" role
2. **Login**: Click "Login" and enter your credentials
3. **Browse Jobs**: View all available jobs on the home page
4. **Search**: Use the search bar to find jobs by keyword
5. **View Details**: Click "Check Details" on any job card
6. **Apply**: Click "Apply for this Job" button on the job details page

### For Admins

1. **Register**: Click "Register" in the navbar, fill in your details, and select "Admin" role
2. **Login**: Click "Login" and enter your credentials
3. **Add Job**: Click "Add Job" button in the navbar (only visible to admins)
4. **Edit Job**: Click the edit icon on any job card (only visible to admins)
5. **Delete Job**: Click the delete icon on any job card (only visible to admins)
6. **View Applications**: Access application management through admin endpoints

## Default Credentials

You can register new users/admins through the registration page. The first admin account should be created manually or through the registration form.

## Project Structure

```
Job-App-main/
├── spring-boot-rest/          # Backend (Spring Boot)
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── alok/
│   │       │           └── jobApplication/
│   │       │               ├── config/      # CORS configuration
│   │       │               ├── controller/  # REST controllers
│   │       │               ├── model/       # Entity models
│   │       │               ├── repo/         # JPA repositories
│   │       │               └── service/     # Business logic
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── React-UI-with-CRUD-master/  # Frontend (React)
    ├── src/
    │   ├── components/        # React components
    │   │   ├── AllPosts.jsx
    │   │   ├── Create.jsx
    │   │   ├── Edit.jsx
    │   │   ├── JobDetails.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/           # React context
    │   │   └── AuthContext.js
    │   └── App.js
    └── package.json
```

## Key Features Implementation

### Authentication & Authorization
- JWT-less session management using localStorage
- Role-based access control (USER/ADMIN)
- Protected routes for admin-only pages

### Job Management
- Full CRUD operations for jobs
- Rich job details with structured data
- Search functionality
- Registration status and countdown timers

### Application Management
- Users can apply for jobs
- Admins can view and manage all applications
- Application status tracking

## Troubleshooting

### Backend Issues
- Ensure MySQL is running and database is created
- Check database credentials in `application.properties`
- Verify Java 21 is installed: `java -version`
- Check port 8080 is not in use

### Frontend Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check if backend is running on port 8080
- Verify CORS configuration allows `http://localhost:3000`

## Notes

- The application uses JPA `ddl-auto=update` which automatically creates/updates database tables
- User sessions are stored in browser localStorage
- Admin routes are protected and redirect non-admin users
- Job application requires user to be logged in

## License

This project is part of the JobApplication system.

## Contact

For issues or questions, please contact the development team.

