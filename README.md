# 🧠 MindConnect – AI Mental Health Platform

## 🚀 Overview

MindConnect is an AI-powered mental well-being platform designed to provide emotional support, structured doctor-user interaction, and mood insights.

This project focuses on building a safe, scalable, and user-friendly environment where users can seek guidance and track their mental state.

---

## ✨ Features

### 🔐 Authentication System

* User & Doctor Signup/Login
* JWT-based secure authentication
* Role-based access control

### 👨‍⚕️ Doctor System

* Secure doctor onboarding (secret-based access)
* Doctor dashboard
* Access to user insights

### 📊 User Dashboard

* Profile management
* Clean and responsive UI
* Protected routes

### 🧠 AI Integration (In Progress)

* AI chatbot for emotional support
* Mood detection & tracking (planned)

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Zod (validation)

### Authentication

* JSON Web Tokens (JWT)
* bcrypt hashing

---

## 📁 Project Structure

mind-connect/
├── frontend/ → React application
├── backend/ → Express API
├── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

git clone https://github.com/YOUR_USERNAME/mind-connect.git
cd mind-connect

---

### 2️⃣ Backend Setup

cd backend
npm install

Create `.env` file:

USER_JWT_SECRET=your_secret
DOCTOR_SECRET=your_secret
MONGO_URI=your_database_url

Run server:

npm run dev

---

### 3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

---

## 🔐 Environment Variables

Make sure to create a `.env` file inside `/backend`:

* USER_JWT_SECRET
* DOCTOR_SECRET
* MONGO_URI

⚠️ Never push `.env` to GitHub.

---

## 📌 Current Status

* ✅ Authentication system complete
* ✅ Doctor onboarding implemented
* ✅ Dashboard UI built
* 🚧 AI chatbot & mood detection (in progress)

---

## 🎯 Future Improvements

* AI-powered mood analysis
* Real-time chat system (WebSockets)
* Doctor verification via admin panel
* Better UI/UX enhancements

---

## 👨‍💻 Author

Ashwani Kumar

---

## ⭐ Note

This project is actively being developed and improved with a focus on real-world usability, scalability, and clean architecture.
