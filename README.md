# **Assignment Submission Portal**

A backend system for managing assignment submissions, allowing users to upload assignments and admins to accept or reject them. The system uses Node.js, Express, and MongoDB for storage, and JWT for authentication.

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Variables](#environment-variables)
5. [Project Structure](#project-structure)
6. [API Documentation](#api-documentation)
   - [User Endpoints](#user-endpoints)
   - [Admin Endpoints](#admin-endpoints)
7. [Database Schema](#database-schema)
8. [Error Handling](#error-handling)
9. [Testing](#testing)


## **Project Overview**

The Assignment Submission Portal allows two types of users: **Users** and **Admins**.

- **Users** can:
  - Register and log in.
  - Upload assignments to the portal.
  
- **Admins** can:
  - Register and log in.
  - View assignments tagged to them.
  - Accept or reject assignments.

## **Features**

- User and Admin registration and login.
- JWT-based authentication and authorization.
- Secure role-based access control for users and admins.
- Validation for input data and error handling.
- Modular code structure for scalability and maintainability.

## **Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (local or MongoDB Atlas)
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Express Validator
- **Environment Management**: dotenv

## **Getting Started**

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or above)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (either locally or MongoDB Atlas)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/assignment-submission-portal.git
   cd assignment-submission-portal
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup environment variables**:
   Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/assignment_portal  # For local MongoDB setup
   JWT_SECRET=your_jwt_secret_here
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

   The server will start on `http://localhost:5000`.

### Environment Variables

| Variable    | Description                                   |
|-------------|-----------------------------------------------|
| PORT        | Port on which the server will run            |
| MONGO_URI   | MongoDB connection string                    |
| JWT_SECRET  | Secret key for signing JWTs                  |

## **Project Structure**

```
src
├── config
│   └── db.js           # Database connection setup
├── controllers
│   ├── authController.js # Authentication logic
│   └── assignmentController.js # Assignment management logic
├── middleware
│   ├── authMiddleware.js # JWT authentication middleware
│   └── errorMiddleware.js # Error handling middleware
├── models
│   ├── User.js          # User model
│   └── Assignment.js    # Assignment model
├── routes
│   ├── authRoutes.js    # Auth routes for users and admins
│   └── assignmentRoutes.js # Routes for managing assignments
├── utils
│   └── validators.js    # Input validation functions
└── app.js               # Main application file
```

## **API Documentation**

### User Endpoints

| Method | Endpoint         | Description                   | Auth Required |
|--------|------------------|-------------------------------|---------------|
| POST   | `/api/auth/register` | Register a new user/admin | No            |
| POST   | `/api/auth/login`    | Login and receive a token | No            |
| POST   | `/api/upload`        | Upload an assignment       | Yes (User)    |
| GET    | `/api/admins`        | Fetch all admins           | Yes (User)    |

### Admin Endpoints

| Method | Endpoint                      | Description                   | Auth Required |
|--------|------------------------------|-------------------------------|---------------|
| GET    | `/api/assignments`          | View assignments tagged       | Yes (Admin)   |
| POST   | `/api/assignments/:id/accept` | Accept an assignment          | Yes (Admin)   |
| POST   | `/api/assignments/:id/reject` | Reject an assignment          | Yes (Admin)   |

## **Database Schema**

### User Schema

```javascript
{
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], required: true }
}
```

### Assignment Schema

```javascript
{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    task: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
}
```

## **Error Handling**

- All errors are caught by a centralized error-handling middleware (`errorMiddleware.js`) and return appropriate JSON responses.
- Validation errors, authentication errors, and other server errors will have a consistent error response structure.

## **Testing**

Use **Postman** or **cURL** to test the endpoints:
- Register users/admins: `POST /api/auth/register`
- Login users/admins: `POST /api/auth/login`
- Upload assignment: `POST /api/upload`
- View assignments for admins: `GET /api/assignments`
- Accept or reject assignments: `POST /api/assignments/:id/accept` or `/reject`

