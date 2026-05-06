SkillSwap

SkillSwap is a full-stack AI-powered digital marketplace designed to connect users with skilled professionals and service providers through a modern, secure, and user-friendly platform.

The platform simplifies the complete service lifecycle including:

Service Discovery
Provider Search
Booking Management
Wallet System
Online Payments
Real-Time Chat
Reviews & Ratings
AI Assistance
Role-Based Dashboards

This project was developed as part of the B.Tech CSE (AI Specialization) program.

🚀 Features
👤 User Module

Users can:

Register & Login securely
Browse available services
Search providers
Book appointments
Chat with providers
Maintain wallet balance
Track booking history
Rate & review services
Manage personal profile
🧑‍💼 Provider Module

Providers can:

Create professional profiles
Add & manage services
Set pricing & availability
Accept or reject bookings
Track earnings
Receive payments
Communicate with customers
Build trust through ratings
🛡️ Admin Module

Admin functionalities include:

User verification
Provider verification
Complaint handling
Booking monitoring
Service moderation
Payment logs
Analytics dashboard
🛠️ Tech Stack
Frontend
React.js
Material UI
JavaScript (ES6+)
Axios
React Router DOM
Backend
Node.js
Express.js
JWT Authentication
Database
PostgreSQL
Prisma ORM
🧠 AI Features

SkillSwap includes AI-powered functionalities to improve user experience:

Smart assistance
Better provider recommendations
Automated support interactions
Enhanced user engagement
🏗️ System Architecture

SkillSwap follows a Three-Tier Architecture:

1️⃣ Presentation Layer

Frontend interface built using React.js

2️⃣ Application Layer

Backend APIs using Node.js + Express.js

3️⃣ Data Layer

PostgreSQL database with Prisma ORM

This architecture improves:

Scalability
Security
Maintainability
Performance
🔐 Authentication

JWT Authentication is used for:

Secure Login
Session Management
Route Protection
User Verification

Example:

const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
📂 Project Structure
SkillSwap/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── assets/
│   └── services/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── prisma/
│   └── config/
│
└── README.md
⚡ Installation Guide
1️⃣ Clone Repository
git clone https://github.com/your-username/SkillSwap.git
2️⃣ Frontend Setup
cd frontend
npm install
npm start
3️⃣ Backend Setup
cd backend
npm install
npm run dev
4️⃣ Configure Environment Variables

Create .env file inside backend folder:

DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
PORT=5000
💳 Core Functionalities
Secure Authentication
Booking Automation
Digital Wallet
Payment Integration
Real-Time Communication
Role-Based Routing
Protected Routes
Feedback & Reviews
📸 UI Highlights
Premium Modern UI
Responsive Design
Glassmorphism Effects
Interactive Dashboards
User-Friendly Navigation
Professional Service Cards
📈 Future Enhancements
Machine Learning Recommendations
Live Notifications
Video Consultation
Mobile App Version
Multi-language Support
AI Chatbot Improvements
🎯 Advantages

✅ Secure Login System
✅ Online Payments
✅ Real-Time Chat
✅ Digital Wallet
✅ Provider Discovery
✅ Booking Automation
✅ Scalable Backend
✅ Efficient Database Handling
