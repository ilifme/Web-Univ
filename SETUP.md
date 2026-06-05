# 🚀 Setup Guide - Web-Univ Project

Complete setup instructions untuk Universitas Purbayan Admin Dashboard (React + Node.js).

## 📋 Prerequisites

Pastikan sudah install:
- **Node.js** v18+ ([download](https://nodejs.org/))
- **MySQL** v8+ ([download](https://dev.mysql.com/downloads/mysql/))
- **Git** ([download](https://git-scm.com/))

### Verifikasi Instalasi

```bash
node --version      # Should be v18+
npm --version       # Should be v9+
mysql --version     # Should be v8+
git --version       # Any recent version
```

---

## 📦 Database Setup

### 1. Create Database & User

Buka MySQL client dan jalankan:

```sql
-- Create database
CREATE DATABASE universitas_purbayan;

-- Create user (optional, gunakan root jika tidak ada password)
CREATE USER 'univ_admin'@'localhost' IDENTIFIED BY 'your_secure_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON universitas_purbayan.* TO 'univ_admin'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Update Backend .env

Edit `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root              # atau univ_admin
DB_PASSWORD=              # atau your_secure_password
DB_NAME=universitas_purbayan
```

---

## 🔧 Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Run Database Migrations

```bash
npm run migrate
```

Expected output:
```
✓ Database connected
✓ Database migrations completed successfully
```

### 3. Seed Default Admin User (Optional)

```bash
npm run seed
```

**Default Admin Credentials:**
- Email: `admin@universitas.ac.id`
- Password: `password123`

### 4. Start Backend Server

```bash
npm run dev
```

Expected output:
```
Server running on http://localhost:3000
API available at http://localhost:3000/api
```

**Test health endpoint:**
```bash
curl http://localhost:3000/health
```

---

## 🎨 Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Expected output:
```
VITE v5.0.8  ready in 245 ms

➜  Local:   http://localhost:5173/
```

Open `http://localhost:5173/` di browser.

---

## 🚀 Running Both Simultaneously

Dari root folder, jalankan:

```bash
npm run dev
```

Ini akan menjalankan frontend dan backend bersamaan di terminal terpisah.

---

## 🧪 Testing Login

### 1. Frontend

1. Navigate ke `http://localhost:5173/`
2. Anda akan diarahkan ke halaman login
3. Login dengan credentials:
   - Email: `admin@universitas.ac.id`
   - Password: `password123`
4. Setelah sukses, redirect ke dashboard

### 2. API Direct

```bash
# Test login endpoint
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@universitas.ac.id",
    "password": "password123"
  }'

# Response akan include token:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {...},
    "token": "eyJhbGc..."
  }
}
```

### 3. Use Token untuk Protected Routes

```bash
# Get current user (requires auth)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/auth/me
```

---

## 📁 Project Structure Quick Reference

```
Web-Univ/
├── backend/
│   ├── src/
│   │   ├── config/         # Database & JWT config
│   │   ├── controllers/    # API logic
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Auth, error handling
│   │   ├── utils/          # Helpers
│   │   └── server.js       # Main server file
│   ├── .env                # Environment variables
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API calls
│   │   ├── context/        # React Context
│   │   ├── styles/         # CSS
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                # Environment variables
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
│
└── README.md
```

---

## 🔒 Environment Variables

### Backend (.env)

```env
NODE_ENV=development
PORT=3000
API_PREFIX=/api

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=universitas_purbayan

# JWT
JWT_SECRET=universitas-purbayan-secret-key-2026
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d

# Upload
UPLOAD_PATH=./public/uploads
MAX_FILE_SIZE=5242880

# CORS
CORS_ORIGIN=http://localhost:5173

# Logging
LOG_LEVEL=debug
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 🐛 Troubleshooting

### MySQL Connection Error

**Error:** `ConnectionRefusedError: connect ECONNREFUSED`

**Solutions:**
1. Pastikan MySQL running: `mysql -u root -p` (bisa connect?)
2. Check host/port di `.env`
3. Restart MySQL service

**Windows:**
```bash
net start MySQL80          # Start MySQL
net stop MySQL80           # Stop MySQL
```

**Mac/Linux:**
```bash
brew services start mysql  # Start
brew services stop mysql   # Stop
```

### Port Already in Use

**Error:** `Error: listen EADDRINUSE :::3000`

**Solutions:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change PORT in .env to 3001, 3002, etc
```

### Dependencies Won't Install

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### CORS Errors in Frontend

**Solution:** Make sure `CORS_ORIGIN` in backend `.env` matches frontend URL:
```env
CORS_ORIGIN=http://localhost:5173
```

---

## 📊 API Endpoints Reference

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user (auth required)

### Students (auth required)
- `GET /api/students?page=1&limit=10&search=name` - List students
- `POST /api/students` - Create student
- `GET /api/students/:id` - Get student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

---

## 📝 Available npm Scripts

### Root
```bash
npm run dev                 # Run frontend + backend
npm run frontend:dev        # Frontend only
npm run backend:dev         # Backend only
npm run install:all         # Install all dependencies
```

### Backend
```bash
npm run dev                 # Start with hot-reload
npm run start               # Start production
npm run migrate             # Run database migrations
npm run seed                # Seed database
npm run lint                # Run ESLint
```

### Frontend
```bash
npm run dev                 # Start dev server
npm run build               # Build for production
npm run preview             # Preview production build
npm run lint                # Run ESLint
```

---

## 🚢 Deployment (Future)

Untuk production deployment, lihat:
- [Backend Deployment](./backend/README.md#deployment)
- [Frontend Deployment](./frontend/README.md#deployment)

---

## 💡 Tips

1. **Auto-reload:** Backend uses `--watch` flag, frontend uses Vite hot-reload
2. **Database:** Perubahan model otomatis di-sync dengan `alter: false` (untuk production, set `false`)
3. **JWT:** Token expire setelah 24 jam, ubah di `.env` sesuai kebutuhan
4. **CORS:** Jangan gunakan `*` di production, specify domain yang allowed

---

## 📞 Common Issues

| Issue | Solution |
|-------|----------|
| `Module not found` | Run `npm install` di folder yang error |
| `Cannot find .env` | Copy dari `.env.example` atau lihat bagian Environment Variables |
| `Port 3000/5173 in use` | Kill process atau ubah PORT di .env |
| `MySQL not found` | Install MySQL atau ubah DB config ke SQLite |
| `Token expired` | Login ulang untuk refresh token |

---

## 📚 Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [PRD Document](../PRD-React-NodeJS-Admin-Dashboard.md)

---

## ✅ Verification Checklist

Setelah setup, pastikan:
- [ ] MySQL running dan database `universitas_purbayan` exist
- [ ] Backend server running di port 3000
- [ ] Frontend running di port 5173
- [ ] Bisa login dengan admin credentials
- [ ] Dashboard menampilkan dengan benar
- [ ] API endpoints respond dengan data

---

**Last Updated:** June 5, 2026

**Need Help?** Check the troubleshooting section or see README files in each folder.
