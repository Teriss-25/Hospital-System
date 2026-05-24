# 🏥 MediBook — Hospital Appointment Management System

A modern, responsive React-based Single Page Application (SPA) for managing hospital operations including appointments, doctors, patients, and billing.

---

## 🌐 Live Links

- **Frontend (Vercel):** https://your-vercel-link.vercel.app
- **Backend (Render):** https://your-render-link.onrender.com
- **GitHub Repo:** https://github.com/Teriss-25/Hospital-System

---

## 📋 Project Overview

MediBook is a hospital management dashboard that allows hospital staff to:

- 📅 **Book and manage appointments** between patients and doctors
- 👨‍⚕️ **Manage doctor profiles** with specialties, fees and availability
- 👤 **Register and track patients** with medical details
- 💰 **Process billing and payments** with M-Pesa, Cash and Insurance support
- 📊 **View a live dashboard** with hospital statistics
- 🔐 **Secure login** with role-based access for Admin, Doctor and Receptionist

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 + Vite | UI components and pages |
| Routing | React Router v6 | Client-side navigation |
| State Management | Redux Toolkit | Global state with async thunks |
| HTTP Client | Axios | API requests |
| Database | json-server + db.json | REST API simulation |
| Authentication | localStorage | Session management |
| Styling | Inline CSS | Clean white medical theme |
| Testing | Vitest + React Testing Library | Unit and component tests |
| Deployment | Vercel (frontend) + Render (backend) | Live hosting |

---

## 📁 Folder Structure

```
medibook/
├── db.json                      # Fake database (json-server)
├── package.json                 # Project dependencies and scripts
├── vite.config.js               # Vite + Vitest configuration
├── start.sh                     # Script to start both servers at once
├── public/                      # Static assets
└── src/
    ├── App.jsx                  # Root component with all routes
    ├── main.jsx                 # React entry point with Redux Provider
    ├── index.css                # Global styles
    ├── setupTests.js            # Vitest + jest-dom setup
    ├── components/
    │   ├── Navbar.jsx           # Top navigation bar with logout
    │   ├── StatCard.jsx         # Stats card for dashboard
    │   ├── Badge.jsx            # Status badge component
    │   ├── Modal.jsx            # Reusable modal for add/edit forms
    │   ├── SearchBar.jsx        # Search input component
    │   ├── LoadingSpinner.jsx   # Loading animation
    │   └── ProtectedRoute.jsx   # Auth guard for protected pages
    ├── pages/
    │   ├── Login.jsx            # Login page with demo accounts
    │   ├── Dashboard.jsx        # Overview with stats and quick actions
    │   ├── Appointments.jsx     # Appointment booking and management
    │   ├── Doctors.jsx          # Doctor profiles and management
    │   ├── Patients.jsx         # Patient registration and records
    │   └── Billing.jsx          # Billing and payment processing
    ├── redux/
    │   ├── store.js             # Redux store configuration
    │   ├── appointmentsSlice.js # Appointments state + async thunks
    │   ├── doctorsSlice.js      # Doctors state + async thunks
    │   ├── patientsSlice.js     # Patients state + async thunks
    │   └── billingSlice.js      # Billing state + async thunks
    └── tests/
        ├── App.test.jsx                  # Basic setup tests
        ├── Navbar.test.jsx               # Navbar component tests
        ├── Badge.test.jsx                # Badge component tests
        ├── StatCard.test.jsx             # StatCard component tests
        └── appointmentsSlice.test.js     # Appointments Redux slice tests
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher
- Git

### Installation

**Step 1 — Clone the repository:**
```bash
git clone https://github.com/Teriss-25/Hospital-System.git
cd Hospital-System
```

**Step 2 — Install dependencies:**
```bash
npm install
```

**Step 3 — Start the backend server (Terminal 1):**
```bash
node_modules/.bin/json-server db.json --port 3001
```

Wait until you see:
```
JSON Server started on PORT :3001
Endpoints:
http://localhost:3001/appointments
http://localhost:3001/doctors
http://localhost:3001/patients
http://localhost:3001/billing
```

**Step 4 — Start the frontend (Terminal 2):**
```bash
npm run dev
```

**Step 5 — Open in browser:**
```
http://localhost:5173
```

### Quick Start (One Command)
```bash
chmod +x start.sh && ./start.sh
```

---

## 🔐 Login Credentials

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | Admin |
| doctor | doctor123 | Doctor |
| receptionist | rec123 | Receptionist |

You can also click the demo buttons on the login page to log in instantly.

---

## 📡 API Endpoints

The backend runs on `http://localhost:3001` using json-server.

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/appointments` | GET, POST, PATCH, DELETE | Appointment records |
| `/doctors` | GET, POST, PATCH, DELETE | Doctor profiles |
| `/patients` | GET, POST, PATCH, DELETE | Patient records |
| `/billing` | GET, POST, PATCH | Billing and payments |

---

## ✅ Running Tests

```bash
npm test
```

Expected output:
```
Test Files  5 passed (5)
Tests       23 passed (23)
```

### Test Coverage

| Test File | What it tests |
|-----------|--------------|
| App.test.jsx | Basic Vitest setup |
| Navbar.test.jsx | Brand name and nav links render |
| Badge.test.jsx | Status badges render correctly |
| StatCard.test.jsx | Stat cards render label, value and icon |
| appointmentsSlice.test.js | Redux — add, delete, update, loading state |

---

## 🔄 CRUD Operations

All four CRUD operations are implemented:

| Operation | HTTP Method | Example |
|-----------|------------|---------|
| **Create** | POST | Book appointment, register patient |
| **Read** | GET | Load all records on page mount |
| **Update** | PATCH | Edit appointment status, mark bill paid |
| **Delete** | DELETE | Remove appointment or doctor |

---

## 🗂️ Database Structure (db.json)

```json
{
  "doctors": [
    {
      "id": "1",
      "name": "Dr. James Mwangi",
      "specialty": "General Medicine",
      "phone": "0712345678",
      "email": "james@medibook.ke",
      "available": true,
      "experience": "8 years",
      "fee": 1500
    }
  ],
  "patients": [
    {
      "id": "1",
      "name": "John Kamau",
      "age": 34,
      "gender": "Male",
      "phone": "0756789012",
      "bloodGroup": "O+",
      "address": "Nairobi, Kenya",
      "dateRegistered": "2026-01-10"
    }
  ],
  "appointments": [
    {
      "id": "1",
      "patientName": "John Kamau",
      "doctorName": "Dr. James Mwangi",
      "date": "2026-05-20",
      "time": "09:00",
      "reason": "General checkup",
      "status": "Confirmed",
      "fee": 1500
    }
  ],
  "billing": [
    {
      "id": "1",
      "patientName": "John Kamau",
      "amount": 1500,
      "status": "Paid",
      "date": "2026-05-20",
      "method": "M-Pesa"
    }
  ]
}
```

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend on http://localhost:5173 |
| `npm run server` | Start json-server on http://localhost:3001 |
| `npm test` | Run all tests with Vitest |
| `npm run build` | Build for production |
| `./start.sh` | Start both servers with one command |

---

## 🎨 Features

### Dashboard
- Live stats — today's appointments, pending count, available doctors, total revenue
- Recent appointments table with status badges
- Quick action buttons to navigate to all sections

### Appointments
- Book new appointments by selecting patient and doctor from dropdowns
- Doctor fee auto-fills when doctor is selected
- Filter by patient name, doctor name or status
- Edit status — Pending, Confirmed, Completed, Cancelled
- Delete appointments with confirmation

### Doctors
- Card-based layout showing doctor profile, specialty, experience and fee
- Availability toggle — Available / Unavailable
- Full CRUD — add, edit, delete doctors
- Search by name or specialty

### Patients
- Table view with all patient details
- Blood group displayed with red badge
- Register new patients with full medical details
- Search by name, phone or blood group

### Billing
- Revenue summary — Total Collected vs Outstanding
- One-click payment processing
- Support for M-Pesa, Cash, Insurance, Card
- Mark unpaid bills as paid instantly

---

## 🚢 Deployment

### Frontend — Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set framework to **Vite**
4. Click **Deploy**

### Backend — Render
1. Go to [render.com](https://render.com)
2. Create a new **Web Service**
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `node_modules/.bin/json-server db.json --port 3001`
6. Copy the live URL and update the API base URL in your Redux slices

---

## 🏗️ Architecture

```
Browser
   │
   ▼
React App (Vite) — http://localhost:5173
   │
   ├── React Router v6 → Pages
   │     ├── /login        → Login page
   │     ├── /dashboard    → Dashboard
   │     ├── /appointments → Appointments
   │     ├── /doctors      → Doctors
   │     ├── /patients     → Patients
   │     └── /billing      → Billing
   │
   ├── Redux Store
   │     ├── appointmentsSlice
   │     ├── doctorsSlice
   │     ├── patientsSlice
   │     └── billingSlice
   │
   └── Axios → json-server REST API → db.json
                http://localhost:3001
```

---

## 📌 Submission Checklist

- [x] GitHub Repository with README
- [x] All tests passing
- [x] Full CRUD on appointments, doctors, patients
- [x] 5 client-side routes
- [x] Redux Toolkit state management
- [x] Login authentication with protected routes
- [x] Clean white medical UI theme
- [x] Role-based access — Admin, Doctor, Receptionist
- [ ] Live Vercel deployment link
- [ ] Live Render backend link

---

## 👤 Author

**Teriss** — [GitHub Profile](https://github.com/Teriss-25)

---

## 📄 License

This project was built for portfolio and educational purposes.
