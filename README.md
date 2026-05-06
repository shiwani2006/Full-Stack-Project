# SkillSwap – Full Stack Skill Exchange Platform

>  A modern full-stack web application where users can exchange services using time credits or cash — inspired by real-world platforms like freelancing + barter systems.

---

## Overview

SkillSwap allows people to **connect, share skills, and earn** — without always relying on money.
Users can either request services or provide them and get paid in **credits, cash, or both**.

---

## 🎯 Key Features

### 👤 User Panel

* 🔍 Browse available services
* 📅 Book services easily
* 💬 Chat with providers
* 💰 Manage wallet (credits + transactions)
* 📦 View booking history

### 🧑‍💼 Provider Panel

* ➕ Create & manage services
* 📊 Track bookings
* 💵 View earnings
* 💬 Real-time chat with users

### 🔐 Authentication

* Secure login & registration
* Role-based access (User / Provider)
* Protected routes using JWT

---

## 🛠️ Tech Stack

### 🎨 Frontend

* ⚛️ React.js
* 🎯 React Router
* 🎨 Material UI (MUI)
* 📡 Axios

### ⚙️ Backend

* 🟢 Node.js
* 🚀 Express.js
* 🧠 Prisma ORM

### 🗄️ Database

* PostgreSQL / MySQL

---

## 📂 Project Structure

```
SkillSwap/
│
├── frontend/
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Pages (User/Provider/Auth)
│   │   ├── routes/         # Protected routes
│   │   ├── services/       # API calls (Axios)
│   │   ├── context/        # Auth state
│   │   └── App.js
│
├── backend/
│   ├── controllers/        # Business logic
│   ├── routes/             # API routes
│   ├── models/             # DB models
│   ├── prisma/             # ORM config
│   └── server.js
```

---

## 🔄 API Integration

### Auth APIs

```
POST /api/auth/register  
POST /api/auth/login  
```

### Example Request

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "name": "ABCD",
    "role": "user"
  }
}
```

---

## 🔐 Authentication Flow

1. User registers → stored in database
2. Login → backend returns JWT token
3. Token stored in `localStorage`
4. Token attached to every API request
5. Protected routes allow only logged-in users

---

## ▶️ Run Project Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/SkillSwap.git
cd SkillSwap
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Backend runs on:
👉 http://localhost:5000

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:
👉 http://localhost:3000

---

## 🧪 How to Test

1. Register as new user
2. Login
3. Redirect based on role:

   * User → `/user/dashboard`
   * Provider → `/provider/dashboard`
4. Try booking / creating services

---

## 🎨 UI Highlights

* ✨ Glassmorphism design
* 🎀 Pastel aesthetic UI
* 📱 Fully responsive
* ⚡ Smooth navigation

---

## 🔮 Future Improvements

* 💳 Payment integration (Stripe/Razorpay)
* ⭐ Ratings & reviews
* 🔔 Notifications system
* 🧑‍💼 Admin dashboard
* 🌍 Deployment (Vercel + Render)

---

