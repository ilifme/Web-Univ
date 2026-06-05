# API Documentation - Web-Univ Backend

Complete REST API documentation untuk Universitas Purbayan Admin Dashboard.

## 📋 Base URL

```
http://localhost:3000/api
```

## 🔐 Authentication

Semua endpoint kecuali `/auth/login` memerlukan JWT token di header:

```
Authorization: Bearer <your_jwt_token>
```

**Token Expiry:** 24 jam (configurable di `.env`)

---

## 🔑 Authentication Endpoints

### Login

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "admin@universitas.ac.id",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "Admin",
      "email": "admin@universitas.ac.id",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (404/401):**
```json
{
  "success": false,
  "message": "User not found" or "Invalid password"
}
```

---

### Logout

**Endpoint:** `POST /auth/logout`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful",
  "data": null
}
```

---

### Get Current User

**Endpoint:** `GET /auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "user": {
      "id": 1,
      "name": "Admin",
      "email": "admin@universitas.ac.id",
      "role": "admin",
      "createdAt": "2026-06-05T10:00:00Z",
      "updatedAt": "2026-06-05T10:00:00Z"
    }
  }
}
```

---

## 👥 Students Endpoints

### List Students

**Endpoint:** `GET /students`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search by name, email, or NISN

**Example:**
```
GET /students?page=1&limit=10&search=john
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "students": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "08123456789",
        "nisn": "0012345678",
        "address": "Jl. Example No.1",
        "class": "XI-A",
        "createdAt": "2026-06-05T10:00:00Z",
        "updatedAt": "2026-06-05T10:00:00Z"
      }
    ],
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 10,
      "pages": 5
    }
  }
}
```

---

### Get Student by ID

**Endpoint:** `GET /students/:id`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "student": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "08123456789",
      "nisn": "0012345678",
      "address": "Jl. Example No.1",
      "class": "XI-A",
      "createdAt": "2026-06-05T10:00:00Z",
      "updatedAt": "2026-06-05T10:00:00Z"
    }
  }
}
```

---

### Create Student

**Endpoint:** `POST /students`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "08123456789",
  "nisn": "0012345678",
  "address": "Jl. Example No.1",
  "class": "XI-A"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Student created",
  "data": {
    "student": {
      "id": 1,
      "name": "John Doe",
      ...
    }
  }
}
```

---

### Update Student

**Endpoint:** `PUT /students/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:** (same as Create Student)

**Response (200):**
```json
{
  "success": true,
  "message": "Student updated",
  "data": {
    "student": { ... }
  }
}
```

---

### Delete Student

**Endpoint:** `DELETE /students/:id`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Student deleted",
  "data": null
}
```

---

## 🏫 Teachers Endpoints

### List Teachers

**Endpoint:** `GET /teachers`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search by name, email, or NIP

**Response:** Similar to Students (see above)

---

### Get Teacher by ID

**Endpoint:** `GET /teachers/:id`

---

### Create Teacher

**Endpoint:** `POST /teachers`

**Request Body:**
```json
{
  "name": "Budi Santoso",
  "email": "budi@universitas.ac.id",
  "phone": "08987654321",
  "nip": "1234567890123456",
  "subject": "Mathematics",
  "address": "Jl. Guru No.5"
}
```

---

### Update Teacher

**Endpoint:** `PUT /teachers/:id`

---

### Delete Teacher

**Endpoint:** `DELETE /teachers/:id`

---

## 👔 Admins Endpoints

### List Admins

**Endpoint:** `GET /admins`

**Query Parameters:** Same as Students

**Response:** Similar structure (excludes password)

---

### Get Admin by ID

**Endpoint:** `GET /admins/:id`

---

### Create Admin

**Endpoint:** `POST /admins`

**Request Body:**
```json
{
  "name": "Super Admin",
  "email": "superadmin@universitas.ac.id",
  "password": "securepassword123",
  "phone": "08111111111",
  "role": "admin",
  "status": "active"
}
```

**Notes:**
- Password akan otomatis di-hash dengan bcrypt
- Email harus unique
- Role: "admin" atau "superadmin"
- Status: "active" atau "inactive"

---

### Update Admin

**Endpoint:** `PUT /admins/:id`

**Request Body:** (same as Create)

**Notes:**
- Password akan di-hash ulang jika diubah
- Email validation tetap berlaku

---

### Delete Admin

**Endpoint:** `DELETE /admins/:id`

---

## 👨‍💼 Headmasters Endpoints

### List Headmasters

**Endpoint:** `GET /headmasters`

**Query Parameters:** Same as Students

---

### Get Headmaster by ID

**Endpoint:** `GET /headmasters/:id`

---

### Create Headmaster

**Endpoint:** `POST /headmasters`

**Request Body:**
```json
{
  "name": "Dr. Kepala Sekolah",
  "email": "kepala@universitas.ac.id",
  "phone": "08222222222",
  "nip": "1111111111111111",
  "address": "Jl. Kepala No.10",
  "bio": "Biografi kepala sekolah..."
}
```

---

### Update Headmaster

**Endpoint:** `PUT /headmasters/:id`

---

### Delete Headmaster

**Endpoint:** `DELETE /headmasters/:id`

---

## 📊 Pagination

Semua LIST endpoints mengembalikan pagination info:

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "students": [...],
    "pagination": {
      "total": 100,        // Total items
      "page": 1,           // Current page
      "limit": 10,         // Items per page
      "pages": 10          // Total pages
    }
  }
}
```

**Usage:**
```
GET /students?page=2&limit=15
```

---

## 🔍 Search

Gunakan query parameter `search` untuk mencari data:

```
GET /students?search=john
GET /teachers?search=mathematics
GET /admins?search=admin@example.com
```

Search melakukan `LIKE` pattern matching pada fields utama (name, email, NISN/NIP).

---

## ❌ Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Invalid token"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Student not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## 🧪 Testing dengan curl

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@universitas.ac.id",
    "password": "password123"
  }'
```

### Get Students (dengan token)

```bash
TOKEN="your_token_here"
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/students
```

### Create Student

```bash
TOKEN="your_token_here"
curl -X POST http://localhost:3000/api/students \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "nisn": "0012345679",
    "class": "X-B"
  }'
```

### Update Student

```bash
TOKEN="your_token_here"
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Updated",
    "class": "XI-A"
  }'
```

### Delete Student

```bash
TOKEN="your_token_here"
curl -X DELETE http://localhost:3000/api/students/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📚 Testing dengan Postman

1. **Create Environment:**
   - Variable: `baseUrl` = `http://localhost:3000/api`
   - Variable: `token` = `` (leave empty)

2. **Login Request:**
   - Method: POST
   - URL: `{{baseUrl}}/auth/login`
   - Body (JSON):
     ```json
     {
       "email": "admin@universitas.ac.id",
       "password": "password123"
     }
     ```
   - Tests tab:
     ```javascript
     var jsonData = pm.response.json();
     pm.environment.set("token", jsonData.data.token);
     ```

3. **Use token di requests lainnya:**
   - Headers: `Authorization: Bearer {{token}}`

---

## 🔄 Database Models

### User (for auth)
- id, name, email, password, role, createdAt, updatedAt

### Student
- id, name, email, phone, nisn, address, class, createdAt, updatedAt

### Teacher
- id, name, email, phone, nip, subject, address, createdAt, updatedAt

### Admin
- id, name, email, password, phone, role, status, createdAt, updatedAt

### Headmaster
- id, name, email, phone, nip, address, bio, createdAt, updatedAt

---

## 📝 Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

## 🔒 Security Notes

1. **Never expose tokens** in URLs or logs
2. **Always use HTTPS** in production
3. **Token expiry:** 24 hours (set via JWT_EXPIRE)
4. **Password hashing:** bcrypt with 10 rounds
5. **CORS:** Configured to only accept from frontend origin
6. **Helmet:** Security headers enabled

---

**Last Updated:** June 5, 2026

For questions or issues, refer to the main README or SETUP guide.
