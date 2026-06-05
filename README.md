# Web-Univ: Universitas Purbayan Admin Dashboard

Admin Dashboard untuk Universitas Purbayan yang dibangun dengan **React + Vite** (Frontend) dan **Node.js + Express** (Backend).

## 📦 Project Structure

\\\
Web-Univ/
├── frontend/          # React + Vite admin dashboard
├── backend/           # Node.js + Express REST API
├── README.md
├── .gitignore
└── package.json       # Root package.json (optional, for scripts)
\\\

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ & npm/yarn
- MySQL 8+
- Git

### Frontend Setup
\\\ash
cd frontend
npm install
npm run dev
\\\
Akan berjalan di \http://localhost:5173\

### Backend Setup
\\\ash
cd backend
npm install
cp .env.example .env
npm run migrate
npm run seed        # Optional
npm run dev
\\\
Akan berjalan di \http://localhost:3000/api\

## 📖 Documentation

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## 🏗️ Architecture

### Database Models
- Users (Authentication)
- Students
- Teachers
- Admins
- Headmasters
- Announcements
- News
- Facilities
- Cooperations
- Content (Greetings, Histories, About Me, Vision/Mission)
- Footers

### API Endpoints
RESTful API dengan JWT authentication.

## 👥 Development

### Branch Strategy
- \main\ - Production-ready code
- \develop\ - Development branch
- \eature/*\ - Feature branches

### Commit Convention
\\\
[FEAT] Feature description
[FIX] Bug fix description
[DOCS] Documentation update
[STYLE] Styling/formatting changes
[REFACTOR] Code refactoring
[TEST] Test changes
\\\

## 📝 License

MIT License

---

**Last Updated:** June 5, 2026
