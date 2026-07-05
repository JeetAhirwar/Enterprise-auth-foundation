# Enterprise Auth Foundation

> A production-ready, scalable authentication and authorization foundation for Node.js, Express, and MongoDB applications.

![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![Express](https://img.shields.io/badge/Express-5.x-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/JWT-Authentication-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📖 Overview

Enterprise Auth Foundation is a reusable backend authentication starter designed using enterprise-level architecture and best practices.

Instead of rewriting authentication for every project, this repository provides a clean, extensible foundation that can be integrated into any Node.js backend.

The architecture follows separation of concerns using Controllers, Services, Repositories, Middleware, Utilities, and centralized configuration.

---

# ✨ Features

- JWT Authentication
- Refresh Token Authentication
- Role-Based Access Control (RBAC)
- Email Verification
- Forgot Password
- Reset Password
- Change Password
- Secure Cookie Support
- Authentication Middleware
- Authorization Middleware
- Request Validation
- Centralized Error Handling
- Standardized API Responses
- Centralized API Messages
- Repository Pattern
- Service Layer Architecture
- Async Error Handling
- Production Folder Structure
- MongoDB + Mongoose
- Environment Configuration
- Enterprise Coding Standards

---

# 🏗 Project Architecture

```
src/
│
├── config/
├── constants/
├── controllers/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── services/
├── utils/
├── validators/
└── app.js
```

---

# 🧱 Tech Stack

- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT
- bcrypt
- express-validator
- Helmet
- CORS
- Cookie Parser
- Morgan

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/JeetAhirwar/Enterprise-auth-foundation.git
```

```bash
cd Enterprise-auth-foundation
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment

Create a `.env` file.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRES_IN=15m

REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRES_IN=7d

NODE_ENV=development
```

---

## Start Development Server

```bash
npm run dev
```

---

# 📁 Architecture

The project follows the following flow:

```
Routes
    ↓
Controllers
    ↓
Services
    ↓
Repositories
    ↓
Database
```

Cross-cutting concerns:

```
Middleware
Validation
Authentication
Authorization
Error Handling
Response Factory
Message Factory
```

---

# 🔐 Authentication Flow

```
Register
    ↓
Email Verification
    ↓
Login
    ↓
Access Token
    ↓
Protected Routes
    ↓
Refresh Token
    ↓
Logout
```

---

# 📦 Built-in Modules

- Authentication
- Authorization
- User Management
- Token Management
- Validation
- Error Handling
- Response Handling

---

# 📚 API Modules

## Authentication

- Register
- Login
- Logout
- Refresh Token
- Current User
- Change Password
- Forgot Password
- Reset Password
- Verify Email
- Resend Verification Email

---

# 🛡 Security

- Password Hashing
- JWT Authentication
- Refresh Token Rotation
- HTTP Only Cookies
- Helmet Security Headers
- Request Validation
- Protected Routes
- RBAC
- Environment Variables
- Secure Error Handling

---

# 📐 Design Principles

- Separation of Concerns
- Single Responsibility Principle
- Clean Architecture
- Repository Pattern
- Service Layer Pattern
- Reusable Components
- Centralized Configuration
- Production-Ready Structure

---

# 📌 Folder Responsibilities

| Folder | Responsibility |
|---------|----------------|
| controllers | Handle HTTP requests |
| services | Business logic |
| repositories | Database operations |
| middlewares | Authentication, authorization, validation |
| validators | Request validation |
| constants | Application constants |
| config | Configuration files |
| utils | Helper utilities |

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

# ⭐ If you found this project useful

Give this repository a ⭐ on GitHub.

---

# 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Jeet Ahirwar**

GitHub:
https://github.com/JeetAhirwar

---

Built with ❤️ for scalable backend applications.