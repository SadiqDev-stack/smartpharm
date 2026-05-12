# Simple Business Website

A modern full-stack business website application with user authentication, contact management, and AI-powered assistant features. Built with **Node.js/Express** backend and **React/Vite** frontend.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## ✨ Features

### User Management
- User registration and authentication
- Email verification system
- Password reset functionality
- User profile management
- JWT-based authentication with secure cookies

### Contact Management
- Contact form submissions from public users
- Admin contact history with pagination
- Filter and search contacts
- Mark contacts as read/unread
- Bulk contact management

### AI Assistant
- AI-powered responses for customer inquiries
- Admin response drafting assistant
- User chat dashboard with AI support

### Security
- Email verification before full account access
- Password hashing with bcryptjs
- CORS protection
- Rate limiting on API endpoints
- Input sanitization

---

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer
- **Utilities**: 
  - bcryptjs for password hashing
  - cookie-parser for session management
  - express-rate-limit for rate limiting

### Frontend
- **Library**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Form Management**: React Hook Form
- **HTTP Client**: Axios
- **Icons**: Lucide React, React Icons

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **MongoDB** (local or Atlas cloud)
- **Git**

### Check Versions
```bash
node --version
npm --version
```

---

## 📁 Project Structure

```
simplebusinesswebsite/
├── backend/                          # Backend application
│   ├── controllers/                  # Request handlers
│   │   ├── userController.js        # User operations (auth, profile)
│   │   ├── contactController.js     # Contact form handling
│   │   └── assistantController.js   # AI assistant responses
│   ├── models/                       # Database models
│   │   ├── user.js                  # User schema
│   │   └── contact.js               # Contact schema
│   ├── routers/                      # API routes
│   │   ├── user.js                  # User endpoints
│   │   ├── contact.js               # Contact endpoints
│   │   └── assistant.js             # Assistant endpoints
│   ├── middlewares/                  # Express middlewares
│   │   ├── authentication.js        # User login validation
│   │   ├── authorization.js         # JWT verification
│   │   ├── error.js                 # Error handling
│   │   ├── logger.js                # Logging utility
│   │   └── dbhandler.js             # Database connection
│   ├── services/                     # Business logic
│   │   ├── mail.js                  # Email sending
│   │   └── assistant.js             # AI service integration
│   ├── utilities/
│   │   └── general.js               # Helper functions
│   ├── .env                         # Environment variables
│   ├── package.json
│   └── server.js                    # Entry point
│
├── frontend/                         # React application
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── Navigation.jsx
│   │   │   ├── ProtectedRoute.jsx   # Auth wrapper
│   │   │   ├── FormComponents.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── ContactCard.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Contacts.jsx
│   │   │   └── Message.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Auth state management
│   │   ├── hooks/
│   │   │   └── useAuth.js           # Auth hook
│   │   ├── services/
│   │   │   └── api.js               # API calls
│   │   ├── utils/
│   │   │   └── helpers.js           # Utility functions
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css
│   ├── .env                         # Environment variables
│   ├── package.json
│   └── vite.config.js
│
└── README.md                        # This file
```

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/SmartPharm/smartpharmapp.git
cd smartpharmapp
```

### Step 2: Backend Setup

#### 2a. Install Dependencies
```bash
cd backend
npm install
```

#### 2b. Configure Environment Variables
Create a `.env` file in the `backend` directory:

```env
# Server
PORT=8080
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/simplebusinesswebsite
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT
JWT_SECRET=your_jwt_secret_key_here_change_this_to_something_secure

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# Admin Email
ADMIN_EMAIL=admin@yourdomain.com

# Cookie
LOGIN_EXPIRE=7d

# Domain (for email links)
DOMAIN=http://localhost:3000

# AI API (optional) use the groq api
AI_API_KEY=your_ai_api_key
AI_MODEL=model_name
AI_ENDPOINT=api_endpoint
```

#### 2c. Verify MongoDB Connection
Ensure MongoDB is running:
- **Local**: `mongod` should be running on `localhost:27017`
- **Cloud**: Use MongoDB Atlas connection string in `MONGODB_URI`

### Step 3: Frontend Setup

#### 3a. Install Dependencies
```bash
cd frontend
npm install
```

#### 3b. Configure Environment Variables
Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:8080/api
```

---

## 📱 Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

Expected output:
```
Server running on port 8080
Connected to MongoDB
```

The backend will be available at: `http://localhost:8080`

### Start Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

Expected output:
```
  VITE v8.0.10  ready in 123 ms

  ➜  Local:   http://localhost:5173/
```

The frontend will be available at: `http://localhost:5173`

### Access the Application

1. Open your browser and navigate to: **http://localhost:5173**
2. Create an account or login
3. Verify your email
4. Access the dashboard

---

## 🔌 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication
All protected endpoints require:
- `Authorization: Bearer <token>` header OR
- `token` cookie set automatically after login

### User Endpoints

#### Register
```
POST /user/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+234XXXXXXXXXX",
  "address": "123 Main St",
  "gender": "male",
  "country": "nigeria"
}

Response: 201 Created
{
  "success": true,
  "message": "Registration Successful...",
  "redirect": "/message?..."
}
```

#### Login
```
POST /user/authenticate
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "success": true,
  "user": { ... },
  "redirect": "/user/dashboard",
  "message": "Logged In Successfully..."
}
```

#### Get Profile (Protected)
```
GET /user/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "user": { ... }
}
```

#### Logout (Protected)
```
POST /user/logout
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "you successfully logged out!"
}
```

#### Reset Password
```
POST /user/reset/email
Content-Type: application/json

{
  "email": "john@example.com",
  "newPassword": "newPassword123"
}

Response: 200 OK
{
  "success": true,
  "message": "Successful, Please Wait!",
  "redirect": "/message?..."
}
```

### Contact Endpoints

#### Submit Contact Form (Public)
```
POST /contact/submit
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Inquiry",
  "issue": "Product Question",
  "message": "I have a question about...",
  "priority": "high"
}

Response: 201 Created
{
  "success": true,
  "message": "We received your email..."
}
```

#### Get Contact History (Protected - Admin)
```
GET /contact/history?page=1&limit=20&search=term&seen=false
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": {
    "contacts": [...],
    "pagination": {
      "total": 50,
      "page": 1,
      "totalPages": 3,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### Mark Contact as Seen (Protected)
```
PUT /contact/see
Authorization: Bearer <token>
Content-Type: application/json

{
  "contactId": "507f1f77bcf86cd799439011"
}

Response: 200 OK
{
  "success": true,
  "data": { "contact": {...} }
}
```

### Assistant Endpoints

#### Get AI Response (Protected)
```
POST /assistant
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "How can I help with this?",
  "contactData": { ... }
}

Response: 200 OK
{
  "success": true,
  "message": "AI response text..."
}
```

---

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `8080` |
| `MONGODB_URI` | MongoDB connection | `mongodb://localhost:27017/db` |
| `JWT_SECRET` | JWT signing key | `your_secret_key` |
| `EMAIL_USER` | Email sender address | `your_email@gmail.com` |
| `EMAIL_PASSWORD` | Email app password | `xxxx xxxx xxxx xxxx` |
| `ADMIN_EMAIL` | Admin email address | `admin@domain.com` |
| `LOGIN_EXPIRE` | Session expiry | `7d` |
| `DOMAIN` | App domain for email links | `http://localhost:3000` |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8080/api` |

---

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String (unique),
  address: String,
  gender: "male" | "female",
  country: String,
  emailVerified: Boolean,
  active: Boolean,
  role: "user" | "super",
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Model
```javascript
{
  name: String,
  email: String,
  subject: String,
  issue: String,
  message: String,
  priority: "low" | "medium" | "high",
  seen: Boolean,
  createdAt: Date
}
```

---

## 🐛 Troubleshooting

### Backend Won't Start
**Problem**: `Cannot connect to MongoDB`
- ✅ Ensure MongoDB is running: `mongod`
- ✅ Check `MONGODB_URI` in `.env` is correct
- ✅ Verify MongoDB credentials if using Atlas

**Problem**: `Port 8080 already in use`
- ✅ Change `PORT` in `.env` to another port (e.g., `8081`)
- ✅ Or kill the process: `lsof -i :8080` then `kill -9 <PID>`

### Frontend Won't Connect to Backend
**Problem**: `API calls failing with CORS error`
- ✅ Ensure backend is running on `http://localhost:8080`
- ✅ Check `VITE_API_URL` in frontend `.env` is correct
- ✅ Verify CORS middleware is enabled in backend

**Problem**: `Blank white screen`
- ✅ Open browser console (F12) for errors
- ✅ Clear cache and rebuild: `npm run build`

### Authentication Issues
**Problem**: `Getting logged out on page refresh`
- ✅ Check if JWT token is being set as cookie
- ✅ Verify `JWT_SECRET` is consistent
- ✅ Check browser cookie settings (not blocking third-party cookies)

**Problem**: `Email verification not working`
- ✅ Check `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`
- ✅ If using Gmail, enable "App Passwords"
- ✅ Check spam/junk folder for verification email

### Email Not Sending
**Problem**: `Nodemailer connection failed`
- ✅ Gmail: Use [App Password](https://myaccount.google.com/apppasswords)
- ✅ Check firewall/ISP not blocking SMTP port 587
- ✅ Verify credentials in `.env`

---

## 🏗 Building for Production

### Build Backend (Static Serving)
```bash
cd backend
# No build step needed, it's a Node.js server
# Just deploy with `npm start` or your hosting service
```

### Build Frontend
```bash
cd frontend
npm run build
```

Output files will be in `frontend/dist/`

### Deploy
- **Backend**: Deploy to Heroku, Railway, Render, AWS EC2, etc.
- **Frontend**: Deploy to Vercel, Netlify, GitHub Pages, or serve from backend's static folder

---

## 📝 Scripts

### Backend
```bash
npm start          # Start development server with watch mode
npm test           # Run tests (if configured)
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👤 Author

**Smart Pharm Team**
- GitHub: [@SmartPharm](https://github.com/SmartPharm)
- Project: [smartpharmapp](https://github.com/SmartPharm/smartpharmapp)

---

## 🆘 Support

For issues, questions, or suggestions:
- Open an [GitHub Issue](https://github.com/SmartPharm/smartpharmapp/issues)
- Check existing documentation
- Review API endpoint examples

---

## 🔄 Last Updated

**May 7, 2026**

---

**Happy Coding! 🚀**
