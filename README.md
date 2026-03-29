# 🚀 Cal.com Clone (Scheduling Platform)

A full-stack scheduling platform inspired by Cal.com that allows users to create event types, set availability, and book meetings seamlessly.

---

## 🌐 Live Demo

Frontend: https://calcom-clone-seven.vercel.app/  
TO test Backend: https://calcom-clone-b89n.onrender.com/api/events  


---

## 🧠 Features

### 👤 User & Event Management
- Create users
- Create event types (duration, slug)
- Unique booking links per event

### 📅 Availability System
- Set weekly availability (day + time range)
- Dynamic slot generation based on availability

### ⏱ Smart Slot Engine
- Generates time slots based on:
  - Event duration
  - Buffer time
- Filters out already booked slots

### 🔒 Booking System
- Book meetings with name + email
- Prevents double booking using DB constraints

### ⚡ Real-time UX
- Slots update instantly after booking
- Disabled/removed booked slots

---

## 🏗 Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Prisma ORM

### Database
- PostgreSQL (Neon)

### Deployment
- Frontend → Vercel
- Backend → Render

---

## ⚙️ Architecture

```text
Frontend (Next.js)
        ↓
Backend API (Express)
        ↓
Database (PostgreSQL via Prisma)
