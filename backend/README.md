# Backend - Admin Dashboard API

Node.js + Express REST API untuk Universitas Purbayan Admin Dashboard.

## 🚀 Quick Start

\\\ash
npm install
cp .env.example .env
npm run migrate
npm run seed     # Optional: Create default admin user
npm run dev
\\\

Server akan berjalan di \http://localhost:3000\

## 📁 Project Structure

\\\
src/
├── config/        - Configuration files (database, JWT)
├── controllers/   - Request handlers
├── models/        - Sequelize models
├── routes/        - API routes
├── middlewares/   - Express middlewares
├── services/      - Business logic
├── validators/    - Input validation schemas
├── utils/         - Utility functions
├── database/      - Migrations & seeders
└── server.js      - Main app file
\\\

## 🔌 API Endpoints

### Authentication
- \POST /api/auth/login\ - Login user
- \POST /api/auth/logout\ - Logout user
- \GET /api/auth/me\ - Get current user (requires auth)

### Students
- \GET /api/students\ - Get all students (paginated)
- \POST /api/students\ - Create student
- \GET /api/students/:id\ - Get student detail
- \PUT /api/students/:id\ - Update student
- \DELETE /api/students/:id\ - Delete student

## 🔐 Authentication

Use JWT tokens in Authorization header:
\\\
Authorization: Bearer <token>
\\\

## 🗄️ Database

Using Sequelize ORM with MySQL. Configure in \.env\:

\\\
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=universitas_purbayan
\\\

## 🛠️ Available Scripts

- \
pm run dev\ - Start with auto-reload
- \
pm start\ - Start server
- \
pm run migrate\ - Run migrations
- \
pm run seed\ - Seed database
- \
pm run lint\ - Run ESLint

## 📦 Key Dependencies

- **express** - Web framework
- **sequelize** - ORM
- **mysql2** - MySQL driver
- **jsonwebtoken** - JWT auth
- **bcryptjs** - Password hashing
- **joi** - Input validation

---

**Last Updated:** June 5, 2026
